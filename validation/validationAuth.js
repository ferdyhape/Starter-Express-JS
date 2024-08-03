import { body } from "express-validator";

export const validateRegister = [
  body("email").isEmail().withMessage("Email is not valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("name").isString().withMessage("Name must be a string"),
];

export const validateLogin = [
  // email and password is required
  body("email").isString().withMessage("Email must be a string"),
  body("password").isString().withMessage("Password must be a string"),
];
