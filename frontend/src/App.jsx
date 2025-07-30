import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./components/Admin/AdminDashboard";
import MemberDashboard from "./components/Member/MemberDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/member" element={<MemberDashboard />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
