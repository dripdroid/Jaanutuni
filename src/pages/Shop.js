import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import products from '../data/products.json';
import '../styles/Shop.css';

function Shop() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(products);
  }, []);

  return (
    <div className="shop">
      {/* <h1>Shop Our Collection</h1> */}
      <div className="product-grid">
        {items.map(item => (
          <ProductCard key={item.id} product={item} />
         
        ))}
      </div>
    </div>
  );
}

export default Shop;