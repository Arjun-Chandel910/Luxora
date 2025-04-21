const express = require("express");
const Listing = require("../models/listing.model");
const User = require("../models/user.model");
const AppError = require("../middlewares/AppError");
const authMiddleware = require("../middlewares/jwt");
const router = express.Router();

router.post("/toggle", authMiddleware, async (req, res, next) => {});

module.exports = router;
