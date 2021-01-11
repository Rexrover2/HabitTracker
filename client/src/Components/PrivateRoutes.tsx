import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

interface Props {
  component: React.FC<any>;
  path: string;
}

export default function PrivateRoute({ component: Component, path }: Props) {
  const { currentUser } = useAuth();

  return (
    <Route
      path={path}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
