import React, { useState } from "react";
import MemberSidebar from "./MemberSidebar";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";

const Cart = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Paracetamol", price: 50, quantity: 2 },
    { id: 2, name: "Cetrizine", price: 30, quantity: 1 },
  ]);

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f9" }}>
      {/* Sidebar */}
      <div style={{ width: "220px", backgroundColor: "#2c3e50", color: "white" }}>
        <MemberSidebar />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "2rem" }}>
        <header style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
          <FaShoppingCart style={{ fontSize: "1.8rem", color: "#3498db", marginRight: "10px" }} />
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#2c3e50" }}>
            My Cart
          </h2>
        </header>

        {cart.length === 0 ? (
          <p style={{ color: "#888" }}>No items in cart.</p>
        ) : (
          <div style={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.05)", padding: "1.5rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#138ab5ff", textAlign: "left" }}>
                  <th style={{ padding: "12px" }}>#</th>
                  <th style={{ padding: "12px" }}>Medicine</th>
                  <th style={{ padding: "12px" }}>Price</th>
                  <th style={{ padding: "12px" }}>Quantity</th>
                  <th style={{ padding: "12px" }}>Total</th>
                  <th style={{ padding: "12px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={item.id} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "12px" }}>{index + 1}</td>
                    <td style={{ padding: "12px" }}>{item.name}</td>
                    <td style={{ padding: "12px" }}>₹{item.price}</td>
                    <td style={{ padding: "12px" }}>{item.quantity}</td>
                    <td style={{ padding: "12px" }}>₹{item.price * item.quantity}</td>
                    <td style={{ padding: "12px" }}>
                      <button
                        onClick={() => handleRemove(item.id)}
                        style={{
                          backgroundColor: "#e74c3c",
                          color: "white",
                          border: "none",
                          padding: "6px 10px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ textAlign: "right", fontSize: "1.2rem", fontWeight: "bold", color: "#2c3e50" }}>
              Total Price: ₹{totalPrice}
            </div>

            <div style={{ textAlign: "right", marginTop: "1rem" }}>
              <button
                onClick={() => alert("Order placed successfully!")}
                style={{
                  backgroundColor: "#3498db",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
