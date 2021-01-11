import React from 'react';
import Navbar from '../Components/Navbar';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

interface Props {
  as: string;
  page?: string;
}

const MainNavbar: React.FC<Props> = (props: Props) => {
  const { currentUser } = useAuth();
  return (
    <Navbar
      {...props}
      text={props.page === 'user' ? false : true}
      style={{ margin: 0, display: 'flex' }}
    >
      <Navbar.Left style={{ flex: 1 }}>
        {currentUser &&
        props.page !== 'user' &&
        props.page !== 'login' &&
        props.page !== 'signup' ? (
          <Navbar.Link name="My Habits" to="/u/law" />
        ) : null}
      </Navbar.Left>

      <Navbar.Center style={{ flex: 1 }}>
        <Navbar.WebIcon />
      </Navbar.Center>

      <Navbar.Right style={{ flex: 1 }}>
        {currentUser ? (
          <Button as={Link} to="/" color="green">
            Log Out
          </Button>
        ) : (
          <>
            <Button as={Link} to="/login" primary>
              Log In
            </Button>
            <Button as={Link} to="/signup" secondary>
              Sign Up
            </Button>
          </>
        )}
      </Navbar.Right>
    </Navbar>
  );
};

export default MainNavbar;
