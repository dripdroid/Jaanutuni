import React, { useEffect, useState } from 'react';
import '../styles/Home.css';

function Profile() {
  const usernamet = localStorage.getItem('username'); // Get username from localStorage
  const [items, setItems] = useState([]); // State to store user items
  let jj =[];

  useEffect(() => {
    if (usernamet) {
      
      fetch(`http://localhost:5001/items`)  // Hardcoded to fetch items for 'tasneem'
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          return response.json();
        })
        .then((data) => {
          console.log(data); // Inspect the fetched data
          if (data.error) {
            console.error(data.error);
          } else {
            console.log(data);
            setItems(data || []); // Update state with user items
            console.log(items.length)
          }
        })
        .catch((error) => console.error('Error fetching items:', error));
    }
  }, [usernamet]);
  

  return (
    <div>
      <h1>{usernamet}'s Profile</h1>
      <div>
      {items.length > 0 ? (
  items.map((item, index) => (
    // Only render if the property specified by the usernamet variable is an array and has values
    Array.isArray(item[usernamet]) && item[usernamet].length > 0 ? (
      <div key={index} className="item">
        <h3>{item.order}</h3>
        {item[usernamet].map((g, subIndex) => (
          <div key={subIndex} className="item">
            <p>{g.name}</p>
            <p>Price: ${g.price}</p>
          </div>
        ))}
      </div>
    ) : null // Render nothing if item[usernamet] is empty or not an array
  ))
) : (
  <p>No items found for this user.</p>
)}

      </div>
    </div>
  );
}

export default Profile;
