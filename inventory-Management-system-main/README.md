# 📦 Inventory Management System

A full-stack web application for managing inventory, products, suppliers, categories, orders, and transactions with user authentication.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=000)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=fff)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=fff)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=fff)

## 🎯 Features

✅ **User Authentication**
- User registration and login with JWT tokens
- Password hashing with bcryptjs
- Role-based access control (Admin, Staff)
- Protected routes and authorization

✅ **Inventory Management**
- Create, read, update, and delete products
- Track stock levels
- Manage product categories
- Monitor inventory transactions (purchase/sale)

✅ **Supplier Management**
- Add and manage suppliers
- Store supplier contact information
- Link suppliers to products

✅ **Order Management**
- Create and track customer orders
- Manage order items and quantities
- Update order status

✅ **Transaction Tracking**
- Log purchase and sale transactions
- Automatic stock updates
- Transaction history

✅ **User-Friendly Dashboard**
- Real-time inventory overview
- Interactive UI with Tailwind CSS
- Responsive design for all devices

## 🏗️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL (with in-memory mock fallback for development)
- **Authentication**: JWT + bcryptjs
- **API**: RESTful API

### Frontend
- **Library**: React 19
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: React Context API

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **MySQL** Server v5.7+ ([Download](https://dev.mysql.com/downloads/mysql/)) - Optional for development
- **Git** ([Download](https://git-scm.com/))

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Yugandhar2807/inventory-management-system.git
cd inventory-management-system
```

### 2. Setup Backend

```bash
cd backend
npm install
npm run dev
```

The backend server will start on `http://localhost:5000`

**Note**: If MySQL is not available, the app will automatically use an in-memory database for development.

### 3. Setup Frontend (in a new terminal)

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints
```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login and get JWT token
```

### Product Endpoints
```
GET    /api/products            - Get all products
GET    /api/products/:id        - Get product by ID
POST   /api/products            - Create new product
PUT    /api/products/:id        - Update product
DELETE /api/products/:id        - Delete product
```

### Category Endpoints
```
GET    /api/categories          - Get all categories
POST   /api/categories          - Create category
PUT    /api/categories/:id      - Update category
DELETE /api/categories/:id      - Delete category
```

### Supplier Endpoints
```
GET    /api/suppliers           - Get all suppliers
POST   /api/suppliers           - Create supplier
PUT    /api/suppliers/:id       - Update supplier
DELETE /api/suppliers/:id       - Delete supplier
```

### Order Endpoints
```
GET    /api/orders              - Get all orders
POST   /api/orders              - Create order
PUT    /api/orders/:id          - Update order status
DELETE /api/orders/:id          - Delete order
```

### Transaction Endpoints
```
GET    /api/transactions        - Get all transactions
POST   /api/transactions        - Create transaction
```

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_token>
```

Tokens are obtained by logging in and stored in localStorage on the frontend.

## 🗂️ Project Structure

```
inventory-management-system/
├── backend/
│   ├── server.js                 # Express server entry point
│   ├── .env                      # Environment configuration
│   ├── package.json
│   └── src/
│       ├── app.js               # App setup (currently empty)
│       ├── config/
│       │   ├── db.js            # MySQL connection with mock fallback
│       │   └── mockDb.js        # In-memory database for development
│       ├── controllers/          # Request handlers
│       ├── middleware/           # Auth middleware
│       ├── models/               # Database queries
│       └── routes/               # API routes
│
├── frontend/
│   ├── index.html               # HTML entry point
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS config
│   ├── package.json
│   └── src/
│       ├── main.jsx             # React entry point
│       ├── App.jsx              # Main App component
│       ├── components/          # Reusable components
│       ├── pages/               # Page components
│       ├── services/            # API client
│       ├── context/             # React Context
│       └── index.css            # Global styles
│
├── database/
│   ├── schema.sql               # Database schema
│   └── seed.sql                 # Sample data
│
├── SETUP_GUIDE.md               # Detailed setup instructions
└── README.md                    # This file
```

## 💾 Database Setup

### Option 1: Using MySQL (Recommended for Production)

1. **Create Database**
```bash
mysql -u root -p
```

```sql
CREATE DATABASE inventory_db;
USE inventory_db;
```

2. **Import Schema**
```bash
mysql -u root -p inventory_db < database/schema.sql
```

3. **Update .env**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=inventory_db
```

### Option 2: Use Mock Database (Development)

The backend automatically uses an in-memory mock database if MySQL is unavailable:
- Sample data is pre-loaded
- Changes are NOT persisted after restart
- Perfect for testing and development

## 🧪 Testing the Application

### 1. Access the Frontend
- Open http://localhost:5173 in your browser

### 2. Create an Account
- Click "Register"
- Enter name, email, and password
- Click "Register"

### 3. Login
- Use your registered credentials
- Click "Login"

### 4. Test Features
- **Dashboard**: View inventory overview
- **Products**: Create, edit, delete products
- **Categories**: Manage product categories  
- **Suppliers**: Add supplier information
- **Orders**: Create and manage orders
- **Transactions**: Track purchase/sale history

## ⚙️ Environment Configuration

### Backend (.env)
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=harini7890
DB_NAME=inventory_db
PORT=5000
JWT_SECRET=super_secret_change_me
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

## 🐛 Troubleshooting

### Backend won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### MySQL connection failed
- Ensure MySQL is running
- Check .env credentials are correct
- If MySQL unavailable, mock database will be used

### Frontend not connecting to API
- Verify backend is running on port 5000
- Check VITE_API_URL in frontend/.env
- Ensure CORS is enabled on backend

### Port already in use
```bash
# Kill process using port 5000 (backend)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process using port 5173 (frontend)
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

## 🔐 Security Notes

⚠️ **For Production Use:**

- Change JWT_SECRET to a strong random value
- Use HTTPS instead of HTTP
- Implement rate limiting
- Add input validation and sanitization
- Use strong database passwords
- Don't commit .env files to Git
- Keep dependencies updated: `npm audit fix`
- Implement CORS properly (not "*" in production)

## 📝 Sample Login Credentials (Mock Database)

```
Email: admin@example.com
Password: (set during registration)

Email: staff@example.com
Password: (set during registration)
```

## 🚀 Deployment

### Backend Deployment
- Heroku, AWS EC2, DigitalOcean, Railway, Render
- Use environment variables for sensitive data
- Ensure MySQL database is accessible

### Frontend Deployment
- Vercel, Netlify, GitHub Pages
- Build: `npm run build`
- Deploy dist folder

### Database Deployment
- AWS RDS, Google Cloud SQL, Azure Database
- Ensure proper backups and security

## 📖 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👨‍💻 Author

**Yugandhar2807**

- GitHub: [@Yugandhar2807](https://github.com/Yugandhar2807)
- Repository: [inventory-management-system](https://github.com/Yugandhar2807/inventory-management-system)

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on [GitHub Issues](https://github.com/Yugandhar2807/inventory-management-system/issues)
- Check existing documentation in SETUP_GUIDE.md

## 🎉 Status

✅ **Project Status**: Active & Maintained

- Backend: Fully functional with Express.js API
- Frontend: Fully functional with React UI
- Database: MySQL with mock fallback
- Testing: Ready for development and production

---

**Made with ❤️ by Yugandhar2807**

Happy coding! 🚀
 
