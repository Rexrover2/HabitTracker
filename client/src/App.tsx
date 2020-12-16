import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './Pages/Main';

import logo from './logo.svg';
import './App.css';
/* 
const Main = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to the main page!</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}; */

const User = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to the User page!</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

function App() {
  return (
    <>
      <Switch>
        <Route path="/u/:userId" component={User} />
        <Route path="*" component={Main} />
      </Switch>
    </>
  );
}

export default App;
