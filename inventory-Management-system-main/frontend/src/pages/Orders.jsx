import React, { useState, useEffect, useMemo, useContext } from 'react';
import OrderDetailsModal from '../components/OrderDetailsModal';
import NewOrderModal from '../components/NewOrderModal';
import UpdateStatusModal from '../components/UpdateStatusModal';
import { getOrders, createOrder, updateOrderStatus, getOrderById } from '../services/orderService';
import { ProductContext } from '../context/ProductContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { products } = useContext(ProductContext);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleViewOrder = async (orderId) => {
    try {
        const orderDetails = await getOrderById(orderId);
        setSelectedOrder(orderDetails);
        setIsViewModalOpen(true);
    } catch (err) {
        setError('Failed to fetch order details');
        console.error(err);
    }
  };

  const handleAddOrder = async (newOrder) => {
    try {
      await createOrder(newOrder);
      fetchOrders();
    } catch (err) {
      setError('Failed to add order');
      console.error(err);
    }
  };

  const handleOpenUpdateModal = (order) => {
    setSelectedOrder(order);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (err) {
      setError('Failed to update order status');
      console.error(err);
    }
  };

  const handleCancelOrder = (orderId) => {
    handleUpdateStatus(orderId, 'Cancelled');
  };

  const summary = useMemo(() => ({
    today: orders.filter(o => new Date(o.order_date).toDateString() === new Date().toDateString()).length,
    pending: orders.filter(o => o.status === 'Pending').length,
    shipped: orders.filter(o => o.status === 'Shipped').length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    cancelled: orders.filter(o => o.status === 'Cancelled').length,
  }), [orders]);

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

  const filteredOrders = orders
    .filter(order => statusFilter === 'All' || order.status === statusFilter)
    .filter(order => 
      order.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(order.order_date).toLocaleDateString().toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Orders</h1>
        <div className="flex items-center space-x-4">
          <input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="px-4 py-2 border rounded-lg" />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-4 py-2 border rounded-lg">
            <option>All</option>
            <option>Pending</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <button onClick={() => setIsNewModalOpen(true)} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">+ New Order</button>
        </div>
      </div>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md"><h3>Total Orders Today</h3><p className="text-3xl font-bold">{summary.today}</p></div>
        <div className="bg-orange-100 p-6 rounded-lg shadow-md"><h3>Pending Orders</h3><p className="text-3xl font-bold">{summary.pending}</p></div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md"><h3>Shipped Orders</h3><p className="text-3xl font-bold">{summary.shipped}</p></div>
        <div className="bg-green-100 p-6 rounded-lg shadow-md"><h3>Delivered Orders</h3><p className="text-3xl font-bold">{summary.delivered}</p></div>
        <div className="bg-red-100 p-6 rounded-lg shadow-md"><h3>Cancelled Orders</h3><p className="text-3xl font-bold">{summary.cancelled}</p></div>
      </div>

      {/* Orders Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          {loading ? (
            <p>Loading orders...</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.customer_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.products}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(order.order_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(order.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button onClick={() => handleViewOrder(order.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">View</button>
                      <button onClick={() => handleOpenUpdateModal(order)} className="text-yellow-500 hover:text-yellow-600 mr-4">Update</button>
                      <button onClick={() => handleCancelOrder(order.id)} className="text-red-500 hover:text-red-600">Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {isViewModalOpen && <OrderDetailsModal order={selectedOrder} onClose={() => setIsViewModalOpen(false)} />}
      {isNewModalOpen && <NewOrderModal products={products} onClose={() => setIsNewModalOpen(false)} onAddOrder={handleAddOrder} />}
      {isUpdateModalOpen && <UpdateStatusModal order={selectedOrder} onClose={() => setIsUpdateModalOpen(false)} onUpdateStatus={handleUpdateStatus} />}
    </div>
  );
};

export default Orders;