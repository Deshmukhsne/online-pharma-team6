// src/components/members/ManageMembers.js
import React, { useState } from 'react';
import AdminSidebar from "./AdminSidebar";
import '../../styles/AdminDashboard.css';
import '../../styles/ManageMembers.css';

function ManageMembers() {
    const [collapsed, setCollapsed] = useState(true);
    const [members, setMembers] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', role: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddMember = (e) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.role) {
            setMembers([...members, formData]);
            setFormData({ name: '', email: '', role: '' });
        }
    };

    const handleDelete = (index) => {
        const updated = members.filter((_, i) => i !== index);
        setMembers(updated);
    };

    return (
        <div className="admin-dashboard-root">
            <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <main
                className="admin-main-content"
                style={{ marginLeft: collapsed ? 60 : 250, width: `calc(100vw - ${collapsed ? 60 : 250}px)` }}
            >
                <header className="admin-header">
                    <div className="admin-title">Manage Members</div>
                    <div className="admin-user">
                        <span className="admin-avatar">A</span>
                        <span>Admin</span>
                    </div>
                </header>

                <section className="manage-members-section">


                    <table className="member-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="no-data">No members added yet.</td>
                                </tr>
                            ) : (
                                members.map((member, index) => (
                                    <tr key={index}>
                                        <td>{member.name}</td>
                                        <td>{member.email}</td>
                                        <td>{member.role}</td>
                                        <td>
                                            <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}

export default ManageMembers;
