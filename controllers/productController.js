import { storeProductValidation } from "../validation/validationProduct.js";
import { validationResult } from "express-validator";

export const getProducts = (req, res) => {
  let products = [
    {
      id: 1,
      name: "Product 1",
    },
    {
      id: 2,
      name: "Product 2",
    },
    {
      id: 3,
      name: "Product 3",
    },
  ];
  res.status(200).json(products);
};

export const getProductById = (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  res.status(200).json({
    id: id,
    name: "Product 1",
  });
};

export const storeProduct = (req, res) => {
  Promise.all(
    storeProductValidation.map((validator) => validator.run(req))
  ).then(() => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return res.status(200).json({
      message: "Product stored successfully",
    });
  });
};
