import { body } from "express-validator";

// validate product with column name, price, and description
export const storeProductValidation = [
  body("name").notEmpty().isString().withMessage("Name is required"),
  body("price").notEmpty().withMessage("Price is required"),
  body("description").notEmpty().withMessage("Description is required"),
];
