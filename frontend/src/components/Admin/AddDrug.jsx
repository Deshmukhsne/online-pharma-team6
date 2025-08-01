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
        stock: '',
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
        setFormData({
            name: '',
            description: '',
            price: '',
            stock: '',
            image: null,
        });
        setImagePreview(null);
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
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter drug name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Price (₹)</label>
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Enter drug price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Stock (units)</label>
                                <input
                                    type="number"
                                    name="stock"
                                    placeholder="Enter drug stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Enter drug description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    required
                                />
                            </div>

                            <div
                                className="dropzone"
                                onClick={() => document.getElementById("imageUpload").click()}
                            >
                                <p>Click or drag image here</p>
                                <input
                                    id="imageUpload"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleImageChange}
                                />
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
