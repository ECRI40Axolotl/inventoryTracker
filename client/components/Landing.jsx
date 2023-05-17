import React, { useState } from 'react';
import Register from './Register.jsx';
import Login from './Login.jsx';

// May delete after welcome page finishes
// If delete, move currentForm state to welcome page

function Landing() {
  const [currentForm, setcurrentForm] = useState('login');

  const switchForm = (formName) => {
    setcurrentForm(formName);
  };

  return (
    <div className='landing-page' >
      {currentForm === 'login' ? <Login switchForm={switchForm} /> : <Register switchForm={switchForm}/>}
    </div>
  );
}

export default Landing;
