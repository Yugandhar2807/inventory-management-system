import express from "express";
const router = express.Router();
import * as supplierController from "../controllers/supplierController.js";
import authMiddleware from "../middleware/authMiddleware.js";

// All routes need login
router.get("/", authMiddleware, supplierController.fetchSuppliers);
router.post("/", authMiddleware, supplierController.addSupplier);
router.put("/:id", authMiddleware, supplierController.editSupplier);
router.delete("/:id", authMiddleware, supplierController.removeSupplier);

export default router;
