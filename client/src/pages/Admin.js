import React, { useEffect, useState } from "react";
import '../styles/Admin.css';

const AdminPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch items when the component mounts
  useEffect(() => {
    fetch("http://localhost:5001/items")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setLoading(false);
      });
  }, []);

  // Function to update the status of an order
  const updateStatus = (username, id, newStatus) => {
    fetch(`http://localhost:5001/update-status/${username}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((updatedItem) => {
        // Update the items array in state with the new status
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === updatedItem._id ? updatedItem : item
          )
        );
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Order</th>
            <th>Username</th>
            <th>Items</th>
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const username = Object.keys(item).find(
              (key) => key !== "_id" && key !== "order" && key !== "status"
            );

            return (
              <tr key={item._id}>
                <td>{item.order}</td>
                <td>{username}</td>
                <td>
                  {item[username]
                    ? item[username].map((subItem, index) => (
                        <div key={index}>
                          <strong>Item:</strong> {subItem.name} | <strong>Price:</strong> ${subItem.price}
                        </div>
                      ))
                    : "No items"}
                </td>
                <td>
                  <span
                    className={`activ ${item.status === "Active" ? "active-bg" : item.status === "Complete" ? "complete-bg" : item.status === "Cancelled" ? "cancelled-bg" : ""}`}
                  >
                    {item.status || "No status provided"}
                  </span>
                </td>
                <td>
                  {/* Buttons to update the order status */}
                  <button className="active" onClick={() => updateStatus(username, item._id, "Active")}>
                    Set Active
                  </button>
                  <button className="activ" onClick={() => updateStatus(username, item._id, "Complete")}>
                    Done
                  </button>
                  <button className="cancelled" onClick={() => updateStatus(username, item._id, "Cancelled")}>
                    Cancel
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
