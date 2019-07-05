import React from 'react';
import { useSession } from 'react-session-persist';

const Home = () => {
  const { session, user, removeSession } = useSession();

  return (
    <div>
      <h2>HOMEPAGE</h2>
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
  )
}

export default Home;
