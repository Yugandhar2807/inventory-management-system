import React from 'react';

const OrderDetailsModal = ({ order, onClose, onCancelOrder, onOpenUpdateModal }) => {
  if (!order) return null;

  const getStatusBadge = (status) => {
    const baseClasses = 'px-2 py-1 text-xs font-semibold rounded-full';
    switch (status) {
      case 'Pending': return <span className={`${baseClasses} bg-orange-200 text-orange-800`}>{status}</span>;
      case 'Shipped': return <span className={`${baseClasses} bg-blue-200 text-blue-800`}>{status}</span>;
      case 'Delivered': return <span className={`${baseClasses} bg-green-200 text-green-800`}>{status}</span>;
      case 'Cancelled': return <span className={`${baseClasses} bg-red-200 text-red-800`}>{status}</span>;
      default: return null;
    }
  };

  const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Order Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold">Order ID:</h3>
            <p>{order.id}</p>
          </div>
          <div>
            <h3 className="font-semibold">Order Date:</h3>
            <p>{new Date(order.order_date).toLocaleString()}</p>
          </div>
          <div>
            <h3 className="font-semibold">Customer:</h3>
            <p>{order.customer_name}</p>
          </div>
          <div>
            <h3 className="font-semibold">Status:</h3>
            <p>{getStatusBadge(order.status)}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Products</h3>
          <ul className="list-disc list-inside">
            {items && items.map((item, index) => (
              <li key={index}>{item.product_name} - {item.quantity} pcs (₹{(item.quantity * item.price).toFixed(2)})</li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end space-x-4">
          <button onClick={() => onCancelOrder(order.id)} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400">Cancel Order</button>
          <button onClick={() => onOpenUpdateModal(order)} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Update Status</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;