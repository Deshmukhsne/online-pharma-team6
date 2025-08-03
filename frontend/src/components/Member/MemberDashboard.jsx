import React, { useState, useEffect } from "react";
import MemberSidebar from "./Membersidebar";
import "../../styles/MemberDashboard.css";
import { FaShoppingCart, FaClipboardList, FaPills } from "react-icons/fa";
import axios from "axios";

const MemberDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [medCount, setMedCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [medicines, setMedicines] = useState([]);

  const memberId = localStorage.getItem("memberId");

  useEffect(() => {
    axios.get("http://localhost:8080/api/medicines/available-count")
      .then(res => setMedCount(res.data))
      .catch(err => console.error("Error fetching medicine count:", err));

    axios.get("http://localhost:8080/api/orders/count?memberId=" + memberId)
      .then(res => setOrderCount(res.data))
      .catch(err => console.error("Error fetching order count:", err));

    axios.get("http://localhost:8080/api/medicines/cart-count?memberId=" + memberId)
      .then(res => setCartCount(res.data))
      .catch(err => console.error("Error fetching cart count:", err));

    axios.get("http://localhost:8080/api/medicines/all")
      .then(res => setMedicines(res.data))
      .catch(err => console.error("Error fetching medicine list:", err));
  }, [memberId]);

  const handleAddToCart = (medicineId) => {
    const cartItem = {
      memberId: memberId,
      medicineId: medicineId,
      quantity: 1
    };

    axios.post("http://localhost:8080/api/cart/add", cartItem)
      .then(() => {
        alert("Added to cart successfully!");
        // Refresh cart count
        axios.get("http://localhost:8080/api/medicines/cart-count?memberId=" + memberId)
          .then(res => setCartCount(res.data));
      })
      .catch(err => {
        console.error("Error adding to cart:", err);
        alert("Failed to add to cart.");
      });
  };

  const stats = [
    { label: "Items in Cart", value: cartCount, icon: <FaShoppingCart style={{ color: 'var(--member-primary)' }} /> },
    { label: "Orders Placed", value: orderCount, icon: <FaClipboardList style={{ color: 'var(--member-secondary)' }} /> },
    { label: "Medicines Available", value: medCount, icon: <FaPills style={{ color: '#e67e22' }} /> },
  ];

  return (
    <div className="member-dashboard-root">
      <MemberSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className="member-main-content" style={{ marginLeft: collapsed ? 60 : 240, width: `calc(100vw - ${collapsed ? 60 : 240}px)` }}>
        <header className="member-header">
          <div className="member-title">Welcome to Member Dashboard</div>
        </header>

        <section className="member-stats">
          {stats.map((stat) => (
            <div className="member-stat-card" key={stat.label}>
              <div style={{ fontSize: '2.2rem', marginBottom: 8 }}>{stat.icon}</div>
              <div className="member-stat-label">{stat.label}</div>
              <div className="member-stat-value">{stat.value}</div>
            </div>
          ))}
        </section>

        <section className="medicine-table-section">
          <h2>All Medicines</h2>
          <table className="medicine-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Company</th>
                <th>Available Quantity</th>
                <th>Type</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine) => (
                <tr key={medicine.id}>
                  <td>{medicine.id}</td>
                  <td>{medicine.name}</td>
                   <td>{medicine.company}</td>
                   
                  <td>{medicine.availableQuantity}</td>
                   <td>{medicine.type}</td>
                    <td>{medicine.price}</td>

                  <td>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(medicine.id)}
                    >
                      Add to Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default MemberDashboard;
