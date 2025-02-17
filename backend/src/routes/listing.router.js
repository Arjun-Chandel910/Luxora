const express = require("express");
const Listing = require("../models/listing.model");
const router = express.Router();
const AppError = require("../middlewares/AppError");

//get all listings
router.get("/all", async (req, res) => {
  const allListings = await Listing.find({});
  res.json(allListings);
});
//get all listings
router.get("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      return next(new AppError(404, "Listing not found"));
    }
    res.json(listing);
  } catch (err) {
    return next(new AppError(400, "something went wrong"));
  }
});

//add a listing
router.post("/add", async (req, res, next) => {
  try {
    const { title, description, image, price, location, country } = req.body;
    let listing = new Listing({
      title,
      description,
      price,
      image,
      location,
      country,
    });
    await listing.save();
    res.json(listing);
  } catch (err) {
    return next(new AppError(400, "invalid data"));
  }
});

//update a listing
router.put("/:id", async (req, res) => {
  let id = req.params.id;
  const { title, description, image, price, location, country } = req.body;
  let listing = await Listing.findByIdAndUpdate(
    id,
    { title, description, image, price, location, country },
    { new: true, runValidators: true }
  );
  res.json(listing);
});
//delete a listing
router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  let listing = await Listing.findByIdAndDelete(id);
  res.json(listing);
});

module.exports = router;
