import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import Carousel from '../components/Carousel';
import { Link } from 'react-router-dom';

function Home() {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      fetch('http://localhost:5001/get-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.role) {
            setRole(data.role);
            if (data.role === 'admin') {
              navigate('/admin');
            }
          }
        })
        .catch((error) => console.error('Error fetching role:', error));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!role) {
    return <p>Loading...</p>;
  }

  // Function to handle cart icon click
  const handleCartClick = () => {
    // Check if the cart has items
    const cartItems = JSON.parse(localStorage.getItem('cart')) || []; // Get cart items from localStorage
    if (cartItems.length > 0) {
      navigate('/cart'); // Redirect to the /cart page if the cart has items
    } else {
      alert('Your cart is empty!'); // Optionally show a message if the cart is empty
    }
  };

  return (
    <div className="home">
      <Carousel />
      <h1>Welcome to Jaanu Tuni Website</h1>
      <p>
        At Jaanu Tuni, we believe in celebrating individuality and self-expression. Our
        "make-your-own" platform lets you design your world, your way. Choose from a variety of unique
        designs or bring your own ideas to life, and we’ll print them on clothing, accessories, mugs,
        and more. Whether it’s a gift, a statement piece, or something truly personal, Jaanu Tuni is
        here to help you stand out and make every item uniquely yours. Start creating today and let your
        imagination shine!
      </p>
      <Link to="/shop" className="shop-now-button">
        Shop Now
      </Link>
      <div className="hiddenDiv" onClick={handleCartClick}>
        <i className="fas fa-shopping-cart"></i>
      </div>
    </div>
  );
}

export default Home;
