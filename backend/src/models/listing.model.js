const mongoose = require("mongoose");
const Review = require("./review.model");

const ListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  image: {
    url: String,
    filename: String,
  },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

ListingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    const reviewArray = listing.reviews;
    for (let reviewId of reviewArray) {
      await Review.findByIdAndDelete(reviewId);
    }
  }
});

module.exports = mongoose.model("Listing", ListingSchema);
