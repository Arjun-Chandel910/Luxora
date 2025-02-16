const express = require("express");
const Listing = require("../models/listing.model");
const router = express.Router();

//get all listings
router.get("/all", async (req, res) => {
  const allListings = await Listing.find({});
  res.json(allListings);
});
//get all listings
router.get("/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.json(listing);
});

//add a listing
router.post("/add", async (req, res) => {
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
