const express = require("express");
const mongoose = require("mongoose");
// const Listing = require("./src/models/listing.model");

//routes
const listingRouter = require("./src/routes/listing.router");
const app = express();

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

//listen
app.listen(3000, () => {
  console.log("server litening to port 3000");
});
