import mysql from "mysql2";
import dotenv from "dotenv";
import { mockQuery } from "./mockDb.js";

// Load environment variables from .env file
dotenv.config();

let db;
let isConnected = false;
let usingMockDb = false;

// Try to create real MySQL connection
const tryMySQLConnection = () => {
  db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "inventory_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  db.connect((err) => {
    if (err) {
      console.error("❌ MySQL connection failed:", err.code);
      console.log("⚠️  Switching to mock in-memory database for development");
      console.log("ℹ️  Setup MySQL to persist data - see SETUP_GUIDE.md");
      useMockDatabase();
    } else {
      console.log("✅ Connected to MySQL Database");
      isConnected = true;
      initializeDatabase();
    }
  });

  db.on('error', function(err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('❌ Database connection lost');
      useMockDatabase();
    }
    else if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
      console.error('❌ Fatal database error');
      useMockDatabase();
    }
    else if (err.code === 'PROTOCOL_ENQUEUE_AFTER_CLOSE') {
      console.error('❌ Database connection closed');
      useMockDatabase();
    }
    else {
      console.error('❌ Database error:', err.code);
    }
  });
};

// Use mock database
const useMockDatabase = () => {
  usingMockDb = true;
  isConnected = false;
  
  // Create a proxy object that mimics mysql2 connection
  db = {
    query: mockQuery,
    connect: (callback) => callback ? callback() : null,
    on: (event, callback) => {},
    end: (callback) => callback ? callback() : null
  };
  
  console.log("ℹ️  Using mock in-memory database");
  console.log("📝 Demo mode: Data will NOT persist after restart");
  console.log("✨ All API endpoints are working with sample data\n");
};

// Initialize database with required tables
const initializeDatabase = () => {
  const schema = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'staff',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(255),
      supplier VARCHAR(255),
      stock INT DEFAULT 0,
      price DECIMAL(10, 2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS suppliers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      phone VARCHAR(50),
      address TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      customer_name VARCHAR(255) NOT NULL,
      order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(50) DEFAULT 'Pending'
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT,
      product_id INT,
      quantity INT,
      price DECIMAL(10, 2),
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT,
      type VARCHAR(50),
      quantity INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
  `;

  // Only initialize if connection is successful
  if (!isConnected || usingMockDb) return;

  schema.split(';').forEach(query => {
    if (query.trim()) {
      db.query(query.trim() + ';', (err) => {
        if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') {
          // Ignore errors silently
        }
      });
    }
  });
};

// Initialize connection
tryMySQLConnection();

export default db;
export { isConnected, usingMockDb };