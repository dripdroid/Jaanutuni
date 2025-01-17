import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import image1 from '../img/logotransparent.png';

function Navbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null); // State to store the user's role
  const isLoggedIn = localStorage.getItem('username'); // Check if user is logged in

  useEffect(() => {
    // Fetch the user's role if logged in
    const fetchUserRole = async () => {
      if (isLoggedIn) {
        try {
          const response = await fetch('http://localhost:5001/get-role', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: isLoggedIn }),
          });

          const data = await response.json();
          if (response.ok) {
            setRole(data.role); // Set the role if successful
          } else {
            console.error(data.error || 'Failed to fetch role');
          }
        } catch (error) {
          console.error('Error fetching role:', error);
        }
      }
    };

    fetchUserRole();
  }, [isLoggedIn]);

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem('username');
    setRole(null); // Reset role on logout
    navigate('/'); // Navigate to the login page (or home page)
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={image1} alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/about">About</Link></li>
        {isLoggedIn && <li><Link to="/profile">Profile</Link></li>}
        {/* Conditionally render AddProduct if the user is an admin */}
        {role === 'admin' && <li><Link to="/addproduct">Add Product</Link></li>}
        {/* Conditionally render DiscountCodes if the user is an admin */}
        {role === 'admin' && <li><Link to="/discount">DiscountCodes</Link></li>}
        {isLoggedIn && (
          <li>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
