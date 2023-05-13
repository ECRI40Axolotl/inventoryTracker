import React, { Component, useState, useEffect } from 'react';
import InventoryItem from './InventoryItem.jsx';

// function Fridge(props) {
  // const [inventory, setInventory] = useState([]);
    // useEffect(() => {
    //   fetch('/fridge')
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log('before ', inventory);
    //         // console.log('data is ', data);
    //         setInventory(data); // [{}]
    //     })
    //     .then(console.log('after ', inventory))
    //     .catch(err => {
    //         console.log('Fridge.useEffect: get items: ERROR:, ', err);
    //     })
    // }, [])

function Fridge() {
  const [inventory, setInventory] = useState([]);
  useEffect(async () => {
    try {
      console.log('before ', inventory);
      const response = await fetch('/fridge');
      const data = await response.json();
      await setInventory(data);
      console.log('after ', inventory);
    } catch (err) {
      console.log('Fridge.useEffect: get items: ERROR:, ', err);
    }
  }, [])

    // const inventoryElements = inventory.map((item, i) => {
    //   // console.log('this is item.number', item.number);
    //   <div id="item" key={i}>
    //     <h1>{item.number}</h1>
    //     <InventoryItem key={i} item={item}/>
    //   </div>
    // })
    
  return (
    <>
      {/* {console.log(inventoryElements)} */}
      {/* <div>
        <h1>{inventory}</h1>
      </div> */}
      {/* <div>
      {inventory.map((item, i) => (
          <div key={i} id="item">
            <h1>{item.number}</h1>
            <InventoryItem key={i} item={item} />
          </div>
        ))}
      </div> */}
    </>
  )
}

export default Fridge;
