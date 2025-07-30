// components/Member/Cart.jsx
import React, { useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([
    // Sample data, in real app fetch from state or backend
    { id: 1, name: "Paracetamol", price: 50, quantity: 2 },
    { id: 2, name: "Cetrizine", price: 30, quantity: 1 },
  ]);

  const handleRemove = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>No items in cart.</p> : (
        <table>
          <thead>
            <tr><th>Name</th><th>Price</th><th>Quantity</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>{item.quantity}</td>
                <td><button onClick={() => handleRemove(item.id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h4>Total Price: ₹{totalPrice}</h4>
      {cart.length > 0 && <button onClick={() => alert("Order placed!")}>Place Order</button>}
    </div>
  );
};

export default Cart;
