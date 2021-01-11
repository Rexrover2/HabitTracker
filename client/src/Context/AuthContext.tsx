import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../auth/firebaseConfig';
import FirebaseLib from 'firebase';

interface Context {
  currentUser: FirebaseLib.User | null;
  login: (
    email: string,
    password: string
  ) => Promise<FirebaseLib.auth.UserCredential>;
  signup: (
    username: string,
    email: string,
    password: string
  ) => Promise<FirebaseLib.auth.UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
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
    return (
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }: any) => {
          console.log(user);
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
        /* .then(() => {
        return firebase.auth().signOut();
      }) */
        .catch((err) => {
          console.error(err);
        })
    );
  }

  function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email: string) {
    return auth.sendPasswordResetEmail(email);
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
      setCurrentUser(user);
      // TODO: Do i navigate to new page here?
      if (user !== null) {
        window.location.assign('/u/law');
      }
      setLoading(false);
      return user;
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
