import React, { Component, useState, useEffect } from 'react';

function InventoryItem({item}) {
  const [inventoryInfo, setRender] = useState();

  const deleteItem = async (idNum) => {
    try {
      const deletedItem = await fetch('/fridge/deleteItem', {
        method: DELETE,
        body: {id: idNum}
      });
      console.log(deletedItem)
    } catch (err) {
      console.log('Fridge.useEffect: get items: ERROR:, ', err);
    }
  };

  return (
    <section className='inventoryItem'>
      <div className='itemInfo'>
        //TODO: Confirm how state will be passed in
        <h2>{item.item_name}</h2>
        //TODO: need to put information here if it exists in inventory
        <ul className='inventoryTableInfo'>
          <li className='itemDetail'>
            Expiration Date: {item.expiration}
          </li>
          <li className='itemDetail'>
            Bought On: {item.date_bought}
          </li>
          <li className='itemDetail'>Status: {item.status}</li>
        </ul>
        //TODO: print this if there's no information
        <h3>You are currently out of this item</h3>
      </div>
      <div className='itemButtons'>
        //TODO: Update button will need to trigger a modal or something that will allow you to edit fields before submitting changes
        <button className='updateInventory'>Update this Item</button>
        <button
          className='deleteInventory'
          onClick={() => {
            deleteItem(this.props.info._id);
            return window.location.reload(false);
          }}
        ></button>
      </div>
    </section>
  );
}
