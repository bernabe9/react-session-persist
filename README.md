# React Session Persist :key: :floppy_disk:

Keep your session sync with your storage and React components.

[LIVE EXAMPLE](https://bpmup.codesandbox.io)

## Installation
yarn: `yarn add react-session-persist`

npm: `npm install react-session-persist --save`


## Usage

- Wrap your app with the Session component
```javascript
import { render } from 'react-dom';
import Session from 'react-session-persist';

render(
  <Session>
    <App />
  </Session>,
  document.getElementById('app')
);
```
- Use the hook to get and handle the session inside React components
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
- Use the API to handle the session anywhere
```javascript
import { saveSession } from 'react-session-persist';

const loginUser = (user) => {
  const session = await loginRequest(user);
  await saveSession(session);
}
```

## Session
This component wraps the app to keep the internal session state in sync with the storage.

### Props
| Prop  | Default | Description |
| ------------- | -------------- | ------------- |
| storage | cache storage | Custom storage, it allows a simple storage or an async storage |
| initialData | `undefined` | Optional session data. Useful if your storage is async and you want an immediate start of your app or for SSR |


## useSession hook
The hook consumes the session data and methods that the Session component provides through the context.

```javascript
{
  session, // object with session data
  authenticated, // boolean flag to check if the user is authenticated
  user, // optional object with user data
  saveSession, // promise to save the session
  removeSession, // promise to remove the session
  saveUser, // promise to save optional user data
  loadDataFromStorage // get data directly from the storage
} = useSession()
```

## API
### getSession() : object
Returns the current session if exists. Otherwise, it returns `undefined`.

Example:
```javascript
import { getSession } from 'react-session-persist';

const session = await getSession();
```

### saveSession(session: object): Promise
Saves the session in the storage and React state. Also, it updates the authenticated flag to `true`.

### removeSession(): Promise
Removes the session from the stores and React state. Also, it updates the authenticated flag to `false`.

### getUser() : object
Returns the optional user data if exists. Otherwise, it returns `undefined`.

### saveUser(user: object): Promise
Saves optional user data (user's name, email, etc) in the storage and React state. Also, it updates the authenticated flag to `true`.

### getAuthenticated(): boolean
Returns a boolean flag that is `true` if there is a session in the storage.

### loadDataFromStorage(): Promise\<object\>
Gets the data directly from the storage.

## Custom Storage
### Simple Storage
### Async Storage
### React Native Storage

## SSR
