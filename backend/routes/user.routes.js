const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
//express validator package used to validate the data received from  the frontend.
const userController = require("../controllers/user.controller");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be atleast 3 characters long"),
    body("password")
      .isLength({ minn: 6 })
      .withMessage("Password must be atleast 6 characters long"),
  ],
  userController.registerUser
);

module.exports = router;
