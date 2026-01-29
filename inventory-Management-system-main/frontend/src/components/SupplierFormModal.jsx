import React, { useState, useEffect } from 'react';

const SupplierFormModal = ({ supplier, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (supplier) {
      setFormData(supplier);
    } else {
      setFormData({ name: '', email: '', phone: '', address: '' });
    }
  }, [supplier]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6">{supplier ? 'Edit Supplier' : 'Add Supplier'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" />
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" onClick={onClose} className="bg-gray-300 py-2 px-4 rounded-lg">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierFormModal;
