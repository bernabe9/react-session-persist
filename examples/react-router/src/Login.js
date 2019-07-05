import React from 'react';
import { useSession } from 'react-session-persist';

const Login = ({ history }) => {
  const { saveSession, saveUser } = useSession();

  const login = async () => {
    // save session data
    await saveSession({ token: '123' });
    // save user info
    await saveUser({ username: 'Jonh', email: 'jonh@example.com' });
    history.push('/');
  };

  return (
    <div>
      <h2>LOGIN PAGE</h2>
      <button onClick={login}>LOG IN</button>
    </div>
  )
}

export default Login;
