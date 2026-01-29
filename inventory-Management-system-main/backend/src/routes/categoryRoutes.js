import express from "express";
const router = express.Router();
import * as categoryController from "../controllers/categoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";

// All routes need login
router.get("/", authMiddleware, categoryController.fetchCategories);
router.post("/", authMiddleware, categoryController.addCategory);
router.put("/:id", authMiddleware, categoryController.editCategory);
router.delete("/:id", authMiddleware, categoryController.removeCategory);

export default router;
