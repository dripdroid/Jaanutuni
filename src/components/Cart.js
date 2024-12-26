import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    // Retrieve cart items from localStorage if available
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const location = useLocation();

  useEffect(() => {
    const newItem = location.state?.item;
  
    if (newItem) {
      setCartItems((prevItems) => {
        const updatedCart = [...prevItems, newItem];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      });
  
      // Clear location.state after processing
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
    // Only re-run if location.state changes

  const removeItemFromCart = (index) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((_, i) => i !== index);
      // Update localStorage with the new cart state
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Calculate the total price
  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price);
    if (!isNaN(price)) {
      return total + price;
    }
    return total;
  }, 0);

  return (
    <>
    <div className="container">
    <h1>Shopping Cart</h1>
    <div className="cart">
      
      <div className="cart-table">
        <div className="cart-table-header">
          <span>Item</span>
          <span>Price</span>
          <span> </span>
        </div>
        <div className="cart-table-body">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="cart-table-row">
                <span>{item.name}</span>
                <span>${item.price}</span>
                <button onClick={() => removeItemFromCart(index)}>Remove</button>
              </div>
            ))
          ) : (
            <p>Your cart is empty!</p>
          )}
        </div>
      </div>
      {cartItems.length > 0 && (
        <div className="total">
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
        </div>
      )}
    </div>
    </div>
    </>
  );
}

export default Cart;
