require("dotenv").config();
const express = require("express");

const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const crypto = require("crypto");

// const port = provess.env.PORT || 3000;
//router
const ListingRouter = require("./src/routes/listing.router");
const UserRouter = require("./src/routes/auth.router");
const WishList = require("./src/routes/wishlist.router");

const authMiddleware = require("./src/middlewares/jwt");
const User = require("./src/models/user.model");
const Booking = require("./src/models/booking.model");
const port = process.env.PORT || 3000;
//middlewares
app.use(express.json());

app.use(
  cors({ origin: "https://luxora-frontend.onrender.com", credentials: true })
);
app.use(express.urlencoded({ extended: true }));
//connect db
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("💥 MONGODB_URI is not defined!");
  process.exit(1);
}
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("🔥 MongoDB connected"))
  .catch((err) => {
    throw err;
  });

app.post("/payment-success", authMiddleware, async (req, res, next) => {
  try {
    const UserId = req.user.id || req.user._id;
    const userF = await User.findById(UserId);
    if (!userF) {
      return next(new AppError(403, "InvalidUser"));
    }

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const correctSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    let success = true;
    if (correctSignature === razorpay_signature) {
      console.log("authentic payment");

      const updatedBooking = await Booking.findOneAndUpdate(
        {
          razorpayOrderId: razorpay_order_id,
        },
        {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          paymentStatus: "PAID",
        },
        { new: true }
      );
      console.log(updatedBooking);
      res.json({ success });
    } else {
      success = false;
      console.log("fraud deteced");
      res.json({ success });
    }
  } catch (err) {
    return next(new AppError(500, err.message || "Internal Server Error"));
  }
});

//using routes
app.use("/listing", ListingRouter);
app.use("/api", UserRouter);
app.use("/api/wishlist", WishList);

//global error handler to catch the errors
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  res.status(statusCode).json({ message: message });
});

//listen
app.listen(port, () => {
  console.log("server litening to port 3000");
});
