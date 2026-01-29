import {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier
} from "../models/supplierModel.js";

// Fetch all suppliers
export const fetchSuppliers = (req, res) => {
  getAllSuppliers((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch single supplier by ID
export const fetchSupplierById = (req, res) => {
  const { id } = req.params;

  getSupplierById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json(results[0]);
  });
};

// Add new supplier
export const addSupplier = (req, res) => {
  const newSupplier = req.body;

  createSupplier(newSupplier, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    getSupplierById(results.insertId, (err, supplier) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(supplier[0]);
    });
  });
};

// Update supplier by ID
export const editSupplier = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  updateSupplier(id, updatedData, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    getSupplierById(id, (err, supplier) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(supplier[0]);
    });
  });
};

// Delete supplier by ID
export const removeSupplier = (req, res) => {
  const { id } = req.params;

  deleteSupplier(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json({ message: "Supplier deleted successfully" });
  });
};
