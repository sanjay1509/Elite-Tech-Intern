import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState({ totalSales: 0, orderCount: 0 });

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/orders', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchSalesReport = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/sales', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSales(response.data);
    } catch (error) {
      console.error('Error fetching sales report:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchSalesReport();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h3>Total Sales: ${sales.totalSales}</h3>
      <h4>Total Orders: {sales.orderCount}</h4>

      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Pizza</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId?.name}</td>
              <td>{order.pizzaId?.name}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
