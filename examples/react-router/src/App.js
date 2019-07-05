import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useSession } from 'react-session-persist';

import PrivateRoute from './PrivateRoute'
import Home from './Home'
import Login from './Login'

function App() {
  const { authenticated } = useSession();

  return (
    <Router>
      <PrivateRoute
        path='/'
        exact
        component={Home}
        authenticated={authenticated}
      />
      <Route
        path='/login'
        exact
        component={Login}
      />
    </Router>
  );
}

export default App;
