const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ExpressError = require("./src/middlewares/AppError");
// const Listing = require("./src/models/listing.model");

//routes
const listingRouter = require("./src/routes/listing.router");
const UserRouter = require("./src/routes/auth.router");

//middlewares
app.use(express.json());

//connect db
mongoose
  .connect("mongodb://127.0.0.1:27017/Luxora")
  .then(console.log("db connected"))
  .catch(() => {
    console.log("Error in db");
  });

//using routes
app.use("/listing", listingRouter);
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
