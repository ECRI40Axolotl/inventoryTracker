import React from 'react';
import LogoHeader from '../components/LogoHeader';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();
  return (
    <div className='welcomePage'>
      <Link className='welcomeLogIn' to='/login'>
        Log In
      </Link>{' '}
      &nbsp;
      <Link className='welcomeSignUp' to='/register'>
        Sign Up
      </Link>
      <textbox
        onClick={() => navigate('/login')}
        className='fridge-icon-container'>
        <img
          id='fridge-icon'
          src='https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/79314/kitchen-clipart-xl.png'
          alt='fridge art'
        />
      </textbox>
    </div>
  );
}

export default WelcomePage;
