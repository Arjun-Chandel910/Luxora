const express = require("express");
const Listing = require("../models/listing.model");
const User = require("../models/user.model");
const AppError = require("../middlewares/AppError");
const authMiddleware = require("../middlewares/jwt");
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
    } else {
      userF.wishlist.push(listingId);
    }
    await userF.save();
    return res.status(200).json({
      success: true,
      wishlist: userF.wishlist,
      message: idx >= 0 ? "Removed from wishlist" : "Added to wishlist",
    });
  } catch (err) {
    console.error("Error:", err);
    return next(new AppError(500, err.message || "Internal Server Error"));
  }
});

module.exports = router;
