import React, { Component, useState, useEffect } from 'react';
import InventoryItem from './InventoryItem.jsx';

function Fridge(props) {
  const [item, setItem] = useState('');
    useEffect(() => {
      fetch('/fridge')
        .then(res => res.json())
        .then(data => {
            setItem(data);
        })
        .catch(err => {
            console.log('Fridge.useEffect: get items: ERROR:, ', err);
        })
    })


  return (
    <div>
      <InventoryItem />
    </div>
  )
}