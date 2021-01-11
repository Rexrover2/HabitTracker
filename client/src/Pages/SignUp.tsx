import React, { useRef, useState } from 'react';
import MainNavbar from './Navbar';
import Footer from './Footer';
import { Header, Icon, Form, Button } from 'semantic-ui-react';

import { useForm } from 'react-hook-form';

import { useAuth } from '../Context/AuthContext';

const centerflex = {
  maxWidth: '400px',
  padding: '1.2em',
  width: '100%',
  border: '1.2px solid #ccc',
  borderRadius: '5px',
  marginTop: '5em',
};

interface Data {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
  const { register, errors, handleSubmit, watch } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const password = useRef({});
  password.current = watch('password', '');

  function onSubmit({
    email,
    username,
    password,
    confirmPassword,
    ...props
  }: Data) {
    // TODO: Post new user to firebase auth DB
    // TODO: Get the id token for the user.
    // TODO: Post id token, username to MY db
    // TODO: Use idTOken to create the cookie!
    // TODO: Upon Successful login, navigate to my habits page
    try {
      setError('');
      setLoading(true);
      signup(username, email, password);
      // TODO: Whats this history
      // history.push('/');
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  }

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
            // validate: isUnique,
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
          {errors.password && errors.password.type === 'minLength' && (
            <text style={{ color: 'red' }}>{errors.password.message}</text>
          )}
        </label>
        <input
          ref={register({
            required: true,
            minLength: {
              value: 8,
              message: 'Password must have at least 8 characters',
            },
          })}
          name="password"
          type="password"
          placeholder="Password"
        />
      </Form.Field>

      <Form.Field>
        <label>
          Retype Your Password
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'required' && (
              <text style={{ color: 'red' }}>{'*'}</text>
            )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <text style={{ color: 'red' }}>
                {errors.confirmPassword.message}
              </text>
            )}
        </label>
        <input
          ref={register({
            required: true,
            validate: (value) =>
              value === password.current || 'The passwords do not match',
          })}
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
        />
      </Form.Field>

      <Button ref={register} color="green" type="submit" disabled={loading}>
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
          <div style={{ width: '100%' }}>
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
