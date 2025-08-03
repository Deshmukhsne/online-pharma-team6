import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./components/Admin/AdminDashboard";
import MemberDashboard from "./components/Member/MemberDashboard";
import Profile from "./components/Member/Profile";
import Cart from "./components/Member/Cart";
import Orders from "./components/Member/Orders";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/member" element={<MemberDashboard />} />
        <Route path="/member/profile" element={<Profile />} />
        <Route path="/member/cart" element={<Cart />} />
        <Route path="/member/orders" element={<Orders />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
