import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext';

export default function Dashboard() {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const { products } = useContext(ProductContext);

  const totalProducts = products.length
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
  const ordersToday = 0
  const revenue = 1000

  const outOfStock = products.filter(p => p.stock === 0)
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 3)
  const highestSale = products.length > 0 ? products.reduce((max, p) => p.sold > max.sold ? p : max, products[0]) : { name: 'N/A', category: 'N/A', sold: 0 };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <button onClick={() => { logout(); navigate('/login') }} className="bg-red-500 text-white px-3 py-1   rounded">Logout</button>
      </div>

      {/* Summary Boxes */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded shadow">
          <h2 className="text-lg font-medium">Total Products</h2>
          <p className="text-2xl">{totalProducts}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded shadow">
          <h2 className="text-lg font-medium">Total Stock</h2>
          <p className="text-2xl">{totalStock}</p>
        </div>
        <div className="bg-orange-500 text-white p-4 rounded shadow">
          <h2 className="text-lg font-medium">Order Today</h2>
          <p className="text-2xl">{ordersToday}</p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded shadow">
          <h2 className="text-lg font-medium">Revenue</h2>
          <p className="text-2xl">${revenue}</p>
        </div>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 border rounded shadow">
          <h3 className="font-semibold mb-2">Out of Stock Products</h3>
          {outOfStock.length === 0 ? (
            <p>None</p>
          ) : (
            <ul className="list-disc ml-4">
              {outOfStock.map(p => (
                <li key={p.id}>{p.name} ({p.category})</li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white p-4 border rounded shadow">
          <h3 className="font-semibold mb-2">Highest Sale Product</h3>
          <p><strong>Name:</strong> {highestSale.name}</p>
          <p><strong>Category:</strong> {highestSale.category}</p>
          <p><strong>Total Units Sold:</strong> {highestSale.sold}</p>
        </div>

        <div className="bg-white p-4 border rounded shadow">
          <h3 className="font-semibold mb-2">Low Stock Products</h3>
          {lowStock.length === 0 ? (
            <p>None</p>
          ) : (
            <ul className="list-disc ml-4">
              {lowStock.map(p => (
                <li key={p.id}>{p.name} - {p.stock} left ({p.category})</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}