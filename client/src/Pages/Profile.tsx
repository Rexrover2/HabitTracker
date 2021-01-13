import React, { useEffect, useRef, useState } from 'react';
import MainNavbar from './Navbar';
import Footer from './Footer';
import { Header, Icon, Form, Button, Loader, List } from 'semantic-ui-react';

import { useForm } from 'react-hook-form';

import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import { getUsername } from '../middleware/api';

const centerflex = {
  maxWidth: '300px',
  padding: '1.2em',
  width: '100%',
  border: '1.2px solid #ccc',
  borderRadius: '5px',
};

interface Props {
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Data {
  email: string;
  password: string;
  confirmPassword: string;
}

const ProfileForm = ({ setEditing }: Props) => {
  const { register, errors, handleSubmit, watch } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { updateEmail, updatePassword } = useAuth();

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = async ({ email, password }: Data) => {
    console.log('submit');
    setError('');
    let emailBool = true;
    let passwordBool = true;
    let result = '';

    if (email.length) {
      console.log('email');
      passwordBool = false;
      result = await updateEmail(email);
    }
    if (password.length) {
      console.log('password');
      result = await updatePassword(password);
    }
    setError(result);
    if (passwordBool && emailBool) {
      setEditing(false);
    }
  };

  return (
    <>
      {error && (
        <text style={{ color: 'red', marginBottom: '1em' }}>{error}</text>
      )}
      <Form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'left' }}>
        <Form.Field>
          <label>Email</label>
          <input
            ref={register({
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
          <label>Password</label>
          <input
            ref={register({
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
          <label>Retype Your Password</label>
          <input
            ref={register({
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
        <Button
          type="button"
          color="black"
          onClick={() => {
            setEditing(false);
          }}
        >
          Cancel
        </Button>
        <Button ref={register} color="green" type="submit" disabled={loading}>
          Submit
        </Button>
      </Form>
    </>
  );
};

interface PageProps {
  user: string;
  email: string;
}

const ProfilePage = ({ user, email }: PageProps) => {
  return (
    <div
      style={{ marginBottom: '2em', display: 'flex', justifyContent: 'center' }}
    >
      <div>
        <List relaxed>
          <List.Item>
            <List.Icon name="user" />
            <List.Content>{user}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="mail" />
            <List.Content as="a">{email}</List.Content>
          </List.Item>
        </List>
      </div>
    </div>
  );
};

const Profile: React.FC<undefined> = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState<string | null>(null);
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUsername();
      setUser(result);
    };
    fetchData();
  }, [currentUser]);

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
            {currentUser && user ? (
              <>
                <Header as="h1" style={{ marginBottom: '1em' }}>
                  <Icon name="rocket" />
                  <Header.Content>Your Details</Header.Content>
                </Header>
                <div style={{ marginBottom: '1em' }}>
                  {editing ? (
                    <ProfileForm setEditing={setEditing} />
                  ) : (
                    <>
                      <ProfilePage
                        user={user}
                        email={currentUser.email as string}
                      />
                      <Button onClick={() => setEditing(true)}>
                        Edit Details
                      </Button>
                    </>
                  )}
                </div>
              </>
            ) : (
              <Loader active inline="centered" />
            )}
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

export default Profile;
