const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req); //in the user.routes.js file, we had performed some checks on the input data using the express-validator.If any errors occur, we can get those by passing the req object in the validationResult.
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password } = req.body;
  const hashedPassword = await userModel.hashPassword(password);
  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  }); // from the created user, we need to generate a token
  const token = user.generateAuthToken();

  res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password"); //Explicitly includes the password field in the returned document.Allows you to access user.password for password verification
  if (!user) {
    return res.status(401).json({ messsage: `Invalid email or password` });
  }
  const passworMatch = await user.comparePassword(password);
  if (!passworMatch) {
    return res.status(401).json({ messsage: `Invalid email or password` });
  }

  const token = user.generateAuthToken();

  return res.status(200).json({ token, user });
};
