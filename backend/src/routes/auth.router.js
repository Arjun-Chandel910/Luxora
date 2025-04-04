const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.model");
const User = require("../models/user.model");
const AppError = require("../middlewares/AppError");
const { default: mongoose } = require("mongoose");

const { storage } = require("../../cloudConfig");
//(for image upload)
const multer = require("multer"); //to parse the multiform data
const upload = multer({ storage });

const bcrypt = require("bcryptjs");
const authMiddleware = require("../middlewares/jwt");

jwt = require("jsonwebtoken");
router.post("/signup", upload.single("image"), async (req, res, next) => {
  if (!req.file) {
    return next(new AppError(400, "Image is required"));
  }
  console.log(req.file);
  const url = req.file.path;
  const filename = req.file.filename;
  let { name, email, password } = req.body;
  let checkUser = await User.findOne({ email: email });
  if (checkUser) {
    return next(new AppError(400, "User already exists"));
  }

  // salt and hash
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // register
  const user = new User({
    image: { url, filename },
    name,
    email,
    password: hash,
  });

  await user.save();
  const JWT_DATA = {
    user: {
      id: user._id,
    },
  };
  const token = jwt.sign(JWT_DATA, "superPassword"); //change the secret later

  res.json({ token: token });
});

// login
router.post("/login", async (req, res, next) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user || user.length == 0) {
    return next(new AppError(400, "User doesnot exist"));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new AppError(400, "Invalid credentials."));
  }
  const JWT_DATA = {
    user: {
      id: user._id,
    },
  };
  const token = jwt.sign(JWT_DATA, "superPassword"); //change the secret later

  res.json({ token: token });
});
// delete user
router.delete("/", authMiddleware, async (req, res, next) => {
  try {
    const UserId = req.user.id || req.user._id;
    const userF = await User.findById(UserId);
    if (!userF) {
      return next(new AppError(403, "InvalidUser"));
    }
    const data = await User.findByIdAndDelete(UserId);
    res.json({ deletedUser: data });
  } catch (err) {
    return next(new AppError(500, "Internal server error"));
  }
});

// user profile
router.get("/profile", authMiddleware, async (req, res, next) => {
  try {
    const UserId = req.user.id || req.user._id;
    const userF = await User.findById(UserId);

    if (!userF) {
      return next(new AppError(403, "InvalidUser"));
    }

    res.json(userF);
  } catch (err) {
    return next(new AppError(500, "Internal server error"));
  }
});

module.exports = router;
