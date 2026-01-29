import React, { useState, useContext } from "react";
import AddProductForm from "../components/AddProductForm";
import { ProductContext } from "../context/ProductContext";

const Products = () => {
  // ✅ Now inside component
  const { products, addProduct, updateProduct, deleteProduct } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddOrUpdateProduct = (formData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
      setEditingProduct(null);
    } else {
      addProduct(formData);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border">Name</th>
              <th className="text-left px-4 py-2 border">Category</th>
              <th className="text-left px-4 py-2 border">Supplier</th>
              <th className="text-left px-4 py-2 border">Price</th>
              <th className="text-left px-4 py-2 border">Stock</th>
              <th className="text-left px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.filter(product =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            ).length > 0 ? (
              products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 border">{product.name}</td>
                  <td className="px-4 py-2 border">{product.category}</td>
                  <td className="px-4 py-2 border">{product.supplier}</td>
                  <td className="px-4 py-2 border">₹{product.price.toFixed(2)}</td>
                  <td className="px-4 py-2 border">{product.stock}</td>
                  <td className="px-4 py-2 border space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                  No products match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <AddProductForm
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          onAdd={handleAddOrUpdateProduct}
          editingProduct={editingProduct}
        />
      )}
    </div>
  );
};

export default Products;
