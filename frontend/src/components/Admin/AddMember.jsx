import React, { useState } from 'react';
import AdminSidebar from '../Admin/AdminSidebar';
import { FaUserPlus } from 'react-icons/fa';
import '../../styles/AddMember.css';

function AddMember() {
    const [collapsed, setCollapsed] = useState(true);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        gender: '',
        dob: '',
        email: '',
        mobile: '',
        address: '',
        disabled: '',
    });

    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddMember = (e) => {
        e.preventDefault();
        setSuccess(true);
        setFormData({
            id: '',
            name: '',
            gender: '',
            dob: '',
            email: '',
            mobile: '',
            address: '',
            disabled: '',
        });
        setTimeout(() => setSuccess(false), 2000);
    };

    return (
        <div className="admin-dashboard-root">
            <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <main
                className="admin-main-content"
                style={{ marginLeft: collapsed ? 60 : 250, width: `calc(100vw - ${collapsed ? 60 : 250}px)` }}
            >
                <header className="admin-header">
                    <div className="admin-title">
                        <FaUserPlus style={{ marginRight: 8 }} /> Add Member
                    </div>
                    <div className="admin-user">
                        <span className="admin-avatar">A</span>
                        <span>Admin</span>
                    </div>
                </header>

                <section className="add-member-section">
                    <form className="animated-form" onSubmit={handleAddMember}>
                        <h3 className="form-heading">Enter Member Details</h3>

                        <label htmlFor="id">Member ID</label>
                        <input
                            type="text"
                            name="id"
                            placeholder="Enter Member ID"
                            value={formData.id}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="gender">Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} required>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>

                        <label htmlFor="dob">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email ID"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="mobile">Mobile</label>
                        <input
                            type="tel"
                            name="mobile"
                            placeholder="Enter Mobile Number"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="address">Address</label>
                        <textarea
                            name="address"
                            placeholder="Enter Address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                            required
                        />

                        <label htmlFor="disabled">Is Disabled?</label>
                        <select
                            name="disabled"
                            value={formData.disabled}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>

                        <button type="submit" className="submit-btn">Add Member</button>
                        {success && <div className="success-msg">🎉 Member added successfully!</div>}
                    </form>
                </section>
            </main>
        </div>
    );
}

export default AddMember;
