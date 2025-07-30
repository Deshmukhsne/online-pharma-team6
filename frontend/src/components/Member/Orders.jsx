// src/components/Member/Orders.jsx
import React, { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Mock orders for UI
  useEffect(() => {
    // Replace this with real API call in future
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
    <div className="orders-page p-4">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">#</th>
            <th className="border p-2">Drug Name</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Total Price</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Order Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={order.id}>
              <td className="border p-2">{idx + 1}</td>
              <td className="border p-2">{order.drugName}</td>
              <td className="border p-2">{order.quantity}</td>
              <td className="border p-2">₹{order.totalPrice}</td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2">{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
