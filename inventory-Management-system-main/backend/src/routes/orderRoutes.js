import express from "express";
const router = express.Router();
import * as orderController from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

// All routes need login
router.get("/", authMiddleware, orderController.fetchOrders);
router.get("/:id", authMiddleware, orderController.fetchOrderById);
router.post("/", authMiddleware, orderController.addOrder);
router.put("/:id/status", authMiddleware, orderController.editOrderStatus);
router.delete("/:id", authMiddleware, orderController.removeOrder);

export default router;
