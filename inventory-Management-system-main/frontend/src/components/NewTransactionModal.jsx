import React, { useState } from 'react';

const NewTransactionModal = ({ products, onClose, onAddTransaction }) => {
  const [productId, setProductId] = useState('');
  const [type, setType] = useState('sale');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productId || !quantity) return;

    onAddTransaction({ product_id: productId, type, quantity: parseInt(quantity) });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">New Transaction</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product</label>
            <select value={productId} onChange={(e) => setProductId(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md" required>
              <option value="" disabled>Select a product</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md">
              <option value="sale">Sale</option>
              <option value="purchase">Purchase</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md" required />
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Add Transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTransactionModal;