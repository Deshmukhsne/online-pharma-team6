import React from "react";
import { FaUser, FaSearch, FaShoppingCart, FaClipboardList, FaTachometerAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "../../styles/MemberSidebar.css";

const MemberSidebar = () => {
  const location = useLocation();

  const menu = [
    { label: "Dashboard", path: "/member", icon: <FaTachometerAlt /> },
    { label: "Profile", path: "/member/profile", icon: <FaUser /> },
   
    { label: "Cart", path: "/member/cart", icon: <FaShoppingCart /> },
    { label: "Orders", path: "/member/orders", icon: <FaClipboardList /> },
  ];

  return (
    <aside className="member-sidebar">
      <h2 className="sidebar-title">Member</h2>
      <nav className="sidebar-nav">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default MemberSidebar;