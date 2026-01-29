import express from "express";
import { addTransaction, fetchTransactions } from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", addTransaction);
router.get("/", fetchTransactions);

export default router;