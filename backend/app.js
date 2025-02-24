const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
//router
const ListingRouter = require("./src/routes/listing.router");
const UserRouter = require("./src/routes/auth.router");

//middlewares
app.use(express.json());
app.use(cors());
//connect db
mongoose
  .connect("mongodb://127.0.0.1:27017/Luxora")
  .then(console.log("db connected"))
  .catch(() => {
    console.log("Error in db");
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
