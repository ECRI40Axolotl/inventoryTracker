import React, { Component } from 'react';
import { Routes, Route, HashRouter, BrowserRouter } from 'react-router-dom';
//import './stylesheets/styles.css';

import Fridge from './Fridge.jsx';
import CreateItem from './CreateItem.jsx';
import WelcomePage from '../pages/WelcomePage.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import LogoHeader from '../components/LogoHeader';


function App() {
  const fridgeState = true;
  return (
    <div>
      {/* <div id="outerFridgeBox"> */}
      <LogoHeader />
      <Routes>
        <Route exact path="/" element={<WelcomePage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />}/>
        
        <Route
          className="fridge"
          path="/main"
          element={<Fridge fridgeState={fridgeState} />}
        />
        
        <Route  path="/create" element={<CreateItem />} />
      </Routes>
    </div>
    // </div>

  );
}

export default App;
