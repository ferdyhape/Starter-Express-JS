import express from "express";
import {
  getProducts,
  getProductById,
  storeProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Route for get
router.get("/", getProducts);
router.get("/:id", getProductById);

// Route for post
router.post("/", storeProduct);

export default router;
