import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../auth/firebaseConfig';
import FirebaseLib from 'firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serverURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://us-central1-habit-tracker-a92f9.cloudfunctions.net/app';

interface Context {
  currentUser: FirebaseLib.User | null;
  login: (email: string, password: string) => Promise<string>;
  signup: (
    username: string,
    email: string,
    password: string
  ) => Promise<string>;
  logout: () => Promise<string>;
  deleteUser: () => Promise<string>;
  resetPassword: (email: string) => Promise<string>;
  updateEmail: (email: string) => Promise<string>;
  updatePassword: (password: string) => Promise<string>;
}
const AuthContext = React.createContext<Context | null>(
  null
) as React.Context<Context>;

export const useAuth = () => {
  return useContext(AuthContext);
};

interface Props {
  children?: React.ReactChild;
}

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<FirebaseLib.User | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (username: string, email: string, password: string) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }: any) => {
        return user.getIdToken().then((idToken: string) => {
          return fetch(serverURL + '/signup', {
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
  };

  const login = async (email: string, password: string) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(() => window.location.assign('/dashboard'))
      .catch((err) => {
        console.log(err.code);
        return err.code === 'auth/user-not-found' ||
          err.code === 'auth/wrong-password'
          ? 'Invalid email or password'
          : err.message;
      });
  };

  const logout = async () => {
    return auth.signOut().catch((err) => {
      console.error(err.message);
      return err.message;
    });
  };

  const deleteUser = async () => {
    const deleteUserData = async () => {
      if (currentUser !== null) {
        currentUser.getIdToken().then((idToken: string) => {
          fetch(serverURL + '/api/user', {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + idToken,
            },
          });
        });
      } else {
        return Promise.reject('Update Email: current user is null');
      }
    };

    await deleteUserData();

    if (currentUser !== null) {
      return currentUser
        .delete()
        .then(() => {
          toast.success(
            "Your account was deleted, we're sad to see you go :(",
            {
              autoClose: 2500,
              position: 'top-center',
            }
          );
          return '';
        })
        .catch((e) => {
          return e.message;
        });
    } else {
      return Promise.reject('Update Email: current user is null');
    }
  };

  const resetPassword = async (email: string) => {
    return auth
      .sendPasswordResetEmail(email)
      .then(() => {
        toast.success('A reset password link was sent to your email <3 !', {
          autoClose: 5000,
          position: 'top-center',
        });
        return '';
      })
      .catch((err) => {
        console.error(err);
        return err.code === 'auth/user-not-found'
          ? 'No such registered user with the provided email was found.'
          : err.message;
      });
  };

  const updateEmail = async (email: string) => {
    if (currentUser !== null) {
      return currentUser
        .updateEmail(email)
        .then(() => {
          toast.success('Your email was successfully updated!', {
            autoClose: 2500,
            position: 'top-center',
          });
          return '';
        })
        .catch((e) => {
          return e.code === 'auth/requires-recent-login'
            ? 'Please log out and log in again, your creditials are too old.'
            : e.message;
        });
    } else {
      return Promise.reject('Update Email: current user is null');
    }
  };

  const updatePassword = async (password: string) => {
    if (currentUser !== null) {
      return currentUser
        .updatePassword(password)
        .then(() => {
          toast.success('Your password was successfully updated!', {
            autoClose: 2500,
            position: 'top-center',
          });
        })
        .catch((e) => {
          return e.code === 'auth/requires-recent-login'
            ? 'Please log out and log in again, your creditials are too old.'
            : e.message;
        });
    } else {
      return Promise.reject('Update Password: current user is null');
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // console.log('user set');
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
    deleteUser,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      <ToastContainer />
      {!loading && children}
    </AuthContext.Provider>
  );
};
