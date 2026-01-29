import api from './api';

export const getTransactions = async () => {
  const response = await api.get('/transactions');
  return response.data;
};

export const createTransaction = async (transactionData) => {
  const response = await api.post('/transactions', transactionData);
  return response.data;
};