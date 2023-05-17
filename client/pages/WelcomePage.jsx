import React from 'react';
import LogoHeader from '../components/LogoHeader';
import { Link } from 'react-router-dom';

function WelcomePage() {
  return(
    <div className="welcomePage">
      <LogoHeader/>

      <Link className="welcomeLogIn" to="/loginPage">
          Log In
      </Link> &nbsp;

      <Link className="welcomeSignUp" to="/signupPage">
          Sign Up
      </Link>

      <div className='fridge-icon-container'>
        <img id="fridge-icon" src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/79314/kitchen-clipart-xl.png" alt="fridge art"/>
      </div>

    </div>
  );
}

export default WelcomePage;