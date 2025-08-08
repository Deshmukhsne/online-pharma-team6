import React, { useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../Admin/AdminSidebar';
import '../../styles/AdminDashboard.css';
import '../../styles/AddDrug.css';

function AddDrug() {
  const [collapsed, setCollapsed] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    type: '',
    price: '',
    availableQuantity: '',
    rating: '',
    banned: false,
    description: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatted = {
      ...formData,
      price: parseFloat(formData.price),
      rating: parseInt(formData.rating),
      availableQuantity: parseInt(formData.availableQuantity),
    };

    try {
      await axios.post('http://localhost:8080/api/medicines/add', formatted);
      alert('Medicine added successfully!');
      setFormData({
        name: '',
        company: '',
        type: '',
        price: '',
        availableQuantity: '',
        rating: '',
        banned: false,
        description: '',
        imageUrl: ''
      });
    } catch (err) {
      console.error('Error uploading medicine:', err.response?.data || err);
      alert('Error adding medicine. See console.');
    }
  };

  return (
    <div className="admin-dashboard-root">
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className="admin-main-content"
        style={{ marginLeft: collapsed ? 60 : 250, width: `calc(100vw - ${collapsed ? 60 : 250}px)` }}
      >
        <section className="add-drug-section">
          <form className="drug-form" onSubmit={handleSubmit}>
            <h2 className="form-heading">Add New Medicine</h2>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Medicine Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="type">Type</label>
                <input type="text" name="type" value={formData.type} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="availableQuantity">Available Quantity</label>
                <input type="number" name="availableQuantity" value={formData.availableQuantity} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="rating">Rating (1-5)</label>
                <input type="number" name="rating" value={formData.rating} min="1" max="5" onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="banned">Is Banned?</label>
                <input type="checkbox" name="banned" checked={formData.banned} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="imageUrl">Image URL</label>
                <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea name="description" rows="4" value={formData.description} onChange={handleChange} required />
            </div>

            {formData.imageUrl && (
              <div className="image-preview">
                <img src={formData.imageUrl} alt="Preview" />
              </div>
            )}

            <button type="submit" className="submit-btn">Add Medicine</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AddDrug;
