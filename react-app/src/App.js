import React from 'react';
import { Route } from 'react-router-dom';
import Index from './components/Index';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Signout from './components/Signout';
import './App.css';

function App() {
  return (
    <div className="App">


      <Route path="/" exact component={Index} />
      <Route path="/signout" component={Signout} />
      <Route path="/signup/" component={Signup} />
      <Route path="/signin/" component={Signin} />
    </div>
  );
}

export default App;
