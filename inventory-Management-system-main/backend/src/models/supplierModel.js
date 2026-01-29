import db from "../config/db.js";

// Get all suppliers
export const getAllSuppliers = (callback) => {
  db.query("SELECT * FROM suppliers", callback);
};

// Get single supplier by id
export const getSupplierById = (id, callback) => {
  db.query("SELECT * FROM suppliers WHERE id = ?", [id], callback);
};

// Add new supplier
export const createSupplier = (supplier, callback) => {
  db.query("INSERT INTO suppliers (name, email, phone, address) VALUES (?, ?, ?, ?)",
    [supplier.name, supplier.email, supplier.phone, supplier.address],
    callback
  );
};

// Update supplier
export const updateSupplier = (id, supplier, callback) => {
  db.query("UPDATE suppliers SET name=?, email=?, phone=?, address=? WHERE id=?",
    [supplier.name, supplier.email, supplier.phone, supplier.address, id],
    callback
  );
};

// Delete supplier
export const deleteSupplier = (id, callback) => {
  db.query("DELETE FROM suppliers WHERE id = ?", [id], callback);
};
