import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-10">Inventory MS</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <Link to="/" className="flex items-center p-2 rounded hover:bg-gray-700">
              <ion-icon name="home-outline" class="mr-2 text-xl"></ion-icon>
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/products" className="flex items-center p-2 rounded hover:bg-gray-700">
              <ion-icon name="cube-outline" class="mr-2 text-xl"></ion-icon>
              Products
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/transactions" className="flex items-center p-2 rounded hover:bg-gray-700">
              <ion-icon name="receipt-outline" class="mr-2 text-xl"></ion-icon>
              Transactions
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/orders" className="flex items-center p-2 rounded hover:bg-gray-700">
              <ion-icon name="cart-outline" class="mr-2 text-xl"></ion-icon>
              Orders
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/categories" className="flex items-center p-2 rounded hover:bg-gray-700">
              <ion-icon name="grid-outline" class="mr-2 text-xl"></ion-icon>
              Categories
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/suppliers" className="flex items-center p-2 rounded hover:bg-gray-700">
              <ion-icon name="people-outline" class="mr-2 text-xl"></ion-icon>
              Suppliers
            </Link>
          </li>
          <li className="mb-4">
            <button onClick={() => { logout(); navigate('/login'); }} className="flex items-center p-2 rounded hover:bg-gray-700 w-full text-left">
              <ion-icon name="log-out-outline" class="mr-2 text-xl"></ion-icon>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;