import React, { useState } from 'react';
import MainNavbar from './Navbar';
import Footer from './Footer';
import { Button, Form, Header, Icon } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../Context/AuthContext';

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
  const { login } = useAuth();
  // eslint-disable-next-line
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ email, password, ...props }: Data) => {
    // TODO: Upon Successful login, navigate to my habits page
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      window.location.assign('/dashboard');
    } catch {
      setError('Failed to log in');
    }

    setLoading(false);
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

      <Button ref={register} color="green" type="submit" disabled={loading}>
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
