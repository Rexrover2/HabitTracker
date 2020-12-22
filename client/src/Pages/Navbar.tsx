import React from 'react';
import Navbar from '../Components/Navbar';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface Props {
  as: string;
  page?: string;
}

const MainNavbar: React.FC<Props> = (props: Props) => {
  return (
    <Navbar
      {...props}
      text={props.page === 'user' ? false : true}
      style={{ margin: 0, display: 'flex' }}
    >
      <Navbar.Left style={{ flex: 1 }}>
        {props.page !== 'user' &&
        props.page !== 'login' &&
        props.page !== 'signup' ? (
          <Navbar.Link name="My Habits" to="/u/law" />
        ) : null}
      </Navbar.Left>

      <Navbar.Center style={{ flex: 1 }}>
        <Navbar.WebIcon />
      </Navbar.Center>

      <Navbar.Right style={{ flex: 1 }}>
        {/* <Navbar.ProfileIcon /> */}
        {props.page !== 'login' && props.page !== 'signup' ? (
          <>
            <Button as={Link} to="/login" primary>
              Log In
            </Button>
            <Button as={Link} to="/signup" secondary>
              Sign Up
            </Button>
          </>
        ) : null}
      </Navbar.Right>
    </Navbar>
  );
};

export default MainNavbar;
