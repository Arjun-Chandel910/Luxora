const express = require("express");
const Listing = require("../models/listing.model");
const User = require("../models/user.model");
const AppError = require("../middlewares/AppError");
const authMiddleware = require("../middlewares/jwt");
const { trusted } = require("mongoose");
const router = express.Router();

router.post("/toggle", authMiddleware, async (req, res, next) => {
  try {
    //checking if user is valid
    const userId = req.user.id;
    const userF = await User.findById(userId);
    if (!userF) {
      return next(new AppError(403, "InvalidUser"));
    }
    //checking if listing is valid
    const { listingId } = req.body;
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return next(new AppError(404, "Listing not found"));
    }
    const idx = userF.wishlist.indexOf(listingId);
    if (idx >= 0) {
      userF.wishlist.splice(idx, 1);
      res.json({
        success: false,
        wishlist: userF.wishlist,
        message: "Removed from wishlist",
      });
    } else {
      userF.wishlist.push(listingId);
      res.json({
        success: true,
        wishlist: userF.wishlist,
        message: "Added to wishlist",
      });
    }
    await userF.save();
    return;
  } catch (err) {
    console.error("Error:", err);
    return next(new AppError(500, err.message || "Internal Server Error"));
  }
});
router.get("/wishes", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userF = await User.findById(userId).populate("wishlist");
    if (!userF) {
      return next(new AppError(403, "InvalidUser"));
    }
    res.json(userF.wishlist);
  } catch (err) {
    console.error("Error:", err);
    return next(new AppError(500, err.message || "Internal Server Error"));
  }
});

module.exports = router;
