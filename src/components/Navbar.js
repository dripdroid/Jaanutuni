import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import image1 from '../img/logotransparent.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
      <img src={image1} alt="Image 1" />
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;