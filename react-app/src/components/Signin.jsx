import React from 'react';
import Nav from './Nav';
import { Redirect } from 'react-router-dom';
import { login, isLoggedIn } from '../api';

export default () => {
  const [loggedIn, setLoggedIn] = React.useState(isLoggedIn());
  const refUsername = React.useRef();
  const refPassword = React.useRef();

  const onLogIn = async () => {
    const username = refUsername.current.value;
    const password = refPassword.current.value;
    setLoggedIn(await login(username, password));
  };

  if (!loggedIn) {
    return (
      <>
        <Nav />
        <div>
          <h1>Sign in</h1>
          <input ref={refUsername} placeholder="username" />
          <input ref={refPassword} placeholder="password" type="password" />
          <button onClick={onLogIn}>Log in</button>
        </div>
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
};
