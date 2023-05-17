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

    </div>
  );
}

export default WelcomePage;