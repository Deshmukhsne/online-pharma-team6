import React, { useState } from "react";
import MemberSidebar from "./MemberSidebar";
import "../../styles/Profile.css";// ⬅️ link to our new CSS file
import { FaUser } from "react-icons/fa";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Revanth Nuti",
    email: "revanth@example.com",
    mobile: "9876543210",
    address: "Hyderabad, Telangana",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-layout">
      {/* Sidebar */}
      <div className="profile-sidebar">
        <MemberSidebar />
      </div>

      {/* Main Content */}
      <div className="profile-main">
        <header className="profile-header">
          <FaUser className="profile-icon" />
          <h2>My Profile</h2>
        </header>

        <div className="profile-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Mobile:</label>
              <input
                type="text"
                name="mobile"
                value={profile.mobile}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Address:</label>
              <textarea
                name="address"
                value={profile.address}
                onChange={handleChange}
                rows="3"
                required
              ></textarea>
            </div>

            <button type="submit" className="update-btn">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
