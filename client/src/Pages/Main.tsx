import React from 'react';
import logo from '../logo.svg';
import MainNavbar from './Navbar';
import Footer from './Footer';

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
      <Footer as="footer" />
    </div>
  );
};

export default Main;
