const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  image: {
    type: String,
    default:
      "https://plus.unsplash.com/premium_photo-1675745329954-9639d3b74bbf?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
  //   reviews: [
  //     {
  //       type: Schema.Types.ObjectId,
  //       ref: "Review",
  //     },
  //   ],
});

module.exports = mongoose.model("Listing", UserSchema);
