import React, { useState } from 'react';

const NewOrderModal = ({ products, onClose, onAddOrder }) => {
  const [customerName, setCustomerName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [orderItems, setOrderItems] = useState([]);

  const handleAddOrderItem = () => {
    if (!selectedProduct || !quantity || quantity <= 0) return;

    const product = products.find(p => p.id === parseInt(selectedProduct));
    if (!product) return;

    const newItem = {
      product_id: product.id,
      product_name: product.name,
      quantity: parseInt(quantity),
      price: product.price,
    };

    setOrderItems([...orderItems, newItem]);
    setSelectedProduct('');
    setQuantity('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || orderItems.length === 0) return;

    onAddOrder({
      customer_name: customerName,
      items: orderItems.map(item => ({ product_id: item.product_id, quantity: item.quantity, price: item.price }))
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">New Order</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Customer Name</label>
            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md" required />
          </div>

          <div className="mb-4 border p-3 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Add Products to Order</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md">
                  <option value="" disabled>Select Product</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (₹{p.price})</option>
                  ))}
                </select>
              </div>
              <div>
                <input type="number" placeholder="Qty" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md" min="1" />
              </div>
            </div>
            <button type="button" onClick={handleAddOrderItem} className="mt-3 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 w-full">
              Add Product to Order
            </button>

            {orderItems.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Order Items:</h4>
                <ul className="list-disc list-inside">
                  {orderItems.map((item, index) => (
                    <li key={index}>{item.product_name} - {item.quantity} pcs (₹{(item.quantity * item.price).toFixed(2)})</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Create Order</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOrderModal;