import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./components/Admin/AdminDashboard";
import MemberDashboard from "./components/Member/MemberDashboard";
import Profile from "./components/Member/Profile";
import DrugSearch from "./components/Member/DrugSearch";
import Cart from "./components/Member/Cart";
import Orders from "./components/Member/Orders";
import AddDrug from "./components/Admin/AddDrug";

import ManageMembers from "./components/Admin/ManageMembers";
import ManageDrugs from "./components/Admin/ManageDrugs";
import AddMember from "./components/Admin/AddMember";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* This is Admin routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-drug" element={<AddDrug />} />
        <Route path="/admin/members" element={<ManageMembers />} />
        <Route path="/admin/add-member" element={<AddMember />} />
        <Route path="/admin/drugs" element={<ManageDrugs />} />

        {/* This is Member routes */}
        <Route path="/member" element={<MemberDashboard />} />
        <Route path="/member/profile" element={<Profile />} />
        <Route path="/member/search" element={<DrugSearch />} />
        <Route path="/member/cart" element={<Cart />} />
        <Route path="/member/orders" element={<Orders />} />
      </Routes>



    </BrowserRouter>
  );
}

export default App;
