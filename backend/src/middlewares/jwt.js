const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    const data = jwt.verify(token, "superPassword");
    req.user = data.user;
    console.log(data.user);
    next();
  } catch (err) {
    res.status(401).json("authentication error");
  }
};
module.exports = authMiddleware;
