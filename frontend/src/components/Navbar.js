import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access");

  const handleLogout = () => {
    localStorage.removeItem("access");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">🛒 E-Commerce</h1>
      <div>
        {token ? (
          <>
            <Link to="/products" className="mr-4 hover:underline">Products</Link>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4 hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
