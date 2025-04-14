require("dotenv").config();
const express = require("express");

const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const crypto = require("crypto");
//router
const ListingRouter = require("./src/routes/listing.router");
const UserRouter = require("./src/routes/auth.router");

//middlewares
app.use(express.json());
app.use(cors());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.urlencoded({ extended: true }));
//connect db
mongoose
  .connect("mongodb://127.0.0.1:27017/Luxora")
  .then(console.log("db connected"))
  .catch(() => {
    console.log("Error in db");
  });
app.post("/payment-success", async (req, res, next) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const correctSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (correctSignature === razorpay_signature) {
      console.log("authentic payment");
    } else {
      console.log("fraud deteced");
    }
  } catch (err) {
    return next(new AppError(500, err.message || "Internal Server Error"));
  }
});

//using routes
app.use("/listing", ListingRouter);
app.use("/api", UserRouter);

//global error handler to catch the errors
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  res.status(statusCode).json({ message: message });
});

//listen
app.listen(3000, () => {
  console.log("server litening to port 3000");
});
