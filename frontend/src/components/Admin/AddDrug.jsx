import React, { useState } from 'react';
import AdminSidebar from '../Admin/AdminSidebar';
import '../../styles/AddDrug.css';
import { FaCapsules } from 'react-icons/fa';

function AddDrug() {
    const [collapsed, setCollapsed] = useState(true);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        company: '',
        type: '',
        price: '',
        quantity: '',
        rating: '',
        banned: '',
        description: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key]) form.append(key, formData[key]);
        });

        try {
            const response = await fetch('http://localhost:8080/api/drugs/add', {
                method: 'POST',
                body: form,
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 2000);
                setFormData({
                    id: '',
                    name: '',
                    company: '',
                    type: '',
                    price: '',
                    quantity: '',
                    rating: '',
                    banned: '',
                    description: '',
                    image: null,
                });
                setImagePreview(null);
            } else {
                const errorText = await response.text();
                alert("Upload failed: " + errorText);
            }
        } catch (err) {
            alert("Error uploading drug: " + err.message);
            console.error(err);
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
                                <label>Drug ID</label>
                                <input
                                    type="text"
                                    name="id"
                                    placeholder="Enter drug ID"
                                    value={formData.id}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Name</label>
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
                                <label>Company</label>
                                <input
                                    type="text"
                                    name="company"
                                    placeholder="Enter company name"
                                    value={formData.company}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Type</label>
                                <input
                                    type="text"
                                    name="type"
                                    placeholder="Enter drug type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Price (₹)</label>
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Enter price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Quantity (units)</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    placeholder="Enter quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Rating (1-5)</label>
                                <input
                                    type="number"
                                    name="rating"
                                    placeholder="Enter rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    min="1"
                                    max="5"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Banned (yes/no)</label>
                                <select
                                    name="banned"
                                    value={formData.banned}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Enter description"
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
                                {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: "100%", marginTop: 10 }} />}
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
