import React, { useState, useEffect } from 'react';

import AdminSidebar from "./AdminSidebar";
import '../../styles/AdminDashboard.css';
import '../../styles/ManageMembers.css';

function ManageMembers() {
    const [collapsed, setCollapsed] = useState(true);
    const [members, setMembers] = useState([]);

    const [showModal, setShowModal] = useState(true);
    const [formData, setFormData] = useState({
        id: '', name: '', gender: '', dob: '', email: '',
        mobile: '', address: '', status: 'Pending'
    });
    useEffect(() => {
        fetch("http://localhost:8080/api/members")
            .then(res => res.json())
            .then(data => {
                console.log("Fetched members:", data);
                if (Array.isArray(data)) {
                    setMembers(data);
                } else {
                    console.error("Expected array but got:", typeof data);
                    setMembers([]); // Fallback to empty array to prevent crash
                }
            })

            .catch(err => console.error("Failed to fetch members:", err));
    }, []);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddMember = (e) => {
        e.preventDefault();
        if (formData.name && formData.email) {
            fetch("http://localhost:8080/api/members", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(newMember => {
                    setMembers([...members, newMember]);
                    setFormData({
                        id: '', name: '', gender: '', dob: '', email: '',
                        mobile: '', address: '', status: 'Pending'
                    });
                    setShowModal(false);
                })
                .catch(err => console.error("Add member failed:", err));
        }
    };


    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/members/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                const updated = members.filter((m) => m.id !== id);
                setMembers(updated);
            })
            .catch(err => console.error("Delete failed:", err));
    };


    const handleStatusChange = (id, newStatus) => {
        fetch(`http://localhost:8080/api/members/${id}/status?status=${newStatus}`, {
            method: "PUT"
        })
            .then(res => res.json())
            .then(updatedMember => {
                const updated = members.map(m => m.id === id ? updatedMember : m);
                setMembers(updated);
            })
            .catch(err => console.error("Status update failed:", err));
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
                    <div className="top-bar">
                        <button className="add-member-btn" onClick={() => setShowModal(true)}>+ Add Member</button>
                    </div>

                    <table className="member-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>DOB</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="no-data">No members added yet.</td>
                                </tr>
                            ) : (
                                members.map((member, index) => (
                                    <tr key={index}>
                                        <td>{member.id}</td>
                                        <td>{member.name}</td>
                                        <td>{member.gender}</td>
                                        <td>{member.dob}</td>
                                        <td>{member.email}</td>
                                        <td>{member.mobile}</td>
                                        <td>{member.address}</td>
                                        <td>{member.status}</td>
                                        <td>
                                            {member.status === 'Pending' && (
                                                <>
                                                    <button className="accept-btn" onClick={() => handleStatusChange(member.id, 'Accepted')}>Accept</button>
                                                    <button className="decline-btn" onClick={() => handleStatusChange(member.id, 'Declined')}>Decline</button>

                                                </>
                                            )}
                                            <button className="delete-btn" onClick={() => handleDelete(member.id)}>Delete</button>

                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {showModal && (
                        <div className="modal-overlay">
                            <div className="modal">
                                <h3>Add New Member</h3>
                                <form onSubmit={handleAddMember}>
                                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                                    <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" />
                                    <input name="dob" value={formData.dob} onChange={handleChange} placeholder="DOB" type="date" />
                                    <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                                    <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" />
                                    <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
                                    <div className="modal-buttons">
                                        <button type="submit" className="submit-btn">Add</button>
                                        <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default ManageMembers;
