const express = require("express");
const Listing = require("../models/listing.model");
const router = express.Router();
const AppError = require("../middlewares/AppError");
const { default: mongoose } = require("mongoose");
const authMiddleware = require("../middlewares/jwt");
const User = require("../models/user.model");

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

// Get a listing by ID
router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    let { id } = req.params;
    const UserId = req.user.id || req.user._id;
    const userF = await User.findById(UserId);
    if (!userF) {
      return next(new AppError(403, "InvalidUser"));
    }

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

// Add a listing
router.post("/add", authMiddleware, async (req, res, next) => {
  try {
    const UserId = req.user.id || req.user._id;
    const userF = await User.findById(UserId);
    if (!userF) {
      return next(new AppError(403, "InvalidUser"));
    }
    const { title, description, image, price, location, country } = req.body;
    let listing = new Listing({
      title,
      description,
      price,
      image,
      location,
      country,
      user: UserId,
    });

    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    console.error("Error:", err);
    return next(new AppError(500, err.message || "Internal Server Error"));
  }
});

// Update a listing
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const UserId = req.user.id || req.user._id;
    const userF = await User.findById(UserId);
    if (!userF) {
      return next(new AppError(403, "InvalidUser"));
    }
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError(400, "Invalid ID "));
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

module.exports = router;
