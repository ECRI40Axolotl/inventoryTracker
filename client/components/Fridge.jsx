import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InventoryItem from './InventoryItem.jsx';
import { v4 as uuidv4 } from 'uuid';

function Fridge(fridgeState) {
  const [inventory, setInventory] = useState([]);
  async function fetchData() {
    try {
      //console.log('before ', inventory);
      const response = await fetch('/fridge/');
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
    return (today.getTime() - expirationDate.getTime()) / (1000 * 3600 * 24);
  };

  // const inventoryElements = [];

  // for (const item of inventory) {
  //   inventoryElements.push(<InventoryItem key={0} item={item} />);
  //   inventoryElements.sort((a,b) => convertDateFormat(a.expiration) - convertDateFormat(b.expiration));
  // }

  const inventoryElements = inventory.map(item => {
    <InventoryItem key={uuidv4()} item={item} daysLeft={exporationCalculator(item.expiration)} />;
  });

  inventoryElements.sort((a,b) => convertDateFormat(a.expiration) - convertDateFormat(b.expiration));

  return (

    <div id='innerFridgeBox'>
      <div id='sean'>
        <img src='https://i.imgur.com/QQO7r1k.png' alt='Sean'/>
      </div>
      {/* The 'fridgeHandle' div below is strictly for styling this to look like a fridge :) */}
      <div id='fridgeHandle'></div>
      <Link to={'/create'}>
        <button className='fridgeButton' type='button'>
          Add Item
        </button>
      </Link>
      {inventoryElements}
    </div>
  );
}

export default Fridge;
