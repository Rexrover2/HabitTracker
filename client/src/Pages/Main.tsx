import React from 'react';
import logo from '../logo.svg';
import Navbar from '../Components/Navbar';

const Main: React.FC<undefined> = () => {
  return (
    <div
      className="App"
      style={{ display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}
    >
      <MainNavbar as="header" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          alignItems: 'center',
        }}
      >
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to the main page!</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
      <MainFooter as="footer" />
    </div>
  );
};

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

const MainFooter: React.FC<Props> = (props: Props) => (
  <Navbar {...props} attached="bottom" style={{ display: 'flex' }}>
    <Navbar.Left style={{ flex: 1 }}>
      <Navbar.SocialIcon
        color="linkedin"
        icon="linkedin"
        href="https://www.linkedin.com/in/lawrenceleong5/"
      />
      <Navbar.SocialIcon
        color="github"
        icon="github"
        href="https://github.com/Rexrover2"
      />
    </Navbar.Left>

    <Navbar.Center style={{ flex: 1 }}></Navbar.Center>

    <Navbar.Right style={{ flex: 1 }}></Navbar.Right>
  </Navbar>
);

export default Main;
