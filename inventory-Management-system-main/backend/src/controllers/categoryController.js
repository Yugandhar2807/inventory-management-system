import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from "../models/categoryModel.js";

// Fetch all categories
export const fetchCategories = (req, res) => {
  getAllCategories((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch single category by ID
export const fetchCategoryById = (req, res) => {
  const { id } = req.params;

  getCategoryById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(results[0]);
  });
};

// Add new category
export const addCategory = (req, res) => {
  const newCategory = req.body;

  createCategory(newCategory, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    getCategoryById(results.insertId, (err, category) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(category[0]);
    });
  });
};

// Update category by ID
export const editCategory = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  updateCategory(id, updatedData, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    getCategoryById(id, (err, category) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(category[0]);
    });
  });
};

// Delete category by ID
export const removeCategory = (req, res) => {
  const { id } = req.params;

  deleteCategory(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  });
};
