import React from 'react';
import { Redirect } from 'react-router-dom';
import Nav from './Nav';
import { register } from '../api';

export default () => {
  const [registered, setRegistered] = React.useState(false);
  const refUsername = React.useRef();
  const refPassword = React.useRef();

  const onRegister = async () => {
    const username = refUsername.current.value;
    const password = refPassword.current.value;
    setRegistered(await register(username, password));
  };

  if (registered) return <Redirect to="/signin" />
  return (
    <>
      <Nav />
      <div>
        <h1>Signup</h1>
        <input ref={refUsername} placeholder="username" />
        <input ref={refPassword} placeholder="password" type="password" />
        <button onClick={onRegister}>Register</button>
      </div>
    </>
  );
};
