
import React, { useState, useEffect } from 'react';

import AdminSidebar from './AdminSidebar';
import '../../styles/AdminDashboard.css';
import '../../styles/ManageDrug.css';

function ManageDrug() {
    const [collapsed, setCollapsed] = useState(true);
    const [drugs, setDrugs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingDrug, setEditingDrug] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    useEffect(() => {
        const fetchDrugs = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:8080/api/drugs/all');

                console.log("Response status:", response.status);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Received data:", data);

                setDrugs(data);
            } catch (err) {
                console.error("Failed to fetch drugs:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDrugs();
    }, []);

    // Delete drug
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/drugs/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete drug');

            setDrugs(drugs.filter(drug => drug.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };
    // Edit drug - open modal
    const handleEdit = (drug) => {
        setEditingDrug(drug);
        setShowEditModal(true);
    };


    // Update drug
    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log("Starting update process...");

        try {
            const formData = new FormData();
            formData.append('id', editingDrug.id);
            formData.append('name', editingDrug.name);
            formData.append('company', editingDrug.company);
            formData.append('type', editingDrug.type);
            formData.append('price', editingDrug.price);
            formData.append('quantity', editingDrug.quantity);
            formData.append('rating', editingDrug.rating);
            formData.append('banned', editingDrug.banned);
            formData.append('description', editingDrug.description);

            if (editingDrug.imageFile) {
                formData.append('image', editingDrug.imageFile);
                console.log("Including image file in update");
            }

            console.log("FormData contents:");
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            const response = await fetch(`http://localhost:8080/api/drugs/${editingDrug.id}`, {
                method: 'PUT',
                body: formData
            });

            console.log("Update response status:", response.status);

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error details:", errorData);
                throw new Error('Failed to update drug');
            }

            const updatedDrug = await response.json();
            console.log("Updated drug:", updatedDrug);

            setDrugs(drugs.map(d => d.id === updatedDrug.id ? updatedDrug : d));
            setShowEditModal(false);
        } catch (err) {
            console.error("Update error:", err);
            setError(err.message);
        }
    };
    // Handle form changes
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingDrug(prev => ({ ...prev, [name]: value }));
    };

    // Handle image change
    const handleEditImageChange = (e) => {
        setEditingDrug(prev => ({
            ...prev,
            imageFile: e.target.files[0],
            imageUrl: URL.createObjectURL(e.target.files[0])
        }));
    };
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
        }
    };

    const handleAddDrug = (e) => {
        e.preventDefault();
        const isValid = Object.values(formData).every((val) => val !== '' && val !== null);
        if (isValid) {
            setDrugs([...drugs, formData]);
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
                    <div className="admin-title">Manage Drugs</div>
                    <div className="admin-user">
                        <span className="admin-avatar">A</span>
                        <span style={{ fontWeight: 500, color: '#333' }}>Admin</span>
                    </div>
                </header>



                <section>
                    <table className="drug-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Company</th>
                                <th>Type</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Rating</th>
                                <th>Banned</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drugs.map((drug, index) => (
                                <tr key={index}>
                                    <td>{drug.id}</td>
                                    <td>{drug.name}</td>
                                    <td>{drug.company}</td>
                                    <td>{drug.type}</td>
                                    <td>₹{drug.price}</td>
                                    <td>{drug.quantity}</td>
                                    <td>{drug.rating}</td>
                                    <td>{drug.banned}</td>
                                    <td>{drug.description}</td>
                                    <td>
                                        {drug.imageUrl ? (
                                            <>
                                                <img
                                                    src={`http://localhost:8080/images/${drug.imageUrl}`}  // Added forward slash
                                                    alt={drug.name}
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        objectFit: 'cover'
                                                    }}
                                                    onError={(e) => {
                                                        console.error("Failed to load image at:", e.target.src);
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'block';
                                                    }}
                                                />
                                                <span style={{
                                                    display: 'none',
                                                    color: '#999',
                                                    fontSize: '0.8rem'
                                                }}>
                                                    Image not available
                                                </span>
                                            </>
                                        ) : (
                                            <span style={{ color: '#999' }}>No image uploaded</span>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleEdit(drug)}
                                            className="edit-btn"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(drug.id)}
                                            className="delete-btn"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {drugs.length === 0 && (
                                <tr>
                                    <td colSpan="11" className="no-data">No drugs added yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
                {showEditModal && editingDrug && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>Edit Drug</h2>
                            <form onSubmit={handleUpdate}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editingDrug.name}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Company</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={editingDrug.company}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Type</label>
                                    <input
                                        type="text"
                                        name="type"
                                        value={editingDrug.type}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={editingDrug.price}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Quantity</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={editingDrug.quantity}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Rating</label>
                                    <input
                                        type="number"
                                        name="rating"
                                        value={editingDrug.rating}
                                        onChange={handleEditChange}
                                        min="1"
                                        max="5"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Banned</label>
                                    <select
                                        name="banned"
                                        value={editingDrug.banned}
                                        onChange={handleEditChange}
                                        required
                                    >
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        name="description"
                                        value={editingDrug.description}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleEditImageChange}
                                    />
                                    {editingDrug.imageUrl && (
                                        <img
                                            src={editingDrug.imageUrl.startsWith('blob:')
                                                ? editingDrug.imageUrl
                                                : `http://localhost:8080${editingDrug.imageUrl}`}
                                            alt="Preview"
                                            style={{ width: 100, height: 100, marginTop: 10 }}
                                        />
                                    )}
                                </div>

                                <div className="modal-actions">
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        className="cancel-btn"
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="save-btn">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default ManageDrug;
