const express = require("express");
const mongoose = require("mongoose");
const app = express();
mongoose
  .connect("mongodb://127.0.0.1:27017/Luxora")
  .then(console.log("db connected"))
  .catch(() => {
    console.log("Error in db");
  });

app.get("/", (req, res) => {
  res.send("hi");
});
app.listen(3000, () => {
  console.log("server litening to port 3000");
});
