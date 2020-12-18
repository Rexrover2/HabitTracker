import React from 'react';
import Navbar from '../Components/Navbar';

interface Props {
  as: string;
}

const MainNavbar: React.FC<Props> = (props: Props) => {
  return (
    <Navbar {...props} text style={{ margin: 0, display: 'flex' }}>
      <Navbar.Left style={{ flex: 1 }}>
        <Navbar.Link name="My Habits" to="/u/law" />
      </Navbar.Left>

      <Navbar.Center style={{ flex: 1 }}>
        <Navbar.WebIcon/>
      </Navbar.Center>

      <Navbar.Right style={{ flex: 1 }}>
        <Navbar.ProfileIcon />
      </Navbar.Right>
    </Navbar>
  );
};

export default MainNavbar;