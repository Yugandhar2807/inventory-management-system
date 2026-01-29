import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
      <img src={product.imageUrl || 'https://via.placeholder.com/150'} alt={product.name} className="w-full h-32 object-cover mb-4 rounded" />
      <div className="flex-grow">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-gray-800 font-semibold">${product.price}</p>
        <p className="text-sm text-gray-500">Stock: {product.stock}</p>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">Edit</button>
        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">Delete</button>
      </div>
    </div>
  );
};

export default ProductCard;
