import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './Pages/Main';
import User from './Pages/User';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import './App.css';

function App() {
  return (
    <>
      <Switch>
        <Route path="/u/:userId" component={User} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="*" component={Main} />
      </Switch>
    </>
  );
}

export default App;
