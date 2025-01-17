import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Checkout.css';
import { Link } from 'react-router-dom';
import axios from 'axios';  // Import axios

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const storedCart = localStorage.getItem('checkoutCart');
  const cartItems = location.state || (storedCart ? JSON.parse(storedCart) : []);

  // Calculate the total price
  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price);
    if (!isNaN(price)) {
      return total + price;
    }
    return total;
  }, 0);

  // Get the discount code and discounted price from localStorage
  const discountCode = localStorage.getItem('discountCode');
  const discountedPrice = parseFloat(localStorage.getItem('discountedPrice')) || totalPrice;

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('username');

  const handlePayment = () => {
    const isLoggedIn = localStorage.getItem('username');
    console.log('Is Logged In:', isLoggedIn); // Check the username value
  
    // If the user is not logged in, redirect to login page
    if (!isLoggedIn) {
      navigate('/'); // Redirect to login page
      return;
    }
  
    // If the user is logged in, send cart items and discount code to the backend
    const paymentData = {
      cartItems,
      discountCode,  // Include the discount code
      discountedPrice,  // Include the discounted price
      usernamep: isLoggedIn,  // Send usernamep instead of username
    };
  
    axios.post('http://localhost:5001/save-cart', paymentData)
      .then(response => {
        console.log(response.data);
        // Clear localStorage after successful payment
        localStorage.removeItem('cart');
        localStorage.removeItem('checkoutCart');
        localStorage.removeItem('discountCode'); // Clear the discount code
        localStorage.removeItem('discountedPrice'); // Clear the discounted price
  
        // Redirect to home after successful payment
        navigate('/home');
      })
      .catch(error => {
        console.error('Error saving cart:', error);
        // Handle error
      });
  };
  
  

  return (
    <>
      <div className="container">
        <h1>Shopping Cart</h1>
        <div className="cart">
          <div className="carttable">
            <div className="cart-table-header">
              <span>Item</span>
              <span>Price</span>
            </div>
            <div className="cart-table-body">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div key={index} className="cart-table-row">
                    <span>{item.name}</span>
                    <span>${item.price}</span>
                  </div>
                ))
              ) : (
                <p>Your cart is empty!</p>
              )}
            </div>
          </div>
          {cartItems.length > 0 && (
            <>
              <div className="total">
                <h3>Total: ${totalPrice.toFixed(2)}</h3>
                {discountCode && (
                  <>
                    <h4>Discount Code Applied: {discountCode}</h4>
                    <h4>Discounted Total: ${discountedPrice.toFixed(2)}</h4>
                  </>
                )}
              </div>
            </>
          )}
          <button className="pay-button" onClick={handlePayment}>
            Pay
          </button>
        </div>
      </div>
    </>
  );
}

export default Checkout;
