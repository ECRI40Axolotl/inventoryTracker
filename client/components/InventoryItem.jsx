import React, { Component, useState, useEffect } from 'react';

function InventoryItem() {
  const [inventoryInfo, setRender] = useState();

  const deleteItem = async (idNum) => {
    try {
      const deletedItem = await fetch('/fridge/deleteItem', {
        method: DELETE,
      });
    } catch (err) {
      console.log('Fridge.useEffect: get items: ERROR:, ', err);
    }
  };

  return (
    <section className='inventoryItem'>
      <div className='itemInfo'>
        //confirm props brought into item
        <h2>{this.props.info.item_name}</h2>
        //need to put information here for inventory
        <ul className='inventoryTableInfo'>
          <li className='itemDetail'>
            Expiration Date: {this.props.info.expire}
          </li>
          <li className='itemDetail'>
            Bought On: {this.props.info.date_bought}
          </li>
          <li className='itemDetail'>Status: {this.props.info.status}</li>
        </ul>
        //if there's no information
        <h3>You are currently out of this item</h3>
      </div>
      <div className='itemButtons'>
        //Update button will need to trigger a modal or something that will
        allow you to edit fields before submitting changes
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
