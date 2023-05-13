import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
//import './stylesheets/styles.css';
import Fridge from './Fridge.jsx';
//import CreateItem from './CreateItem.jsx';

function App() {
    const fridgeState = true
    return (
      // <div className='fridge'>
      <Fridge fridgeState={fridgeState}/>
      // </div>
    )

}

export default App;