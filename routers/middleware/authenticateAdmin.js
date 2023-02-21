const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../../db/models/user.js");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET || "Satoshi Nakamoto";
  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      const user = await User.findByUsername({
        username: decodedToken.username,
      });

      const adminKey = user.adminKey.toString();

      if (err) {
        res.status(401).json({ message: "Eror with your verification" });
      } else if (adminKey !== process.env.ADMIN_KEY) {
        console.log("y0", user);
        res.status(401).json({ message: "Must be an admin" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No token!" });
  }
};
