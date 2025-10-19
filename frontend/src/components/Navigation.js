import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { logout } from '../services/auth';
import './Navigation.css';

const Navigation = () => {
  const { getTotalItems } = useContext(CartContext);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          E-Commerce
        </Link>
        
        <div className="nav-menu">
          <Link to="/products" className="nav-link">
            Products
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/cart" className="nav-link cart-link">
                Cart ({getTotalItems()})
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;