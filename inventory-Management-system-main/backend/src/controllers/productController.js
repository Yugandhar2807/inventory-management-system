// backend/src/controllers/productController.js

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../models/productModel.js";

// ✅ Fetch all products
export const fetchProducts = (req, res) => {
  getAllProducts((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// ✅ Fetch single product by ID
export const fetchProductById = (req, res) => {
  const { id } = req.params;

  getProductById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(results[0]);
  });
};

// ✅ Add new product
export const addProduct = (req, res) => {
  const newProduct = req.body;

  createProduct(newProduct, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    getProductById(results.insertId, (err, product) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(product[0]);
    });
  });
};

// ✅ Update product by ID
export const editProduct = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  updateProduct(id, updatedData, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    getProductById(id, (err, product) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(product[0]);
    });
  });
};

// ✅ Delete product by ID
export const removeProduct = (req, res) => {
  const { id } = req.params;

  deleteProduct(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "🗑️ Product deleted successfully" });
  });
};
