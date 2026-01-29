import db from "../config/db.js";

// Get all products
export const getAllProducts = (callback) => {
  db.query("SELECT * FROM products", callback);
};

// Get single product by id
export const getProductById = (id, callback) => {
  db.query("SELECT * FROM products WHERE id = ?", [id], callback);
};

// Add new product
export const createProduct = (product, callback) => {
  db.query("INSERT INTO products (name, category, supplier, stock, price) VALUES (?, ?, ?, ?, ?)",
    [product.name, product.category, product.supplier, product.stock, parseFloat(product.price)],
    callback
  );
};

// Update product
export const updateProduct = (id, product, callback) => {
  db.query("UPDATE products SET name=?, category=?, supplier=?, stock=?, price=? WHERE id=?",
    [product.name, product.category, product.supplier, product.stock, parseFloat(product.price), id],
    callback
  );
};

// Delete product
export const deleteProduct = (id, callback) => {
  db.query("DELETE FROM products WHERE id = ?", [id], callback);
};