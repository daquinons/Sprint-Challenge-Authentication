import React from 'react';
import Nav from './Nav';
import { Redirect } from 'react-router-dom';
import { getJokes, isLoggedIn } from '../api';

export default () => {
  const [jokes, setJokes] = React.useState([]);
  React.useEffect(() => {
    const fetchUsers = async () => {
      setJokes(await getJokes());
    }
    if (isLoggedIn()) fetchUsers();
  }, []);

  if (isLoggedIn()) {
    return (
      <>
      <Nav />
      <div>
        {jokes.map((joke, index) => {
          return (
            <div key={index}>
              <p>{joke.joke}</p>
              <hr />
            </div>
          );
        })}
      </div>
      </>
    );
  } else {
    return <Redirect to="/signin" />
  }
};
