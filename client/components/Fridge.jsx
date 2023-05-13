import React, { Component, useState, useEffect } from 'react';
import InventoryItem from './InventoryItem.jsx';

function Fridge(fridgeState) {
  const [inventory, setInventory] = useState([]);
  async function fetchData() {
    try {
      console.log('before ', inventory);
      const response = await fetch('/fridge/');
      console.log('response object ', response);
      // console.log('response ', response.json());
      if (response.ok) {
        console.log('parsing data block');
        const data = await response.json();
        console.log('data is:', data);
        setInventory(data);
        console.log('new inventory ', inventory);
      } else {
        throw new Error('Request failed with status ' + response.status);
      }
    } catch (err) {
      console.log('Fridge.useEffect: get items: ERROR:, ', err);
    }
  }
  useEffect(() => {
    console.log('Im in useEffect');
    fetchData();
  }, [])
    const inventoryElements = [];

    for (let i = 0; i < inventory.length; i++) {
      console.log('inventory loop is:', inventory[i]);
      inventoryElements.push(<InventoryItem key={i} item={inventory[i]}/>);
    }

    
  return (
    <div>
      <button type="button">Add Item</button>
      {inventoryElements}
    </div>
  )
}

export default Fridge;
