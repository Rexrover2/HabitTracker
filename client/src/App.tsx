import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './Pages/Main';
import User from './Pages/User';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import './App.css';
import { AuthProvider } from './Context/AuthContext';
import PrivateRoute from './Components/PrivateRoutes';
import ForgotPassword from './Pages/ResetPassword';

function App() {
  return (
    <>
      <AuthProvider>
        <Switch>
          <PrivateRoute path="/dashboard" component={User} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <Route path="*" component={Main} />
          {/* <Route exact path="/" component={Main} /> */}
          {/* <Route  path="*" component={NotFound} /> Write a 404 not found page!*/}
        </Switch>
      </AuthProvider>
    </>
  );
}

export default App;
