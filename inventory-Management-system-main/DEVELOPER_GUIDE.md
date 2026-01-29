# 👨‍💻 Developer Guide

## Project Overview

This is a **Full-Stack Inventory Management System** designed for learning and production use.

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Frontend (React + Vite)               │
│              http://localhost:5173                      │
│                                                         │
│  - Components (Navbar, Sidebar, Modals)                │
│  - Pages (Dashboard, Products, Orders, etc.)           │
│  - Context API (Auth, Products)                        │
│  - Axios API Client                                    │
└──────────────────┬──────────────────────────────────────┘
                   │
                   │ HTTP/REST
                   │
┌──────────────────▼──────────────────────────────────────┐
│                Backend (Express.js)                     │
│              http://localhost:5000                      │
│                                                         │
│  - Controllers (Product, Auth, Order, etc.)            │
│  - Models (Database Queries)                           │
│  - Routes (API Endpoints)                              │
│  - Middleware (JWT Auth)                               │
│  - Config (DB Connection)                              │
└──────────────────┬──────────────────────────────────────┘
                   │
                   │ SQL
                   │
┌──────────────────▼──────────────────────────────────────┐
│              Database Layer                            │
│                                                         │
│  Option 1: MySQL (Production)                          │
│  Option 2: Mock In-Memory DB (Development)             │
└─────────────────────────────────────────────────────────┘
```

## Backend Architecture

### File Structure
```
backend/
├── server.js                    # Entry point
├── .env                        # Environment variables
├── package.json
└── src/
    ├── config/
    │   ├── db.js              # MySQL connection
    │   └── mockDb.js          # Mock database
    ├── controllers/
    │   ├── authController.js
    │   ├── productController.js
    │   ├── categoryController.js
    │   ├── supplierController.js
    │   ├── orderController.js
    │   └── transactionController.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── models/
    │   ├── productModel.js
    │   ├── categoryModel.js
    │   ├── supplierModel.js
    │   ├── orderModel.js
    │   └── transactionModel.js
    └── routes/
        ├── authRoutes.js
        ├── productRoutes.js
        ├── categoryRoutes.js
        ├── supplierRoutes.js
        ├── orderRoutes.js
        └── transactionRoutes.js
```

### API Flow

```
Request → Express Middleware (CORS) 
    ↓
Route Handler → Controller Function
    ↓
Validate Data
    ↓
Call Model Function
    ↓
Execute SQL Query (MySQL or Mock)
    ↓
Process Results
    ↓
Send JSON Response
```

### Example: Creating a Product

```javascript
// 1. Frontend sends request
POST /api/products
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Laptop",
  "category": "Electronics",
  "supplier": "Tech Corp",
  "stock": 50,
  "price": 999.99
}

// 2. Backend processes
// routes/productRoutes.js → controllers/productController.js
export const addProduct = (req, res) => {
  const newProduct = req.body;
  createProduct(newProduct, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    // Fetch and return created product
    getProductById(results.insertId, (err, product) => {
      res.status(201).json(product[0]);
    });
  });
};

// 3. Model executes query
// models/productModel.js
export const createProduct = (product, callback) => {
  db.query(
    "INSERT INTO products (name, category, supplier, stock, price) VALUES (?, ?, ?, ?, ?)",
    [product.name, product.category, product.supplier, product.stock, product.price],
    callback
  );
};

// 4. Response sent to frontend
{
  "id": 1,
  "name": "Laptop",
  "category": "Electronics",
  "supplier": "Tech Corp",
  "stock": 50,
  "price": 999.99,
  "created_at": "2026-01-29T12:00:00.000Z"
}
```

## Frontend Architecture

### File Structure
```
frontend/src/
├── main.jsx                    # React entry point
├── App.jsx                     # Main app component
├── index.css                   # Global styles
├── components/
│   ├── Navbar.jsx            # Top navigation
│   ├── Sidebar.jsx           # Left sidebar
│   ├── ProtectedRoute.jsx    # Private route wrapper
│   ├── ProductCard.jsx       # Product display card
│   ├── AddProductModal.jsx   # Product form modal
│   ├── EditCategoryModal.jsx
│   ├── SupplierFormModal.jsx
│   ├── NewOrderModal.jsx
│   ├── OrderDetailsModal.jsx
│   ├── NewTransactionModal.jsx
│   └── UpdateStatusModal.jsx
├── pages/
│   ├── Login.jsx             # Login page
│   ├── Register.jsx          # Registration page
│   ├── Dashboard.jsx         # Main dashboard
│   ├── Products.jsx          # Products page
│   ├── Categories.jsx        # Categories page
│   ├── Suppliers.jsx         # Suppliers page
│   ├── Orders.jsx            # Orders page
│   └── Transactions.jsx      # Transactions page
├── services/
│   ├── api.js                # Axios client
│   ├── productService.js
│   ├── categoryService.js
│   ├── supplierService.js
│   ├── orderService.js
│   └── transactionService.js
├── context/
│   ├── AuthContext.jsx       # Authentication state
│   └── ProductContext.jsx    # Product state
└── data/
    ├── products.js           # Static data
    └── transactions.js       # Static data
