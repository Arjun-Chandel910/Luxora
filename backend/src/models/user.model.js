const mongoose = require("mongoose");
const Listing = require("./listing.model");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    filename: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],
});

UserSchema.post("findOneAndDelete", async (user) => {
  if (user) {
    const data = await Listing.deleteMany({ user: user.id || user._id });
    console.log(data);
  }
});

module.exports = mongoose.model("User", UserSchema);
