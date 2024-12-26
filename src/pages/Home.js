import React from 'react';
import '../styles/Home.css';
import Carousel from '../components/Carousel';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <Carousel/>
      <h1>Welcome to Jaanu Tuni Website</h1>
      <p>At Jaanu Tuni, we believe in celebrating individuality and self-expression. Our "make-your-own" 
        platform lets you design your world, your way. Choose from a variety of unique designs or bring your own ideas to life, and 
        we’ll print them on clothing, accessories, mugs, and more. Whether it’s a gift, a statement piece, 
        or something truly personal, Jaanu Tuni is here to help you stand out and make every item uniquely yours. Start creating today 
        and let your imagination shine!</p>
        <Link to="/shop" className="shop-now-button">Shop Now</Link> {/* Link to shop page */}
    </div>
  );
}

export default Home;