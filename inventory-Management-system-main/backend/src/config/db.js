import mysql from "mysql2";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create the MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    console.log("⚠️  Running in demo mode without database persistence");
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});

// Handle connection errors gracefully
db.on('error', function(err) {
  console.error('❌ Database error:', err);
});

export default db;