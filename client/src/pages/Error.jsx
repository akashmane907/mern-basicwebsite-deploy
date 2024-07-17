// ErrorPage.js

import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you use react-router-dom for navigation
import './Error.css';

const ErrorPage = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1>Oops! Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <div className="error-actions">
          <Link to="/" className="btn btn-primary">Go to Home</Link>
          <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
        </div>
        <div className="error-contact">
          <p>If you continue to experience issues, please contact our support team:</p>
          <p>Email: support@example.com</p>
          <p>Phone: +1234567890</p>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
