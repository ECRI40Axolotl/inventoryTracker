import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InventoryItem from './InventoryItem.jsx';
import { v4 as uuidv4 } from 'uuid';

function Fridge(fridgeState) {
  const [inventory, setInventory] = useState([]);
  async function fetchData() {
    try {
      const response = await fetch('/fridge/');
      if (response.ok) {
        const data = await response.json();
        setInventory(data);
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

  // calculate days from expiration
  const exporationCalculator = (expirationDateStr) => {
    if (!expirationDateStr) return undefined;
    const today = new Date();
    const expirationDate = new Date(expirationDateStr);
    return Math.floor((expirationDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
  };

  const inventoryList = [];

  for (const item of inventory){
    if (item._id){
      inventoryList.push(<InventoryItem key={uuidv4()} item={item} daysLeft={exporationCalculator(item.expiration)}
      />);
    }
  }

  const sortedInventoryList = [...inventoryList].sort((a,b) => a.props.daysLeft - b.props.daysLeft);

  return (
    <div id="innerFridgeBox">
      <div id="sean">
        <img src="https://i.imgur.com/QQO7r1k.png" />
      </div>
      {/* The 'fridgeHandle' div below is strictly for styling this to look like a fridge :) */}
      <div id="fridgeHandle"></div>
      <Link to={'/create'}>
        <button className="fridgeButton" type="button">
          Add Item
        </button>
      </Link>
      {sortedInventoryList}
    </div>
  );
}

export default Fridge;
