import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InventoryItem from './InventoryItem.jsx';

function SignIn () {
    
const login = () => {
     fetch('/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({username: username, password:password}),
    })
      .then((resp) => resp.json())
      .catch((err) =>
        console.log('CreateVegetable fetch /create: ERROR: ', err)
      );
}

    return (
<div>
  <form onClick={login}>
    <input name="username" type="text" placeholder="username"></input>
    <input name="password" type="password" placeholder="password"></input>
    <input type='submit' value="login"></input>
  </form>
</div>
)
}

export default signIn;