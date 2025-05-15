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
