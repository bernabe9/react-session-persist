import React from 'react';
import ReactDOM from 'react-dom';
import Session from 'react-session-persist';
// import async storage
import localforage from 'localforage'

import App from './App';

ReactDOM.render(
  <Session storage={localforage}>
    <App />
  </Session>,
  document.getElementById('root')
);
