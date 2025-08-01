import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import "../../styles/AdminDashboard.css";
import { FaUsers, FaPills, FaClipboardList, FaArrowRight } from "react-icons/fa";

const quickLinks = [
    { label: "Manage Drugs", icon: <FaPills />, to: "#" },
    { label: "Manage Members", icon: <FaUsers />, to: "#" },
    { label: "View Orders", icon: <FaClipboardList />, to: "#" },
];

const recentActivity = [
    { id: 1, action: "Order #1234 placed", time: "2 mins ago" },
    { id: 2, action: "User JohnDoe registered", time: "10 mins ago" },
    { id: 3, action: "Drug Paracetamol updated", time: "1 hour ago" },
];

const AdminDashboard = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [stats, setStats] = useState([
        { label: "Total Users", value: 120, icon: <FaUsers style={{ color: '#1abc9c' }} /> },
        { label: "Total Drugs", value: 0, icon: <FaPills style={{ color: '#3498db' }} /> },
        { label: "Total Orders", value: 340, icon: <FaClipboardList style={{ color: '#e67e22' }} /> },
    ]);

    useEffect(() => {
        const fetchDrugCount = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/drugs/count');
                if (!response.ok) throw new Error('Failed to fetch drug count');
                const count = await response.json();

                setStats(prevStats =>
                    prevStats.map(stat =>
                        stat.label === 'Total Drugs' ? { ...stat, value: count } : stat
                    )
                );
            } catch (error) {
                console.error("Error fetching drug count:", error);
            }
        };

        fetchDrugCount();
    }, []);

    return (
        <div className="admin-dashboard-root">
            <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <main
                className="admin-main-content"
                style={{ marginLeft: collapsed ? 60 : 250, width: `calc(100vw - ${collapsed ? 60 : 250}px)` }}
            >
                <header className="admin-header">
                    <div className="admin-title">Welcome to Admin Dashboard</div>
                    <div className="admin-user">
                        <span className="admin-avatar">A</span>
                        <span style={{ fontWeight: 500, color: '#333' }}>Admin</span>
                    </div>
                </header>
                <section className="admin-stats">
                    {stats.map((stat) => (
                        <div className="admin-stat-card" key={stat.label}>
                            <div style={{ fontSize: '2.2rem', marginBottom: 8 }}>{stat.icon}</div>
                            <div className="admin-stat-label">{stat.label}</div>
                            <div className="admin-stat-value">{stat.value}</div>
                        </div>
                    ))}
                </section>
                <section className="admin-quicklinks">
                    {quickLinks.map((link) => (
                        <a className="admin-quicklink-card" href={link.to} key={link.label}>
                            <span>{link.icon}</span>
                            <span>{link.label}</span>
                            <FaArrowRight style={{ marginLeft: 10, fontSize: '1.1rem' }} />
                        </a>
                    ))}
                </section>
                <section className="admin-activity">
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

export default AdminDashboard;
