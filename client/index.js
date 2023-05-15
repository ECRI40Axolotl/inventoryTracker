import React from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App.jsx';
import styles from './stylesheets/styles.css';

// render(<App />, document.getElementById('root'));
createRoot(document.getElementById('app')).render(<App />);
