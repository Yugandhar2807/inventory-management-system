import React, { useState, useEffect } from 'react';

const UpdateStatusModal = ({ order, onClose, onUpdateStatus }) => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
  }, [order]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateStatus(order.id, status);
    onClose();
  };

  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6">Update Order Status</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 block w-full border rounded-md p-2">
              <option>Pending</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" onClick={onClose} className="bg-gray-300 py-2 px-4 rounded-lg">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">Update Status</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStatusModal;
