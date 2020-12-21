import React from 'react';
import Navbar from '../Components/Navbar';

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
        {props.page !== 'user' ? (
          <Navbar.Link name="My Habits" to="/u/law" />
        ) : null}
      </Navbar.Left>

      <Navbar.Center style={{ flex: 1 }}>
        <Navbar.WebIcon />
      </Navbar.Center>

      <Navbar.Right style={{ flex: 1 }}>
        <Navbar.ProfileIcon />
      </Navbar.Right>
    </Navbar>
  );
};

export default MainNavbar;
