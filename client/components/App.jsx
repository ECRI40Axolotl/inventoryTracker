import React, { Component } from 'react';

import { Routes, Route, HashRouter, BrowserRouter } from 'react-router-dom';
//import './stylesheets/styles.css';
import Fridge from './Fridge.jsx';
import CreateItem from './CreateItem.jsx';
import WelcomePage from '../pages/WelcomePage.jsx';

function App() {
  const fridgeState = true;
  return (

    // <div id="outerFridgeBox">
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route
        className="fridge"
      
        path="/fridge"
        element={<Fridge fridgeState={fridgeState} />}
      />
      <Route  path="/create" element={<CreateItem />} />
    </Routes>
    // </div>

  );
}

export default App;
