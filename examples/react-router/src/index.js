import React from 'react';
import ReactDOM from 'react-dom';
import Session from 'react-session-persist';

import App from './App';

ReactDOM.render(
  <Session>
    <App />
  </Session>,
  document.getElementById('root')
);
