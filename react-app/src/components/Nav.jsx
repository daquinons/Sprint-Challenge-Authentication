import React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../api';

export default () => {
  return (
    <header className="App-header">
      {isLoggedIn() ? (
        <>
          <li>
            <Link to="/">Jokes</Link>
          </li>
          <li>
            <Link to="/signout">Signout</Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/signup/">Register</Link>
          </li>
          <li>
            <Link to="/signin/">Login</Link>
          </li>
        </>
      )}
    </header>
  );
};
