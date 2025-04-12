require("dotenv").config();
const express = require("express");
const Listing = require("../models/listing.model");
const Review = require("../models/review.model");
const router = express.Router();
const AppError = require("../middlewares/AppError");
const { default: mongoose } = require("mongoose");
const authMiddleware = require("../middlewares/jwt");
const User = require("../models/user.model");
const Booking = require("../models/booking.model");

const { storage } = require("../../cloudConfig");
//(for image upload)
const multer = require("multer"); //to parse the multiform data
const upload = multer({ storage });
//ROUTES FOR LISTINGS

// Get all listings
router.get("/all", async (req, res, next) => {
  try {
    const allListings = await Listing.find({});
    res.json(allListings);
  } catch (err) {
    console.error("Error:", err);
    return next(new AppError(500, err.message || "Internal Server Error"));
  }
});

//search  a listing
router.get("/s", async (req, res, next) => {
  try {
    const search = req.query.search?.trim();

    if (!search) {
      return next(new AppError(400, "Search query is required"));
    }

    const listings = await Listing.find({
      location: { $regex: search, $options: "i" },
    });

    res.json(listings);
  } catch (err) {
    console.error("Error:", err);
    return next(new AppError(500, err.message || "Internal Server Error"));
  }
});
// show listings of a user
router.get("/userListings", authMiddleware, async (req, res, next) => {
  try {
    const UserId = req.user.id || req.user._id;

    if (!mongoose.Types.ObjectId.isValid(UserId)) {
      return next(new AppError(400, "Invalid User ID format"));
    }
    const userF = await User.findById(UserId);
    if (!userF) {
      return next(new AppError(403, "InvalidUser"));
    }
    const listings = await Listing.find({ user: UserId });

    res.status(200).json({ listings });
  } catch (err) {
    console.error("Error:", err);
    return next(new AppError(500, err.message || "Internal Server Error"));
  }
});

// Get a listing by ID
router.get("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    // const UserId = req.user.id || req.user._id;
    // const userF = await User.findById(UserId);
    // if (!userF) {
    //   return next(new AppError(403, "InvalidUser"));
    // }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      // is error only checks the format of id , if the id is of some
      //  listing that previously existed than we need to check if the listing
      //  exist with this id as we have done in the next error handling.
      return next(new AppError(400, "Invalid ID "));
    }

    const listing = await Listing.findById(id);
    if (!listing) {
      return next(new AppError(404, "Listing not found"));
    }

    res.json(listing);
  } catch (err) {
    console.error("Error:", err);
    return next(new AppError(500, err.message || "Internal Server Error"));
  }
});

// Book a listing

// Add a listing
router.post(
  "/add",
  authMiddleware,
  upload.single("image"),
  async (req, res, next) => {
    try {
      const UserId = req.user.id || req.user._id;
      const userF = await User.findById(UserId);
      if (!userF) {
        return next(new AppError(403, "InvalidUser"));
      }

      const url = req.file.path;
      const filename = req.file.filename;
      const { title, description, price, location, country } = req.body;
      let listing = new Listing({
        title,
        description,
        price,
        location,
        country,
        user: UserId,
        image: { url, filename },
      });

      await listing.save();
      // res.json(listing);
      res.status(201).json(listing);
    } catch (err) {
      console.error("Error:", err);
      return next(new AppError(500, err.message || "Internal Server Error"));
    }
  }
);

// Update a listing
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const UserId = req.user.id || req.user._id;
    const userF = await User.findById(UserId);

    if (!userF) {
      return next(new AppError(403, "InvalidUser"));
    }
    let { id } = req.params;
    // const l = await Listing.findById(id);
    // if (userF !=l.user

    // )
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError(404, "Invalid ID "));
    }

    const { title, description, image, price, location, country } = req.body;
    let listing = await Listing.findByIdAndUpdate(
      id,
      { title, description, image, price, location, country },
      { new: true, runValidators: true }
    );

    if (!listing) {
      return next(new AppError(404, "Some error occured"));
    }

    res.json(listing);
  } catch (err) {
    console.error("Error:", err);
    return next(new AppError(500, err.message || "Internal Server Error"));
  }
});