```

### User Flow

```
1. User visits http://localhost:5173
   ↓
2. App checks if token in localStorage
   ├─ No token → Redirect to /login
   ├─ Token exists → Load dashboard
   ↓
3. Login page
   - User enters email & password
   - Submit to /api/auth/login
   - Get JWT token
   - Store in localStorage
   - Redirect to dashboard
   ↓
4. Dashboard
   - Fetch initial data
   - Display inventory overview
   - Show navigation menu
   ↓
5. User navigates to different pages
   - Click navigation item
   - Load specific page
   - Fetch data from API
   - Display data in UI
   ↓
6. User performs actions
   - Create: POST request
   - Update: PUT request
   - Delete: DELETE request
   - Real-time UI update
```

## Authentication Flow

### Registration
```
User Input (name, email, password)
    ↓
Frontend: POST /api/auth/register
    ↓
Backend: Hash password with bcryptjs
    ↓
Database: INSERT user record
    ↓
Frontend: Redirect to login
```

### Login
```
User Input (email, password)
    ↓
Frontend: POST /api/auth/login
    ↓
Backend: Find user by email
    ↓
Backend: Compare password with hash
    ↓
Backend: Generate JWT token
    ↓
Frontend: Store token in localStorage
    ↓
Frontend: Set Authorization header
    ↓
Frontend: Redirect to dashboard
```

### Protected Routes
```
User accesses protected page
    ↓
ProtectedRoute checks token
    ├─ No token → Redirect to login
    ├─ Valid token → Show page
    └─ Expired token → Logout & redirect
    ↓
Frontend: Add token to request header
    ↓
Backend: Middleware verifies JWT
    ├─ Invalid token → Return 403
    └─ Valid token → Process request
