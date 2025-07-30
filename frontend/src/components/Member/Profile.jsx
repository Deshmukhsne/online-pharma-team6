// components/Member/Profile.jsx
import React, { useState, useEffect } from "react";
import axios from "../../services/api"; // adjust based on your axios setup

const Profile = () => {
  const [member, setMember] = useState({ email: "", mobile: "" });

  useEffect(() => {
    axios.get("/members/me") // replace with real API endpoint
      .then((res) => setMember(res.data))
      .catch((err) => alert("Error fetching profile"));
  }, []);

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("/members/update", member) // replace with real API
      .then(() => alert("Profile updated successfully"))
      .catch(() => alert("Update failed"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Profile</h3>
      <input type="email" name="email" value={member.email} onChange={handleChange} />
      <input type="text" name="mobile" value={member.mobile} onChange={handleChange} />
      <button type="submit">Update</button>
    </form>
  );
};

export default Profile;
