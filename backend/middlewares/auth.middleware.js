const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {
  //we need to access the token for this. The token is accessible from the headers or the cookies.
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // accessing the first element of the split header because the 0th element is Bearer.

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await blacklistTokenModel.findOne({ token });

  if (isBlacklisted) {
    res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //decodes the token
    const user = await userModel.findById(decoded._id);
    req.user = user; //Stores the user document in the Express req object.Makes it available to all subsequent middleware and route handlers
    return next();
  } catch (error) {
    //any error while decoding the token or finding the user with this id.
    console.log("Error in authorization: ", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    // if no token that means you are not logged in
    return res.status(401).json({ message: "Unauthorized" });
  }
  const isBlacklisted = await blacklistTokenModel.findOne({ token });

  if (isBlacklisted) {
    res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain;
    return next();
  } catch (error) {
    console.log("Error in authorization", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
