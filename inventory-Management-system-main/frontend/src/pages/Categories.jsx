import React, { useState, useEffect } from 'react';
import EditCategoryModal from '../components/EditCategoryModal';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../services/categoryService';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError('Failed to fetch categories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (categoryName.trim() === '') return;

    try {
      await createCategory({ name: categoryName, description });
      setCategoryName('');
      setDescription('');
      fetchCategories();
    } catch (err) {
      setError('Failed to add category');
      console.error(err);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (err) {
      setError('Failed to delete category');
      console.error(err);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
  };

  const handleUpdateCategory = async (updatedCategory) => {
    try {
      await updateCategory(updatedCategory.id, updatedCategory);
      fetchCategories();
    } catch (err) {
      setError('Failed to update category');
      console.error(err);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Category Management</h1>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Add New Category Form */}
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Add New Category</h2>
          <form onSubmit={handleAddCategory}>
            <div className="mb-4">
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description (Optional)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Add Category
            </button>
          </form>
        </div>

        {/* Categories Table */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Existing Categories</h2>
              <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <p>Loading categories...</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCategories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleEditCategory(category)} className="text-yellow-500 hover:text-yellow-600 mr-4 font-semibold py-1 px-3 rounded-md bg-yellow-100 hover:bg-yellow-200 transition duration-150 ease-in-out">Edit</button>
                        <button onClick={() => handleDeleteCategory(category.id)} className="text-red-500 hover:text-red-600 font-semibold py-1 px-3 rounded-md bg-red-100 hover:bg-red-200 transition duration-150 ease-in-out">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      {isEditModalOpen && <EditCategoryModal category={editingCategory} onClose={() => setIsEditModalOpen(false)} onUpdateCategory={handleUpdateCategory} />}
    </div>
  );
};

export default Categories;