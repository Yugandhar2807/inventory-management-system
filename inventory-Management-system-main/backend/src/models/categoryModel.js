import db from "../config/db.js";

// Get all categories
export const getAllCategories = (callback) => {
  db.query("SELECT * FROM categories", callback);
};

// Get single category by id
export const getCategoryById = (id, callback) => {
  db.query("SELECT * FROM categories WHERE id = ?", [id], callback);
};

// Add new category
export const createCategory = (category, callback) => {
  db.query("INSERT INTO categories (name, description) VALUES (?, ?)",
    [category.name, category.description],
    callback
  );
};

// Update category
export const updateCategory = (id, category, callback) => {
  db.query("UPDATE categories SET name=?, description=? WHERE id=?",
    [category.name, category.description, id],
    callback
  );
};

// Delete category
export const deleteCategory = (id, callback) => {
  db.query("DELETE FROM categories WHERE id = ?", [id], callback);
};
