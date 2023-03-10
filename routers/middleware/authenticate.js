const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET || "Satoshi Nakamoto";
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Not Allowed", Error: err });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No token!" });
  }
};
