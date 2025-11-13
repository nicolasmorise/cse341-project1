const { body } = require("express-validator");


//checks validation from the contact POST request
const contactValidation = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required.")
    .isLength({ min: 2 })
    .withMessage("First name must have at least 2 characters."),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required.")
    .isLength({ min: 2 })
    .withMessage("Last name must have at least 2 characters."),
  body("email")
    .isEmail()
    .withMessage("A valid email address is required."),
  body("favoriteColor")
    .trim()
    .notEmpty()
    .withMessage("Favorite color is required"),
  body("birthday")
    .isDate()
    .withMessage("Birth Date is required"),
];

module.exports = { contactValidation }