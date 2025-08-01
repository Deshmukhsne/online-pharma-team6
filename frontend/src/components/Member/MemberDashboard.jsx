import React, { useState } from "react";
import MemberSidebar from "./MemberSidebar";
import "../../styles/MemberDashboard.css";
import { FaShoppingCart, FaClipboardList, FaPills, FaArrowRight, FaUser } from "react-icons/fa";

const stats = [
  { label: "Items in Cart", value: 3, icon: <FaShoppingCart style={{ color: 'var(--member-primary)' }} /> },
  { label: "Orders Placed", value: 12, icon: <FaClipboardList style={{ color: 'var(--member-secondary)' }} /> },
  { label: "Medicines Available", value: 120, icon: <FaPills style={{ color: '#e67e22' }} /> },
];

const quickLinks = [
  { label: "Go to Profile", icon: <FaUser />, to: "/member/profile" },
  { label: "Search Drugs", icon: <FaPills />, to: "/member/search" },
  { label: "View Orders", icon: <FaClipboardList />, to: "/member/orders" },
];

const recentActivity = [
  { id: 1, action: "Added Paracetamol to cart", time: "5 mins ago" },
  { id: 2, action: "Placed order #987", time: "1 hour ago" },
  { id: 3, action: "Updated profile info", time: "Yesterday" },
];

const MemberDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="member-dashboard-root">
      <MemberSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className="member-main-content"
        style={{ marginLeft: collapsed ? 60 : 240, width: `calc(100vw - ${collapsed ? 60 : 240}px)` }}
      >
        <header className="member-header">
          <div className="member-title">Welcome to Member Dashboard</div>
          <div className="member-user">
            <span className="member-avatar">M</span>
            <span style={{ fontWeight: 500, color: '#333' }}>Member</span>
          </div>
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

        <section className="member-quicklinks">
          {quickLinks.map((link) => (
            <a className="member-quicklink-card" href={link.to} key={link.label}>
              <span>{link.icon}</span>
              <span>{link.label}</span>
              <FaArrowRight style={{ marginLeft: 10, fontSize: '1.1rem' }} />
            </a>
          ))}
        </section>

        <section className="member-activity">
          <h2>Recent Activity</h2>
          <ul>
            {recentActivity.map((item) => (
              <li key={item.id}>
                <span className="activity-action">{item.action}</span>
                <span className="activity-time">{item.time}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default MemberDashboard;
