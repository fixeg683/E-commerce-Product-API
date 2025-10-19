import React from 'react';
import { Link } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  return (
    <div className="order-success-container">
      <div className="order-success-card">
        <div className="success-icon">✓</div>
        <h1 className="success-title">Order Successful!</h1>
        <p className="success-message">
          Thank you for your purchase. Your order has been confirmed and will be processed shortly.
        </p>
        <p className="order-details">
          You will receive an email confirmation with your order details.
        </p>
        <div className="success-actions">
          <Link to="/products" className="continue-shopping-btn">
            Continue Shopping
          </Link>
          <Link to="/" className="home-btn">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;