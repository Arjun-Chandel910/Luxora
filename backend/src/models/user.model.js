const mongoose = require("mongoose");
const Listing = require("./listing.model");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
});

UserSchema.post("findOneAndDelete", async (user) => {
  if (user) {
    const data = await Listing.deleteMany({ user: user.id || user._id });
    console.log(data);
  }
});

module.exports = mongoose.model("User", UserSchema);