// Delete a listing
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const UserId = req.user.id || req.user._id;
    const userF = await User.findById(UserId);
    if (!userF) {
      return next(new AppError(403, "InvalidUser"));
    }
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError(400, "Invalid ID"));
    }
    let listing = await Listing.findByIdAndDelete(id);
    if (!listing) {
      return next(new AppError(404, "Listing not found"));
    }
    res.json({ message: "Listing deleted successfully", listing });
  } catch (err) {
    console.error("Error:", err);
    return next(new AppError(500, err.message || "Internal Server Error"));
  }
});

//Routes for review

// show all reviews
router.get("/:id/allReviews", async (req, res, next) => {
  try {
    const id = req.params.id;
    const listing = await Listing.findById(id);
    if (!listing) {
      return next(new AppError(404, "listing does not exist."));
    }
    const listFounded = await Listing.findById(id).populate({
      path: "reviews",
      populate: { path: "user" },
    });

    const reviews = listFounded.reviews;
    res.json(reviews);
  } catch (err) {
    return next(new AppError(500, "Internal Server Error"));
  }
});

// create a review
router.post("/:id/review", authMiddleware, async (req, res, next) => {
  try {
    const UserId = req.user.id || req.user._id;
    const userF = await User.findById(UserId);
    if (!userF) {
      return next(new AppError(403, "InvalidUser"));
    }
    const id = req.params.id;
    const listing = await Listing.findById(id);
    if (!listing) {
      return next(new AppError(404, "listing does not exist."));
    }
    let { rating, comment } = req.body;
    const review = new Review({ comment, rating, user: UserId });
    await review.save(); //save review
    // console.log(review);
    listing.reviews.push(review); //push the review
    await listing.save(); //save the listing also
    res.json(review);
  } catch (err) {
    return next(new AppError(500, "Internal Server Error"));
  }
});
// delete a review
router.delete("/:id/review/:revid", authMiddleware, async (req, res, next) => {
  try {
    const id = req.params.id;
    const listing = await Listing.findById(id);
    if (!listing) {
      return next(new AppError(404, "listing does not exist."));
    }
    const revid = req.params.revid;
    const review = await Review.findByIdAndDelete(revid);
    if (!review) {
      return next(new AppError(404, "Review does not exist."));
    }

    listing.reviews = listing.reviews.filter((data) => {
      return data._id.toString() != revid;
    });
    await listing.save();
    res.json(review);
  } catch (err) {
    return next(new AppError(500, "Internal Server Error"));
  }
});

router.get("/:id/booking", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userF = await User.findById(userId);
    if (!userF) {
      return next(new AppError(403, "InvalidUser"));
    }
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError(404, "Invalid ID "));
    }
    const listing = await Listing.findById(id);
    if (!listing) {
      return next(AppError(404, "Listing not found"));
    }

    const booking = await Booking.find({ listing: id });
    res.json(booking);
    return booking;
  } catch (err) {
    console.error("Error:", err);
    return next(new AppError(500, err.message || "Internal Server Error"));
  }
});
router.post("/:id/booking", authMiddleware, async (req, res, next) => {
  try {
    const { startDate, endDate } = req.body;
    const diffTime =
      new Date(endDate).getTime() - new Date(startDate).getTime();
    //date cant be subtracted so we count time difference
    //  in miliseconds and they convert it to days
    const TotalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const userId = req.user.id;
    const userF = await User.findById(userId);
    if (!userF) {
      return next(new AppError(403, "InvalidUser"));
    }
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError(404, "Invalid ID "));
    }
    const listing = await Listing.findById(id);

    if (!listing) {
      return next(new AppError(404, "Listing not found"));
    }
    const price = listing.price;
    const totalAmt = price * TotalDays;
    const booking = new Booking({
      user: userId,
      listing: id,
      fromDate: startDate,
      toDate: endDate,
      totalAmount: totalAmt,
    });
    await booking.save();

    res.json(booking);
  } catch (err) {
    console.error("Error:", err);
    return next(new AppError(500, err.message || "Internal Server Error"));
  }
});
module.exports = router;
