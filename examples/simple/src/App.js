import React from 'react';
import { useSession, saveUser } from 'react-session-persist';

function App() {
  const {
    authenticated,
    session,
    user,
    saveSession,
    removeSession
  } = useSession();

  const login = async () => {
    // save session data
    await saveSession({ token: "123" });
    // save user info
    await saveUser({ username: "Jonh", email: "jonh@example.com" });
  };

  return (
    <div className="App">
      <h2>REACT SESSION PERSIST</h2>
      {authenticated && (
        <div>
          <p>USER LOGGED IN</p>
          <div>
            <span>Session data: </span>
            <span>{JSON.stringify(session)}</span>
          </div>
          <div>
            <span>User data: </span>
            <span>{JSON.stringify(user)}</span>
          </div>
          <div>
            <p>
              Data is persisted in the storage. It won't be deleted if you
              refresh the page.
            </p>
            <button onClick={() => window.location.reload()}>
              REFRESH PAGE
            </button>
          </div>
          <div>
            <p>Click logout to remove session</p>
            <button onClick={removeSession}>LOG OUT</button>
          </div>
        </div>
      )}
      {!authenticated && <button onClick={login}>LOG IN</button>}
    </div>
  );
}

export default App;
