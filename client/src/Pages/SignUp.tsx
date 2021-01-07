import React from 'react';
import MainNavbar from './Navbar';
import Footer from './Footer';
import { Header, Icon, Form, Button } from 'semantic-ui-react';

import { useForm } from 'react-hook-form';

import firebase from 'firebase/app';
import firebaseConfig from '../auth/firebaseConfig';
import Cookies from 'js-cookie';

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

const centerflex = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '1 1 auto',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

interface Data {
  email: string;
  username: string;
  password: string;
}

const SignUpForm = () => {
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = ({ email, username, password, ...props }: Data) => {
    // console.log('submit', props, email, username, password);
    // TODO: Post new user to firebase auth DB
    // TODO: Get the id token for the user.
    // TODO: Post id token, username to MY db
    // TODO: Use idTOken to create the cookie!
    // TODO: Upon Successful login, navigate to my habits page

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }: any) => {
        console.log(user);
        return user.getIdToken().then((idToken: string) => {
          return fetch('http://localhost:5000/sessionLogin', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'CSRF-Token': Cookies.get('XSRF-TOKEN'),
            },
            body: JSON.stringify({ idToken }),
          });
        });
      })
      .then(() => {
        return firebase.auth().signOut();
      })
      .then(() => {
        // window.location.assign('/profile');
      })
      .catch((err) => {
        console.log('hi');
        console.error(err);
      });
  };

  /* const isUnique = (username: string) => {
    console.log('Check if username is unique');
    for (let inst in habits) {
      if (habitName === habits[inst].name) {
        return false;
      }
    }
    return true;
  }; */

  return (
    <Form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'left' }}>
      <Form.Field>
        <label>
          Username
          {errors.username && errors.username.type === 'required' && (
            <text style={{ color: 'red' }}>{' *'}</text>
          )}
          {errors.username && errors.username.type === 'maxLength' && (
            <text style={{ color: 'red' }}>{' Username is too long!'}</text>
          )}
          {/* {errors.habitName && errors.habitName.type === 'validate' && (
            <text style={{ color: 'red' }}>
              {' This username has been taken :/'}
            </text>
          )} */}
        </label>
        <input
          ref={register({
            required: true,
            maxLength: 50,
            /* validate: isUnique, */
          })}
          name="username"
          placeholder="Username"
        />
      </Form.Field>

      <Form.Field>
        <label>
          Email
          {errors.email && errors.email.type === 'required' && (
            <text style={{ color: 'red' }}>{'*'}</text>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <text style={{ color: 'red' }}>{'     Invalid Email!'}</text>
          )}
        </label>
        <input
          ref={register({
            required: true,
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          name="email"
          placeholder="Email"
        />
      </Form.Field>

      <Form.Field>
        <label>
          Password
          {errors.password && errors.password.type === 'required' && (
            <text style={{ color: 'red' }}>{'*'}</text>
          )}
        </label>
        <input
          ref={register({
            required: true,
          })}
          name="password"
          type="password"
          placeholder="Password"
        />
      </Form.Field>

      <Button ref={register} color="green" type="submit">
        Submit
      </Button>
    </Form>
  );
};

const SignUp: React.FC<undefined> = () => {
  return (
    <div
      className="App"
      style={{ display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}
    >
      <MainNavbar as="header" page="signup" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          alignItems: 'center',
        }}
      >
        <div style={centerflex}>
          <div>
            <Header as="h1">
              <Icon name="add user" />
              <Header.Content>
                Sign Up
                {/* <Header.Subheader>
                Create a new account to track your habits!
              </Header.Subheader> */}
              </Header.Content>
            </Header>
            <SignUpForm />
          </div>
        </div>
      </div>
      <Footer as="footer" />
    </div>
  );
};

export default SignUp;
