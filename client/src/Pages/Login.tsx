import React from 'react';
import MainNavbar from './Navbar';
import Footer from './Footer';
import { Header, Icon } from 'semantic-ui-react';

const centerflex = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '1 1 auto',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
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
          <Header as="h1">
            <Icon name="sign-in" />
            <Header.Content>Welcome Back</Header.Content>
          </Header>
        </div>
      </div>
      <Footer as="footer" />
    </div>
  );
};

export default Login;
