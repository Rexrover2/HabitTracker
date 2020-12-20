import React from 'react';
import MainNavbar from './Navbar';
import Footer from './Footer';
import HabitBoard from '../Components/HabitBoard';
import HabitList from '../Components/HabitList';
import { Header, List } from 'semantic-ui-react';

const User: React.FC<undefined> = () => {
  return (
    <div
      className="App"
      style={{ display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}
    >
      <MainNavbar as="header" page="user" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flexStart',
            padding: '2em 2em 0em',
            width: '100%',
          }}
        >
          <div
            style={{
              padding: '1em 2em 0.5em',
              /* borderStyle: 'inset',
              // borderColor: '#2d2d2d',
              borderRadius: '25px', */
            }}
          >
            <Header as="h1">My Habits</Header>
            <HabitList />
          </div>
        </div>
        <div style={{ margin: '2em' }}>
          <HabitBoard />
        </div>
      </div>
      <Footer as="footer" />
    </div>
  );
};

export default User;
