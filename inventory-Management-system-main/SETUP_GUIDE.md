# Inventory Management System - Setup Guide

## Project Overview
This is a **Full-Stack Inventory Management System** with:
- **Backend**: Node.js + Express.js (REST API)
- **Frontend**: React 19 + Vite + React Router v7 + Tailwind CSS
- **Database**: MySQL
- **Authentication**: JWT + bcryptjs

### Features
- User Registration & Login with JWT authentication
- Product Management (Create, Read, Update, Delete)
- Transaction Tracking (Purchase/Sale)
- Category Management
- Supplier Management
- Order Management
- Role-based Access Control

---

## Prerequisites

Before you start, ensure you have:

1. **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
2. **MySQL Server** (v5.7 or higher) - [Download](https://dev.mysql.com/downloads/mysql/)
3. **Git** - [Download](https://git-scm.com/)
4. **npm** or **yarn** package manager (comes with Node.js)

---

## Installation & Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/Yugandhar2807/inventory-management-system.git
cd inventory-management-system
```

### Step 2: Setup Database

#### Option A: Using MySQL Command Line
1. Start MySQL Server
2. Log into MySQL:
   ```bash
   mysql -u root -p
   ```
3. Create the database:
   ```sql
   CREATE DATABASE inventory_db;
   USE inventory_db;
   ```
4. Import the schema:
   ```bash
   mysql -u root -p inventory_db < database/schema.sql
   ```
5. (Optional) Import seed data:
   ```bash
   mysql -u root -p inventory_db < database/seed.sql
   ```

#### Option B: Using MySQL Workbench
1. Open MySQL Workbench
2. Create a new connection to your MySQL server
3. Open the SQL file: `database/schema.sql`
4. Execute the script
5. Open the SQL file: `database/seed.sql` (optional)
6. Execute the script

### Step 3: Setup Backend

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables by editing `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=inventory_db
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   NODE_ENV=development
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   
   You should see: `🚀 Server running on port 5000`
   
   ✅ Backend is now running at `http://localhost:5000`

### Step 4: Setup Frontend

1. Open a new terminal and navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (optional for API URL):
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

   You should see: `Local: http://localhost:5173/`
   
   ✅ Frontend is now running at `http://localhost:5173`

---

## API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - Login user

### Products
- **GET** `/api/products` - Get all products
- **GET** `/api/products/:id` - Get product by ID
- **POST** `/api/products` - Add new product
- **PUT** `/api/products/:id` - Update product
- **DELETE** `/api/products/:id` - Delete product

### Transactions
- **GET** `/api/transactions` - Get all transactions
- **POST** `/api/transactions` - Create transaction

### Categories
- **GET** `/api/categories` - Get all categories
- **POST** `/api/categories` - Add category
- **PUT** `/api/categories/:id` - Update category
- **DELETE** `/api/categories/:id` - Delete category

### Suppliers
- **GET** `/api/suppliers` - Get all suppliers
- **POST** `/api/suppliers` - Add supplier
- **PUT** `/api/suppliers/:id` - Update supplier
- **DELETE** `/api/suppliers/:id` - Delete supplier

### Orders
- **GET** `/api/orders` - Get all orders
- **POST** `/api/orders` - Create order
- **PUT** `/api/orders/:id` - Update order status
- **DELETE** `/api/orders/:id` - Delete order

---

## Testing the Application

### 1. Access the Frontend
Open your browser and go to: `http://localhost:5173`

### 2. Create an Account
- Click "Register"
- Enter your name, email, and password
- Click "Register"

### 3. Login
- Go to Login page
- Enter your registered email and password
- Click "Login"

### 4. Test Features
- **Dashboard**: View inventory overview
- **Products**: Add, edit, delete products
- **Categories**: Manage product categories
- **Suppliers**: Manage suppliers
- **Orders**: Create and track orders
- **Transactions**: View purchase/sale transactions

---

## Project Structure

```
inventory-management-system/
├── backend/
│   ├── server.js                 # Main server file
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── src/
│       ├── app.js               # Express app configuration
│       ├── config/
│       │   └── db.js            # Database connection
│       ├── controllers/          # Route controllers
│       ├── middleware/           # Authentication middleware
│       ├── models/               # Database models
│       └── routes/               # API routes
│
├── frontend/
│   ├── index.html               # Main HTML file
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── package.json
│   └── src/
│       ├── main.jsx             # React entry point
│       ├── App.jsx              # Main App component
│       ├── components/          # Reusable components
│       ├── pages/               # Page components
│       ├── services/            # API services
│       ├── context/             # React Context (Auth, Products)
│       └── index.css            # Tailwind CSS imports
│
├── database/
│   ├── schema.sql               # Database schema
│   └── seed.sql                 # Sample data
│
└── README.md                    # Project documentation
```

---

## Troubleshooting

### Backend Issues

#### "Cannot find module 'mysql2'"
```bash
cd backend
npm install
```

#### "Port 5000 already in use"
- Change the PORT in `.env`
- Or kill the process using the port:
  - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`

#### "Database connection failed"
- Check MySQL is running
- Verify `.env` credentials
- Ensure database `inventory_db` exists
- Check firewall settings

### Frontend Issues

#### "Cannot find module 'react'"
```bash
cd frontend
npm install
```

#### "API calls fail with 404"
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env`
- Verify API routes in backend

#### "Tailwind CSS not applying"
```bash
npm run build:css
```

---

## Production Deployment

### Backend (Node.js)
1. Build: `npm run build` (if applicable)
2. Deploy to services like:
   - Heroku
   - AWS EC2
   - DigitalOcean
   - Railway.app

### Frontend (Vite)
1. Build: `npm run build`
2. Deploy to:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - GitHub Pages

### Database
- Use managed MySQL services:
  - AWS RDS
  - Google Cloud SQL
  - Azure Database for MySQL

---

## Security Notes

⚠️ **Important for Production:**
- Change `JWT_SECRET` to a strong, random value
- Use HTTPS instead of HTTP
- Store sensitive data in secure environment variables
- Implement rate limiting
- Add input validation and sanitization
- Use strong database passwords
- Enable CORS properly (not "*" in production)
- Keep dependencies updated

---

## Contributing

Feel free to fork and submit pull requests!

---

## License

ISC License - See LICENSE file for details

---

## Support

For issues or questions:
- Open an issue on GitHub
- Check existing documentation
- Review error logs

---

**Happy coding! 🚀**
