import React, { useEffect, useState } from 'react';
import MemberSidebar from './MemberSidebar';
import { FaClipboardList } from 'react-icons/fa';
import '../../styles/Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const mockOrders = [
      {
        id: 1,
        drugName: 'Paracetamol',
        quantity: 2,
        totalPrice: 50,
        status: 'Delivered',
        date: '2025-07-28',
      },
      {
        id: 2,
        drugName: 'Amoxicillin',
        quantity: 1,
        totalPrice: 90,
        status: 'Pending',
        date: '2025-07-30',
      },
    ];
    setOrders(mockOrders);
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
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Drug Name</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Order Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={order.id}>
                  <td>{idx + 1}</td>
                  <td>{order.drugName}</td>
                  <td>{order.quantity}</td>
                  <td>₹{order.totalPrice}</td>
                  <td>{order.status}</td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
