import express from "express";
const router = express.Router();
import * as productController from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";

// All routes need login
router.get("/", authMiddleware, productController.fetchProducts);
router.post("/", authMiddleware, productController.addProduct);
router.put("/:id", authMiddleware, productController.editProduct);
router.delete("/:id", authMiddleware, productController.removeProduct);

export default router;