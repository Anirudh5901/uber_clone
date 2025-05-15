const userModel = require("../models/user.model");

//This function just checks if the required fields are present and to create a user with them. This will be used in the controller
module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !email || !password) {
    // lastname is optional
    throw new Error("All fields are required");
  }
  const user = await userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  return user;
};
