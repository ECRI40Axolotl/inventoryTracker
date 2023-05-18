import React from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App.jsx';
import './stylesheets/App.scss';
import './stylesheets/_styles.scss';

// render(<App />, document.getElementById('root'));
// createRoot(document.getElementById('app')).render(<App />);

const domNode = document.getElementById('app');
const root = createRoot(domNode);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);