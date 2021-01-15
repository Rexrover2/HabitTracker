import React from 'react';
import MainNavbar from './Navbar';
import Footer from './Footer';
import { Header, Icon } from 'semantic-ui-react';

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
          marginTop: '5em',
        }}
      >
        <Header as="h1">
          <Icon name="hand peace" />
          Glad to see you here, you're early, our main page is still under
          construction!
        </Header>
      </div>
      <Footer as="footer" />
    </div>
  );
};

export default Main;
