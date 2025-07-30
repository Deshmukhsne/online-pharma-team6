// components/Member/DrugSearch.jsx
import React, { useState } from "react";
import axios from "../../services/api"; // Adjust based on your axios setup

const DrugSearch = () => {
  const [searchBy, setSearchBy] = useState("id");
  const [query, setQuery] = useState("");
  const [drug, setDrug] = useState(null);

  const handleSearch = () => {
    const url = searchBy === "id"
      ? `/drugs/${query}`
      : `/drugs/name/${query}`;

    axios.get(url)
      .then((res) => setDrug(res.data))
      .catch(() => {
        alert("Drug not found");
        setDrug(null);
      });
  };

  return (
    <div>
      <h2>Search Drug</h2>
      <select onChange={(e) => setSearchBy(e.target.value)}>
        <option value="id">Search by ID</option>
        <option value="name">Search by Name</option>
      </select>
      <input
        type="text"
        placeholder="Enter value"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {drug && (
        <div>
          <h3>Drug Details</h3>
          <p><strong>Name:</strong> {drug.name}</p>
          <p><strong>Manufacturer:</strong> {drug.manufacturer}</p>
          <p><strong>Price:</strong> ₹{drug.price}</p>
          <p><strong>Quantity:</strong> {drug.quantity}</p>
          <p><strong>Expiry:</strong> {drug.expiryDate}</p>
        </div>
      )}
    </div>
  );
};

export default DrugSearch;
