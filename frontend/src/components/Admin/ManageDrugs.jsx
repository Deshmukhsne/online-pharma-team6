import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import '../../styles/AdminDashboard.css';
import '../../styles/ManageDrug.css';

function ManageDrug() {
    const [collapsed, setCollapsed] = useState(true);
    const [drugs, setDrugs] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddDrug = (e) => {
        e.preventDefault();
        if (formData.name && formData.category && formData.price && formData.stock) {
            setDrugs([...drugs, formData]);
            setFormData({ name: '', category: '', price: '', stock: '' });
        }
    };

    const handleDelete = (index) => {
        const updated = drugs.filter((_, i) => i !== index);
        setDrugs(updated);
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
                                <th>Drug Name</th>

                                <th>Price</th>
                                <th>Stock</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drugs.map((drug, index) => (
                                <tr key={index}>
                                    <td>{drug.name}</td>

                                    <td>₹{drug.price}</td>
                                    <td>{drug.stock}</td>
                                    <td>{drug.description}</td>
                                    <td>{drug.image}</td>
                                    <td>
                                        <button onClick={() => handleDelete(index)} className="delete-btn">Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {drugs.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="no-data">No drugs added yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}

export default ManageDrug;

