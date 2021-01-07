import React from 'react';
import MainNavbar from './Navbar';
import Footer from './Footer';
import { Button, Form, Header, Icon } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
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
// firebase.analytics();

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
  // username: string;
  password: string;
}

const LoginForm = () => {
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = ({ email, password, ...props }: Data) => {
    // console.log('submit', props, email, password);
    // TODO: Upon Successful login, navigate to my habits page

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }: any) => {
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
        window.location.assign('/login');
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'left' }}>
      {/* <Form.Field>
        <label>
          Username
          {errors.username && errors.username.type === 'required' && (
            <text style={{ color: 'red' }}>{' *'}</text>
          )}
          {errors.username && errors.username.type === 'maxLength' && (
            <text style={{ color: 'red' }}>{' Username is too long!'}</text>
          )}
        </label>
        <input
          ref={register({
            required: true,
            maxLength: 50,
          })}
          name="username"
          placeholder="Username"
        />
      </Form.Field> */}

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

const Login: React.FC<undefined> = () => {
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
              <Icon name="sign-in" />
              <Header.Content>Welcome Back</Header.Content>
            </Header>
            <LoginForm />
          </div>
        </div>
      </div>
      <Footer as="footer" />
    </div>
  );
};

export default Login;
