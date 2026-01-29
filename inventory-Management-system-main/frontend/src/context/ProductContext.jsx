import React, { createContext, useState, useEffect } from 'react';
import * as productService from '../services/productService';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async (product) => {
    try {
      const newProduct = await productService.createProduct(product);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const product = await productService.updateProduct(id, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === id ? product : p))
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await productService.deleteProduct(id);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
