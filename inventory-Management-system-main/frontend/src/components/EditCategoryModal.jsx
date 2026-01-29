import React, { useState, useEffect } from 'react';

const EditCategoryModal = ({ category, onClose, onUpdateCategory }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description || '');
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onUpdateCategory({ ...category, name, description });
    onClose();
  };

  if (!category) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Category</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md" required />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="mt-1 block w-full px-3 py-2 border rounded-md"></textarea>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Update Category</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
