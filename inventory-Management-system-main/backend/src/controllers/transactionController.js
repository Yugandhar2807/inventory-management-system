import { createTransaction, getAllTransactions } from "../models/transactionModel.js";
import db from "../config/db.js";

export const addTransaction = (req, res) => {
  const { product_id, type, quantity } = req.body;

  // Update product quantity
  const query = type === "purchase"
    ? "UPDATE products SET quantity = quantity + ? WHERE id = ?"
    : "UPDATE products SET quantity = quantity - ? WHERE id = ?";

  db.query(query, [quantity, product_id], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    // Save transaction
    createTransaction({ product_id, type, quantity }, (err2, results) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.status(201).json({ message: "Transaction recorded", id: results.insertId });
    });
  });
};

export const fetchTransactions = (req, res) => {
  getAllTransactions((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};