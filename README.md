# React Session Persist :key: :floppy_disk:


## Installation
yarn:

`yarn add react-session-persist`

npm:

`npm install react-session-persist --save`


## Usage

- Wrap your app with the Session component
```javascript
import { render } from 'react-dom';
import { sessionReducer } from 'react-session-persist';

render(
  <Session>
    <App />
  </Session>,
  document.getElementById('app')
);
```
- Use the hook to get session data and save the session:
```javascript
import React from 'react';
import { useSession } from 'redux-react-session';

const MyComponent = () => {
  const { authenticated, saveSession } = useSession();
  
  const login = () => {
    saveSession({ token: '123' });
  }
  
  if (authenticated) {
    return <p>User logged in!</p>
  }
  
  return <button onClick={login}>LOG IN</button>
}
```
