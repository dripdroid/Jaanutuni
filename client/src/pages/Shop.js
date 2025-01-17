import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/Shop.css';
import { useNavigate } from 'react-router-dom';

function Shop() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the backend API
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5001/products'); // Replace with your backend URL
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setItems(data); // Update the state with fetched products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle cart icon click
  const handleCartClick = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartItems.length > 0) {
      navigate('/cart');
    } else {
      alert('Your cart is empty!');
    }
  };

  return (
    <div className="shop">
      <div className="product-grid">
        {items.map(item => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
      <div className="hiddenDiv" onClick={handleCartClick}>
        <i className="fas fa-shopping-cart"></i>
      </div>
    </div>
  );
}

export default Shop;
