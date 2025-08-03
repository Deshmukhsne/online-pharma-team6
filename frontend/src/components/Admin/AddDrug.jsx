import React, { useState } from 'react';
import AdminSidebar from '../Admin/AdminSidebar';
import '../../styles/AddDrug.css';
import { FaCapsules } from 'react-icons/fa';

function AddDrug() {
    const [collapsed, setCollapsed] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        type: '',
        company: '',
        rating: '',
        banned: 'no',
        image_url: '', // just a string path, not file upload
    });

    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/drugs/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 2000);
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    quantity: '',
                    type: '',
                    company: '',
                    rating: '',
                    banned: 'no',
                    image_url: '',
                });
            } else {
                console.error('Error uploading drug:', await response.text());
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <div className="admin-dashboard-root">
            <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <main
                className="admin-main-content"
                style={{ marginLeft: collapsed ? 60 : 250, width: `calc(100vw - ${collapsed ? 60 : 250}px)` }}
            >
                <header className="admin-header">
                    <div className="admin-title"><FaCapsules style={{ marginRight: 8 }} /> Add Drug</div>
                    <div className="admin-user">
                        <span className="admin-avatar">A</span>
                        <span>Admin</span>
                    </div>
                </header>

                <section className="add-drug-section">
                    <form className="drug-form" onSubmit={handleSubmit}>
                        <h3 className="form-heading">
                            <FaCapsules style={{ marginRight: 10, color: "#007bff" }} />
                            Add New Drug
                        </h3>
                        <p className="form-subheading">Fill in all the necessary details below</p>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Drug Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Price (₹)</label>
                                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Quantity (units)</label>
                                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Company</label>
                                <input type="text" name="company" value={formData.company} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required />
                            </div>

                            <div className="form-group">
                                <label>Type</label>
                                <input type="text" name="type" value={formData.type} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Rating</label>
                                <input type="number" name="rating" value={formData.rating} onChange={handleChange} min="1" max="5" required />
                            </div>

                            <div className="form-group">
                                <label>Banned</label>
                                <select name="banned" value={formData.banned} onChange={handleChange} required>
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                </select>
                            </div>


                        </div>

                        <button type="submit" className="submit-btn">Add Drug</button>
                        {success && <div className="success-msg">Drug added successfully!</div>}
                    </form>
                </section>
            </main>
        </div>
    );
}

export default AddDrug;
