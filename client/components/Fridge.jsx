import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InventoryItem from './InventoryItem.jsx';

function Fridge(fridgeState) {
  const [inventory, setInventory] = useState([]);
  async function fetchData() {
    try {
      //console.log('before ', inventory);
      const response = await fetch('http://localhost:3000/fridge/');
      //console.log('response object ', response);
      // console.log('response ', response.json());
      if (response.ok) {
        //console.log('parsing data block');
        const data = await response.json();
        //console.log('data is:', data);
        setInventory(data);
        //console.log('new inventory ', inventory);
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
  }, []);
  const inventoryElements = [];

  for (let i = 0; i < inventory.length; i++) {
    //console.log('inventory loop is:', inventory[i]);
    inventoryElements.push(<InventoryItem key={i} item={inventory[i]} />);
  }

  return (
    // ERD put this in from APP
    <div id="outerFridgeBox"> 

      <div id="innerFridgeBox">
        <div id="sean">
          <img src="https://i.imgur.com/QQO7r1k.png"  alt="Scott's Face lol"/>
        </div>
        {/* The 'fridgeHandle' div below is strictly for styling this to look like a fridge :) */}
        <div id="fridgeHandle"></div>
        <Link to={'/create'}>
          <button className="fridgeButton" type="button">
            Add Item
          </button>
        </Link>
        {inventoryElements}
      </div>
    </div>
  );
}

export default Fridge;
