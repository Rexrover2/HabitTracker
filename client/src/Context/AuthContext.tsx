import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../auth/firebaseConfig';
import FirebaseLib from 'firebase';

interface Context {
  currentUser: FirebaseLib.User | null;
  login: (email: string, password: string) => Promise<string>;
  signup: (
    username: string,
    email: string,
    password: string
  ) => Promise<string>;
  logout: () => Promise<string>;
  resetPassword: (email: string) => Promise<string>;
  updateEmail: (email: string) => Promise<void> | null;
  updatePassword: (password: string) => Promise<void> | null;
}
const AuthContext = React.createContext<Context | null>(
  null
) as React.Context<Context>;

export function useAuth() {
  return useContext(AuthContext);
}

interface Props {
  children?: React.ReactChild;
}

export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<FirebaseLib.User | null>(null);
  const [loading, setLoading] = useState(true);

  function signup(username: string, email: string, password: string) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }: any) => {
        return user.getIdToken().then((idToken: string) => {
          return fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + idToken,
            },
            body: JSON.stringify({ username: username }),
          });
        });
      })
      .then(() => {
        window.location.assign('/dashboard');
        return '';
      })
      .catch((err) => {
        return err.message;
      });
  }

  function login(email: string, password: string) {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(() => window.location.assign('/dashboard'))
      .catch((err) => {
        return err.code === 'auth/user-not-found'
          ? 'Invalid email or password'
          : err.message;
      });
  }

  function logout() {
    return auth.signOut().catch((err) => {
      console.error(err.message);
      return err.message;
    });
  }

  function resetPassword(email: string) {
    return auth
      .sendPasswordResetEmail(email)
      .then(() => window.location.assign('/login'))
      .catch((err) => {
        console.error(err.message);
        return err.code === 'auth/user-not-found'
          ? 'No such registered user with the provided email was found.'
          : err.message;
      });
  }

  function updateEmail(email: string) {
    if (currentUser !== null) {
      return currentUser.updateEmail(email);
    } else {
      console.log('Update Email: current user is null');
      return null;
    }
  }

  function updatePassword(password: string) {
    if (currentUser !== null) {
      return currentUser.updatePassword(password);
    } else {
      console.log('Update Password: current user is null');
      return null;
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('user set');
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: Context = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
