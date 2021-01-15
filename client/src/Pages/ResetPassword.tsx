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
  border: '2px solid #ccc',
  borderRadius: '5px',
  marginTop: '5em',
};

interface Data {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const ResetPasswordForm = () => {
  const { register, errors, handleSubmit, watch } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = async ({
    email,
    username,
    password,
    confirmPassword,
    ...props
  }: Data) => {
    setError('');
    setLoading(true);
    const result = await resetPassword(email);
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

        <Button ref={register} color="green" type="submit" disabled={loading}>
          Submit
        </Button>
      </Form>
    </>
  );
};

const ResetPassword: React.FC<undefined> = () => {
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
            <Header as="h1" style={{ marginBottom: '1em' }}>
              <Icon name="question" />
              <Header.Content>Password Reset</Header.Content>
            </Header>
            <ResetPasswordForm />
          </div>
        </div>
        <div style={{ marginTop: '1em', width: '100%', textAlign: 'center' }}>
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
      <Footer as="footer" />
    </div>
  );
};

export default ResetPassword;
