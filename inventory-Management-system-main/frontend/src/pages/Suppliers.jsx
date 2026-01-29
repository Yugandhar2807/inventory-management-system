import React, { useState, useEffect } from 'react';
import SupplierFormModal from '../components/SupplierFormModal';
import { getSuppliers, createSupplier, updateSupplier, deleteSupplier } from '../services/supplierService';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const data = await getSuppliers();
      setSuppliers(data);
    } catch (err) {
      setError('Failed to fetch suppliers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleOpenModal = (supplier = null) => {
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingSupplier(null);
    setIsModalOpen(false);
  };

  const handleSaveSupplier = async (supplierData) => {
    try {
      if (editingSupplier) {
        await updateSupplier(editingSupplier.id, supplierData);
      } else {
        await createSupplier(supplierData);
      }
      fetchSuppliers();
    } catch (err) {
      setError('Failed to save supplier');
      console.error(err);
    }
  };

  const handleDeleteSupplier = async (id) => {
    try {
      await deleteSupplier(id);
      fetchSuppliers();
    } catch (err) {
      setError('Failed to delete supplier');
      console.error(err);
    }
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Supplier Management</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search suppliers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button onClick={() => handleOpenModal()} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
            Add Supplier
          </button>
        </div>
      </div>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          {loading ? (
            <p>Loading suppliers...</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{supplier.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleOpenModal(supplier)} className="text-yellow-500 hover:text-yellow-600 mr-4 font-semibold py-1 px-3 rounded-md bg-yellow-100 hover:bg-yellow-200 transition duration-150 ease-in-out">Edit</button>
                      <button onClick={() => handleDeleteSupplier(supplier.id)} className="text-red-500 hover:text-red-600 font-semibold py-1 px-3 rounded-md bg-red-100 hover:bg-red-200 transition duration-150 ease-in-out">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {isModalOpen && <SupplierFormModal supplier={editingSupplier} onClose={handleCloseModal} onSave={handleSaveSupplier} />}
    </div>
  );
};

export default Suppliers;