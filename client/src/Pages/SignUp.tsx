import React, { useRef, useState } from 'react';
import MainNavbar from './Navbar';
import Footer from './Footer';
import { Header, Icon, Form, Button } from 'semantic-ui-react';

import { useForm } from 'react-hook-form';

import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';

const centerflex = {
  maxWidth: '300px',
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
  // eslint-disable-next-line
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const password = useRef({});
  password.current = watch('password', '');

  const noWhiteSpace = (value: string) => {
    // True if it has white spaces
    if (/\s/.test(value)) {
      return false;
    }

    return true;
  };

  const onSubmit = async ({
    email,
    username,
    password,
    confirmPassword,
    ...props
  }: Data) => {
    setError('');
    setLoading(true);
    const result = await signup(username, email, password);
    setError(result);
    setLoading(false);
  };

  return (
    <>
      {error && (
        <text style={{ color: 'red', marginBottom: '1em' }}>{error}</text>
      )}
      <Form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'left' }}>
        <Form.Field>
          <label>
            Username
            {errors.username && errors.username.type === 'required' && (
              <text style={{ color: 'red' }}>{' *'}</text>
            )}
          </label>
          <input
            ref={register({
              required: true,
              maxLength: 50,
              validate: noWhiteSpace,
            })}
            name="username"
            placeholder="Username"
          />
          {errors.username && errors.username.type === 'validate' && (
            <text style={{ color: 'red' }}>
              {' Omit white spaces from your username.'}
            </text>
          )}
          {errors.username && errors.username.type === 'maxLength' && (
            <text style={{ color: 'red' }}>{' Username is too long!'}</text>
          )}
        </Form.Field>

        <Form.Field>
          <label>
            Email
            {errors.email && errors.email.type === 'required' && (
              <text style={{ color: 'red' }}>{'*'}</text>
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

          {errors.email && errors.email.type === 'pattern' && (
            <text style={{ color: 'red' }}>{'     Invalid Email!'}</text>
          )}
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
              minLength: {
                value: 8,
                message: 'Enter at least 8 characters',
              },
            })}
            name="password"
            type="password"
            placeholder="Password"
          />

          {errors.password && errors.password.type === 'minLength' && (
            <text style={{ color: 'red' }}>{errors.password.message}</text>
          )}
        </Form.Field>

        <Form.Field>
          <label>
            Retype Your Password
            {errors.confirmPassword &&
              errors.confirmPassword.type === 'required' && (
                <text style={{ color: 'red' }}>{'*'}</text>
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

          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <text style={{ color: 'red' }}>
                {errors.confirmPassword.message}
              </text>
            )}
        </Form.Field>

        <Button ref={register} color="green" type="submit" disabled={loading}>
          Submit
        </Button>
      </Form>
    </>
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
          justifyContent: 'center',
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
        <div style={{ marginTop: '1em', width: '100%', textAlign: 'center' }}>
          Have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
      <Footer as="footer" />
    </div>
  );
};

export default SignUp;
