import api from './api';

export const getOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const getOrderById = async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
};

export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await api.put(`/orders/${orderId}/status`, { status });
  return response.data;
};

export const deleteOrder = async (orderId) => {
  const response = await api.delete(`/orders/${orderId}`);
  return response.data;
};
