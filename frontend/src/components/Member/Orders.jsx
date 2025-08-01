import React, { useEffect, useState } from 'react';
import MemberSidebar from './Membersidebar';
import { FaClipboardList } from 'react-icons/fa';
import '../../styles/Orders.css';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/api/orders/all')
      .then(response => setOrders(response.data))
      .catch(error => console.error("Failed to fetch orders", error));
  }, []);

  return (
    <div className="orders-layout">
      <div className="orders-sidebar">
        <MemberSidebar />
      </div>

      <div className="orders-main">
        <header className="orders-header">
          <FaClipboardList className="orders-icon" />
          <h2>My Orders</h2>
        </header>

        <div className="orders-card">
          <div className="orders-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Medicine Name</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={order.id}>
                    <td>{idx + 1}</td>
                    <td>{order.name}</td>
                    <td>{order.quantity}</td>
                    <td>₹{order.price}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
