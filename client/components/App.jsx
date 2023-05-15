import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
// import { Route } from 'react-router-dom';
//import './stylesheets/styles.css';
import Fridge from './Fridge.jsx';
import CreateItem from './CreateItem.jsx';
import SignIn from './signIn.jsx';


function App() {
    const fridgeState = true
    return (
      <div>
        <BrowserRouter>
        <Routes>
          <Route exact path='/' element = {<SignIn/>}></Route>
          <Route className='fridge' exact path= '/index' element  = {<Fridge fridgeState={fridgeState}/>}>
          </Route>
          <Route exact path='/create' element={<CreateItem />}>
          </Route>
        </Routes>
      </BrowserRouter>
      </div>
    )

}

export default App;