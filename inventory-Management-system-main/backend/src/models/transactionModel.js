import db from "../config/db.js";

export const createTransaction = (transaction, callback) => {
  db.query(
    "INSERT INTO transactions (product_id, type, quantity) VALUES (?, ?, ?)",
    [transaction.product_id, transaction.type, transaction.quantity],
    callback
  );
};

export const getAllTransactions = (callback) => {
  db.query(
    `SELECT t.id, p.name AS product_name, t.type, t.quantity, t.created_at
     FROM transactions t 
     JOIN products p ON t.product_id = p.id 
     ORDER BY t.created_at DESC`,
    callback
  );
};