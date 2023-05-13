import React, { Component, useState, useEffect } from 'react';
import InventoryItem from './InventoryItem.jsx';

function Fridge(props) {
  const [item, setItem] = useState('');
    function componentDidMount() {
      fetch('/fridge')
        .then(res => res.json())
        .then(data => {
            setItem(data);
        })
        .catch(err => {
            console.log('Fridge.componentDidMount: get items: ERROR:, ', err);
        })
    }


    //useEffect
    async function compon {
        try {
          const data = await fetch('/fridge');
          await setItem(data.json());
        } catch (err) {
          console.log('Fridge.componentDidMount: get items: ERROR:, ', err);
        }
    }

  return (
    
  )
}