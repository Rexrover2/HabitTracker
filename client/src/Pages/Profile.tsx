import React, { useEffect, useRef, useState } from 'react';
import Layout from './Layout';
import {
  Header,
  Icon,
  Form,
  Button,
  Loader,
  List,
  Divider,
  Modal,
} from 'semantic-ui-react';

import { useForm } from 'react-hook-form';

import { useAuth } from '../Context/AuthContext';
import { getUsername } from '../middleware/api';

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
    setLoading(true);
    console.log('submit');
    setError('');
    let result = '';

    if (email.length) {
      console.log('email');
      result = await updateEmail(email);
    }
    if (password.length) {
      console.log('password');
      result = await updatePassword(password);
    }
    console.log(result);
    setError(result);
    if (!result) {
      console.log('editing off');
      setEditing(false);
    }
    setLoading(false);
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
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfilePage = ({ user, email, setEditing }: PageProps) => {
  const [error, setError] = useState('');
  return (
    <div
      style={{
        marginBottom: '2em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
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
        <Button onClick={() => setEditing(true)}>Edit Details</Button>
      </div>

      <Divider style={{ margin: '2em 0em' }} />
      <div>
        <Header as="h3" style={{ marginBottom: '1em' }}>
          <Icon name="exclamation triangle" />
          <Header.Content>Danger Zone</Header.Content>
        </Header>
        <DeleteAccountModal setError={setError} />
        {error && <text style={{ color: 'red' }}>{error}</text>}
      </div>
    </div>
  );
};

interface DeleteAccountProps {
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const DeleteAccountModal = ({ setError }: DeleteAccountProps) => {
  const [opened, setOpen] = useState<boolean>(false);
  const { deleteUser } = useAuth();
  return (
    <Modal
      size="large"
      open={opened}
      onClose={() => setOpen(false)}
      trigger={
        <Button
          label="Terminate Your Account and all your data"
          color="red"
          icon="user delete"
          onClick={() => setOpen(true)}
          style={{ marginBottom: '1em' }}
        />
      }
    >
      <Modal.Header>
        Are you sure you want to delete your account? This is irreversible and
        will delete all your data!
      </Modal.Header>
      {/* <Modal.Content>
        <p>
          Are you sure you want to delete your habit? All your progress will be
          lost!
        </p>
      </Modal.Content> */}
      <Modal.Actions>
        <Button positive onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          negative
          onClick={() => {
            const handleClick = async () => {
              const result = await deleteUser();
              setError(result);
            };
            handleClick();
            setOpen(false);
          }}
        >
          Confirm Delete
        </Button>
      </Modal.Actions>
    </Modal>
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
    <Layout page="profile">
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
                  setEditing={setEditing}
                />
              </>
            )}
          </div>
        </>
      ) : (
        <Loader active inline="centered" />
      )}
    </Layout>
  );
};

export default Profile;
