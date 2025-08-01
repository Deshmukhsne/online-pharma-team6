import React, { useState } from "react";
import MemberSidebar from "./MemberSidebar";
import { FaSearch } from "react-icons/fa";
import "../../styles/DrugSearch.css";

const DrugSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("id");
  const [drug, setDrug] = useState(null);
  const [error, setError] = useState("");

  // Mock API simulation
  const getDrugById = async (id) => {
    const mock = { id: 1, name: "Paracetamol", price: 50, quantity: 30 };
    if (id === "1") return { data: mock };
    throw new Error();
  };

  const getDrugByName = async (name) => {
    const mock = { id: 2, name: "Cetrizine", price: 30, quantity: 20 };
    if (name.toLowerCase() === "cetrizine") return { data: mock };
    throw new Error();
  };

  const handleSearch = async () => {
    setError("");
    setDrug(null);
    try {
      const response =
        searchType === "id"
          ? await getDrugById(searchTerm)
          : await getDrugByName(searchTerm);
      setDrug(response.data);
    } catch {
      setError("Drug not found.");
    }
  };

  return (
    <div className="drugsearch-layout">
      <div className="drugsearch-sidebar">
        <MemberSidebar />
      </div>

      <div className="drugsearch-main">
        <header className="drugsearch-header">
          <FaSearch className="drugsearch-icon" />
          <h2>Search Drug</h2>
        </header>

        <div className="drugsearch-card">
          <div className="search-form">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
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

          {error && <p className="error-msg">{error}</p>}

          {drug && (
            <div className="drug-info">
              <h3>{drug.name}</h3>
              <p><strong>Price:</strong> ₹{drug.price}</p>
              <p><strong>Quantity Available:</strong> {drug.quantity}</p>
              <button className="add-cart-btn">Add to Cart</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrugSearch;
