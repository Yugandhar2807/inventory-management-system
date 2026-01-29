import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./src/routes/productRoutes.js";
import transactionRoutes from "./src/routes/transactionRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import supplierRoutes from "./src/routes/supplierRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import "./src/config/db.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/orders", orderRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Inventory Management System API running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
