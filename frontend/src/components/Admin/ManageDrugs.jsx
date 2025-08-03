import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';
import '../../styles/AdminDashboard.css';
import '../../styles/ManageDrug.css';
import Swal from 'sweetalert2';


function ManageDrug() {
    const [collapsed, setCollapsed] = useState(true);
    const [drugs, setDrugs] = useState([]);
    const [editingDrug, setEditingDrug] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchDrugs();
    }, []);

    const fetchDrugs = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/drugs/all');
            setDrugs(res.data);
        } catch (err) {
            console.error('Error fetching drugs:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/drugs/${id}`);
            setDrugs(prev => prev.filter(d => d.id !== id));
        } catch (err) {
            console.error('Error deleting drug:', err);
        }
    };
    const handleEditClick = (drug) => {
        setEditingDrug({
            id: drug.id, // ✅ keep it as a number (Long-compatible)
            // force string type
            name: drug.name,
            company: drug.company,
            type: drug.type,
            price: drug.price,
            quantity: drug.quantity,
            rating: drug.rating,
            description: drug.description,
        });
        setShowModal(true);
    };



    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingDrug(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        console.log("Sending to backend:", editingDrug);

        e.preventDefault();
        console.log("Updating drug with ID:", editingDrug.id, typeof editingDrug.id); // 👈 LOG THIS

        try {
            await axios.put(`http://localhost:8080/api/drugs/${editingDrug.id}`, editingDrug, {
                headers: { 'Content-Type': 'application/json' }
            });

            setShowModal(false);
            setEditingDrug(null);
            fetchDrugs();

            Swal.fire({
                icon: 'success',
                title: 'Drug updated successfully!',
                timer: 1500,
                showConfirmButton: false
            });
        } catch (err) {
            console.error('Update error:', err);
            Swal.fire({
                icon: 'error',
                title: 'Update failed',
                text: 'Please check the drug ID and try again.'
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
                                <th>Drug Name</th>
                                <th>Company</th>
                                <th>Type</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Rating</th>
                                <th>Description</th>

                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drugs.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="no-data">No drugs found.</td>
                                </tr>
                            ) : (
                                drugs.map((drug) => {
                                    console.log('Image path:', drug.image); // ✅ Debug line

                                    return (
                                        <tr key={drug.id}>
                                            <td>{drug.name}</td>
                                            <td>{drug.company}</td>
                                            <td>{drug.type}</td>
                                            <td>₹{drug.price.toFixed(2)}</td>
                                            <td>{drug.quantity}</td>
                                            <td>{drug.rating}</td>
                                            <td style={{ maxWidth: 200 }}>{drug.description}</td>
                                            <td>
                                                <button onClick={() => handleEditClick(drug)} className="edit-btn">Edit</button>
                                                <button onClick={() => handleDelete(drug.id)} className="delete-btn">Delete</button>
                                            </td>

                                        </tr>
                                    );
                                })
                            )}
                        </tbody>

                    </table>
                </section>
            </main>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Edit Drug</h3>
                        <form onSubmit={handleUpdate}>
                            <input type="text" name="name" value={editingDrug.name} onChange={handleEditChange} required />
                            <input type="text" name="company" value={editingDrug.company} onChange={handleEditChange} required />
                            <input type="text" name="type" value={editingDrug.type} onChange={handleEditChange} required />
                            <input type="number" name="price" value={editingDrug.price} onChange={handleEditChange} required />
                            <input type="number" name="quantity" value={editingDrug.quantity} onChange={handleEditChange} required />
                            <input type="number" name="rating" value={editingDrug.rating} onChange={handleEditChange} min="1" max="5" required />
                            <textarea name="description" value={editingDrug.description} onChange={handleEditChange} rows="3" required />

                            <div className="modal-actions">
                                <button type="submit" className="update-btn">Update</button>
                                <button type="button" onClick={() => setShowModal(false)} className="cancel-btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ManageDrug;