```

## Database Schema

### Users Table
```sql
id (Primary Key)
name (VARCHAR)
email (UNIQUE)
password (hashed)
role (admin/staff)
created_at (Timestamp)
```

### Products Table
```sql
id (Primary Key)
name (VARCHAR)
category (VARCHAR)
supplier (VARCHAR)
stock (INT)
price (DECIMAL)
created_at (Timestamp)
```

### Categories Table
```sql
id (Primary Key)
name (VARCHAR)
description (TEXT)
created_at (Timestamp)
```

### Suppliers Table
```sql
id (Primary Key)
name (VARCHAR)
email (VARCHAR)
phone (VARCHAR)
address (TEXT)
created_at (Timestamp)
```

### Orders Table
```sql
id (Primary Key)
customer_name (VARCHAR)
order_date (Timestamp)
status (VARCHAR)
```

### Transactions Table
```sql
id (Primary Key)
product_id (Foreign Key)
type (purchase/sale)
quantity (INT)
created_at (Timestamp)
```

## Development Workflow

### 1. Backend Development

**Making Changes to Controllers:**
```javascript
// Edit: backend/src/controllers/productController.js
export const fetchProducts = (req, res) => {
  // Your changes here
  getAllProducts((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Server automatically reloads (nodemon not configured, manual restart needed)
// Just save and wait for console output
```

**Adding New Endpoint:**
```javascript
// 1. Create controller method in controllers/
// 2. Create model method in models/
// 3. Add route in routes/

// Example: productController.js
export const getProductsByCategory = (req, res) => {
  const { category } = req.params;
  getProductsByCategory(category, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// routes/productRoutes.js
router.get("/category/:category", authMiddleware, productController.getProductsByCategory);
```

### 2. Frontend Development

**Making Changes to Components:**
```jsx
// Edit: frontend/src/pages/Products.jsx
import { useState, useEffect } from 'react'
import api from '../services/api'

export default function Products() {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    fetchProducts()
  }, [])
  
  const fetchProducts = async () => {
    try {
      const res = await api.get('/products')
      setProducts(res.data)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }
  
  return (
    <div>
      {/* Your JSX here */}
    </div>
  )
}

// Vite automatically hot-reloads on save
```

**Adding New Service:**
```javascript
// Create: frontend/src/services/newService.js
import api from './api'

export const getNewData = async () => {
  const res = await api.get('/new-endpoint')
  return res.data
}

// Use in components:
import { getNewData } from '../services/newService'
```

## Common Tasks

### Add a New Feature (Product Categories)

1. **Database**: Schema already has categories table
2. **Backend**:
   ```javascript
   // models/categoryModel.js - Already exists
   // controllers/categoryController.js - Already exists
   // routes/categoryRoutes.js - Already exists
   ```
3. **Frontend**:
   ```jsx
   // pages/Categories.jsx - Already exists
   // components/EditCategoryModal.jsx - Already exists
   ```

### Add a New API Endpoint

1. **Create Model** (`backend/src/models/newModel.js`):
   ```javascript
   import db from "../config/db.js"
   export const newFunction = (callback) => {
     db.query("SELECT * FROM table", callback)
   }
   ```

2. **Create Controller** (`backend/src/controllers/newController.js`):
   ```javascript
   import { newFunction } from "../models/newModel.js"
   export const handleRequest = (req, res) => {
     newFunction((err, results) => {
       if (err) return res.status(500).json({ error: err })
       res.json(results)
     })
   }
   ```

3. **Add Route** (`backend/src/routes/newRoutes.js`):
   ```javascript
   import express from "express"
   import * as controller from "../controllers/newController.js"
   import authMiddleware from "../middleware/authMiddleware.js"
   
   const router = express.Router()
   router.get("/", authMiddleware, controller.handleRequest)
   export default router
   ```

4. **Register Route** (`backend/server.js`):
   ```javascript
   import newRoutes from "./src/routes/newRoutes.js"
   app.use("/api/new", newRoutes)
   ```

5. **Create Service** (`frontend/src/services/newService.js`):
   ```javascript
   import api from './api'
   export const getNewData = () => api.get('/new')
   ```

6. **Use in Component**:
   ```jsx
   import { getNewData } from '../services/newService'
   
   const [data, setData] = useState([])
   useEffect(() => {
     getNewData().then(res => setData(res.data))
   }, [])
   ```

## Testing

### Manual Testing

1. **Test Registration**:
   - Go to /register
   - Create account
   - Verify user created in database

2. **Test Login**:
   - Go to /login
   - Use created account
   - Verify token in localStorage

3. **Test CRUD Operations**:
   - Create: Add new product
   - Read: View product list
   - Update: Edit product
   - Delete: Remove product

4. **Test API Directly**:
   ```bash
   # Test login
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"pass"}'
   
   # Test with token
   curl -X GET http://localhost:5000/api/products \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

## Debugging

### Backend Debugging

```javascript
// Add console logs
console.log("Product ID:", productId)
console.log("Request body:", req.body)
console.log("Database error:", err)

// Check .env variables
console.log("Database:", process.env.DB_NAME)

// Use try-catch for async operations
try {
  const result = await query()
} catch (error) {
  console.error("Error:", error.message)
}
```

### Frontend Debugging

```javascript
// React DevTools Browser Extension
// Check Components, Hooks, Props

// Network tab in DevTools
// Check API requests and responses

// Console logs
console.log("Token:", localStorage.getItem('token'))
console.log("User data:", userData)
console.log("API response:", response)

// React Error Boundary
// Wrap components to catch errors
```

## Performance Tips

1. **Backend**:
   - Use connection pooling for MySQL
   - Add indexes to frequently queried columns
   - Cache frequently accessed data
   - Implement pagination for large datasets

2. **Frontend**:
   - Use React.memo for expensive components
   - Implement lazy loading for routes
   - Optimize images and assets
   - Use useCallback to memoize functions

3. **Database**:
   - Regular backups
   - Monitor query performance
   - Archive old data periodically

## Deployment Checklist

- [ ] Test all features thoroughly
- [ ] Update .env for production
- [ ] Build frontend: `npm run build`
- [ ] Run security audit: `npm audit`
- [ ] Test on production-like environment
- [ ] Set up monitoring and logging
- [ ] Configure backups
- [ ] Document deployment steps
- [ ] Train users
- [ ] Have rollback plan

## Resources

- Express.js: https://expressjs.com/
- React: https://react.dev/
- Vite: https://vitejs.dev/
- MySQL: https://dev.mysql.com/
- JWT: https://jwt.io/
- Tailwind CSS: https://tailwindcss.com/

---

Happy coding! 🚀
