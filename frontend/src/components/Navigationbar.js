import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="logo">
            Employee Management System
          </Link>
        </div>
        <div className="navbar-links">
          <Link to="/login" className="link">
            Login
          </Link>
          <Link to="/signup" className="link">
            Signup
          </Link>
        </div>
      </nav>

      <style jsx="true">{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #333;
          padding: 1rem 2rem;
          color: white;
        }
        .navbar-brand .logo {
          color: white;
          text-decoration: none;
          font-size: 1.5rem;
          font-weight: bold;
        }
        .navbar-links {
          display: flex;
          gap: 1.5rem;
        }
        .link {
          color: white;
          text-decoration: none;
          font-size: 1rem;
          transition: color 0.3s;
        }
        .link:hover {
          color: #f39c12;
        }
      `}</style>
    </>
  );
};

export default Navbar;
