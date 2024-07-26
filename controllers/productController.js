// controllers/productController.js

import {
  storeProductValidation,
  updateProductValidation,
} from "../validation/validationProduct.js";
import { validationResult } from "express-validator";
import {
  getAllProducts as getAllProductsService,
  getProductById as getProductByIdService,
  createProduct as createProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
} from "../services/productService.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductByIdService(parseInt(id));
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  await Promise.all(
    storeProductValidation.map((validator) => validator.run(req))
  );

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, price, description, image } = req.body;

  try {
    const product = await createProductService({
      name,
      price,
      description,
      image,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  await Promise.all(
    updateProductValidation.map((validator) => validator.run(req))
  );

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name, price, description, image } = req.body;

  try {
    const product = await getProductByIdService(parseInt(id));
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const updatedProduct = await updateProductService(parseInt(id), {
      name,
      price,
      description,
      image,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await getProductByIdService(parseInt(id));
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await deleteProductService(parseInt(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
