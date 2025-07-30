// src/components/Member/Profile.jsx
import React, { useState } from 'react';

const Profile = () => {
  // Mock initial profile data
  const [profile, setProfile] = useState({
    name: 'Revanth Nuti',
    email: 'revanth@example.com',
    mobile: '9876543210',
    address: 'Hyderabad, Telangana',
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
    // You can later call an API to update the profile
  };

  return (
    <div className="profile-page p-4">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="block font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="border w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Email:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="border w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={profile.mobile}
            onChange={handleChange}
            className="border w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Address:</label>
          <textarea
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="border w-full p-2"
            rows="3"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
