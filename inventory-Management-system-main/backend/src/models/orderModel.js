import db from "../config/db.js";

// Get all orders with their items
export const getAllOrders = (callback) => {
  const query = `
    SELECT o.id, o.customer_name, o.order_date, o.status,
           GROUP_CONCAT(p.name SEPARATOR ', ') AS products
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN products p ON oi.product_id = p.id
    GROUP BY o.id
    ORDER BY o.order_date DESC
  `;
  db.query(query, callback);
};

// Get single order by id
export const getOrderById = (id, callback) => {
    const query = `
    SELECT o.id, o.customer_name, o.order_date, o.status,
           JSON_ARRAYAGG(JSON_OBJECT('product_id', p.id, 'product_name', p.name, 'quantity', oi.quantity, 'price', oi.price)) AS items
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN products p ON oi.product_id = p.id
    WHERE o.id = ?
    GROUP BY o.id
  `;
  db.query(query, [id], callback);
};

// Create a new order
export const createOrder = (orderData, callback) => {
  db.beginTransaction(err => {
    if (err) return callback(err);

    const { customer_name, items } = orderData;
    db.query("INSERT INTO orders (customer_name) VALUES (?)", [customer_name], (err, orderResult) => {
      if (err) {
        return db.rollback(() => callback(err));
      }

      const orderId = orderResult.insertId;
      const orderItems = items.map(item => [orderId, item.product_id, item.quantity, item.price]);

      db.query("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?", [orderItems], (err, itemsResult) => {
        if (err) {
          return db.rollback(() => callback(err));
        }

        db.commit(err => {
          if (err) {
            return db.rollback(() => callback(err));
          }
          callback(null, orderResult);
        });
      });
    });
  });
};

// Update order status
export const updateOrderStatus = (id, status, callback) => {
  db.query("UPDATE orders SET status = ? WHERE id = ?", [status, id], callback);
};

// Delete an order
export const deleteOrder = (id, callback) => {
    db.query("DELETE FROM orders WHERE id = ?", [id], callback);
};
