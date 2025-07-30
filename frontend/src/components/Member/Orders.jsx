// components/Member/Orders.jsx
import React, { useEffect, useState } from "react";
import axios from "../../services/api"; // Adjust if needed

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/orders/mine") // Replace with actual endpoint
      .then((res) => setOrders(res.data))
      .catch(() => alert("Could not load orders"));
  }, []);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? <p>No past orders.</p> : (
        <table>
          <thead>
            <tr><th>Order ID</th><th>Date</th><th>Total</th></tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>₹{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
