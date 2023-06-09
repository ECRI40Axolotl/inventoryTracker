import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
// import { Route } from 'react-router-dom';
//import './stylesheets/styles.css';
import Fridge from './Fridge.jsx';
import CreateItem from './CreateItem.jsx';

function App() {
  const fridgeState = true;
  return (
    <div id="outerFridgeBox">
      <BrowserRouter>
        <Routes>
          <Route
            className="fridge"
            exact
            path="/"
            element={<Fridge fridgeState={fridgeState} />}
          ></Route>
          <Route exact path="/create" element={<CreateItem />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
