import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDrugs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/api/drugs');
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      const data = await response.json();
      setDrugs(data);
    } catch (err) {
      setError(`Failed to load data: ${err.message}`);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrugs();
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const DrugStatus = ({ quantity }) => (
    <span className={`status ${quantity === 0 ? 'out' : 'available'}`}>
      {quantity === 0 ? 'Out of Stock' : 'Available'}
    </span>
  );

  return (
    <div className="admin-container">
    
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="logo-container">
          <h3 className="logo-text">Pharma Admin</h3>
        </div>
        
        <div className="menu">
          <div className="menu-item active">
            <span className="menu-icon">📊</span>
            {!collapsed && <span className="menu-label">Dashboard</span>}
          </div>
        </div>
        
        <button className="collapse-btn" onClick={toggleSidebar}>
          {collapsed ? '→' : '←'}
        </button>
      </div>

      
      <div className="main-content">
        <header className="admin-header">
          <div className="header-content">
            <button className="menu-toggle" onClick={toggleSidebar}>
              ☰
            </button>
            <div className="header-right">
              <span className="user-info">Admin</span>
            </div>
          </div>
        </header>
        
        <div className="content-area">
          <h2 className="dashboard-title">Drug Inventory</h2>
          
          {error && (
            <div className="error-message">
              <p>{error}</p>
              <p>Please ensure the backend server is running</p>
              <button className="retry-btn" onClick={fetchDrugs}>
                Retry
              </button>
            </div>
          )}
          
          {loading && !error && (
            <div className="loading-message">
              <div className="spinner"></div>
              <p>Loading drug data...</p>
            </div>
          )}
          
          {!loading && !error && drugs.length === 0 && (
            <div className="no-data">
              <p>No drugs found in inventory</p>
              <button className="retry-btn" onClick={fetchDrugs}>
                Refresh
              </button>
            </div>
          )}
          
          {!loading && !error && drugs.length > 0 && (
            <div className="drugs-table-container">
              <table className="drugs-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Type</th>
                    <th>Price (₹)</th>
                    <th>Quantity</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {drugs.map(drug => (
                    <tr key={drug.id}>
                      <td>{drug.id}</td>
                      <td>{drug.name}</td>
                      <td>{drug.company}</td>
                      <td>{drug.type}</td>
                      <td>{drug.price.toFixed(2)}</td>
                      <td>{drug.quantity}</td>
                      <td><DrugStatus quantity={drug.quantity} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;