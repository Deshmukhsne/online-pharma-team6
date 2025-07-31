// src/components/Member/DrugSearch.jsx
import React, { useState } from "react";
import { getDrugById, getDrugByName } from "../../services/api";

const DrugSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("id");
  const [drug, setDrug] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setDrug(null);
    try {
      if (searchType === "id") {
        const response = await getDrugById(searchTerm);
        setDrug(response.data);
      } else {
        const response = await getDrugByName(searchTerm);
        setDrug(response.data);
      }
    } catch (err) {
      setError("Drug not found.");
    }
  };

  return (
    <div className="container">
      <h2>Search Drug</h2>
      <div style={{ marginBottom: "15px" }}>
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="id">Search by ID</option>
          <option value="name">Search by Name</option>
        </select>
        <input
          type="text"
          placeholder={`Enter drug ${searchType}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {drug && (
        <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px" }}>
          <h3>{drug.name}</h3>
          <p><strong>Price:</strong> ₹{drug.price}</p>
          <p><strong>Quantity Available:</strong> {drug.quantity}</p>
          <button>Add to Cart</button>
        </div>
      )}
    </div>
  );
};

export default DrugSearch;
