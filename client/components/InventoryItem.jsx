import React, { Component, useState, useEffect } from 'react';

function InventoryItem({ item }) {
  const [inStock, setStock] = useState(false);

  const deleteItem = async (idNum) => {
    try {
      const deletedItem = await fetch('/fridge/deleteItem', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify({ id: idNum }),
      });
      console.log(deletedItem);
      return window.location.reload(false);
    } catch (err) {
      console.log('Fridge.useEffect: get items: ERROR:, ', err);
    }
  };

  useEffect(() => {
    if (item._id) {
      setStock(true);
    }
  });

  return (
    <section className="inventoryItem">
      <div className="itemInfo">
        <h2>{item.item_name}</h2>
        {/* Will show information if it exists in inventory */}
        {inStock && (
          <ul className="inventoryTableInfo">
            <li className="itemDetail">Expiration Date: {item.expiration}</li>
            <li className="itemDetail">Bought On: {item.date_bought}</li>
            <li className="itemDetail">Status: {item.status}</li>
          </ul>
        )}
        {/* Will print this if there's no information besides item_name */}
        {!inStock && <h3>You are currently out of this item</h3>}
      </div>
      <div className="itemButtons">
        {/* //TODO: Update button will need to trigger a modal or something that
        will allow you to edit fields before submitting changes */}
        <button className="updateInventory">Update this Item</button>
        <button
          className="deleteInventory"
          onClick={() => {
            //console.log('in click: ', item._id);
            deleteItem(item._id);
          }}
        >
          Delete Item
        </button>
      </div>
    </section>
  );
}

export default InventoryItem;
