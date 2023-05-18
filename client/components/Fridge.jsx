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

  // create helper func to convert date to comparable num
  // e.g. '11/31/1969' => 19691131
  const convertDateFormat = (dateStr) => {
    if (!dateStr) return undefined;
    const dateArr = dateStr.split('/');
    const [month, day, year] = dateArr;
    return [year, month, day].join('');
  };

  // calculate days from expiration
  const exporationCalculator = (expirationDateStr) => {
    if (!expirationDateStr) return undefined;
    const today = new Date();
    const expirationDate = new Date(expirationDateStr);
    return Math.floor((expirationDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
  };

  const inventoryElements = [];

  for (const item of inventory){
    inventoryElements.push(<InventoryItem key={uuidv4()} item={item} daysLeft={exporationCalculator(item.expiration)}/>);
  }

  inventoryElements.slice().sort((a,b) => convertDateFormat(a.props.expiration) - convertDateFormat(b.props.expiration));

  return (
    <div id="innerFridgeBox">
      <div id="sean">
        <img src="https://i.imgur.com/QQO7r1k.png" alt="Seam"/>
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
  );
}

export default Fridge;
