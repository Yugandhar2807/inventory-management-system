import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder
} from "../models/orderModel.js";

// Fetch all orders
export const fetchOrders = (req, res) => {
  getAllOrders((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch single order by ID
export const fetchOrderById = (req, res) => {
  const { id } = req.params;

  getOrderById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(results[0]);
  });
};

// Add new order
export const addOrder = (req, res) => {
  const newOrder = req.body;

  createOrder(newOrder, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    getOrderById(results.insertId, (err, order) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(order);
    });
  });
};

// Update order status by ID
export const editOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  updateOrderStatus(id, status, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    getOrderById(id, (err, order) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(order[0]);
    });
  });
};

// Delete order by ID
export const removeOrder = (req, res) => {
  const { id } = req.params;

  deleteOrder(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  });
};
