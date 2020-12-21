import React from 'react';
import MainNavbar from './Navbar';
import Footer from './Footer';
import HabitBoard from '../Components/HabitBoard';
import HabitList from '../Components/HabitList';
import { Header } from 'semantic-ui-react';
import Dropdown from '../Components/Dropdown';

const data = [
  {
    name: 'Full Stack Project',
    iconNo: 9,
    daysCompleted: 30,
    currentStreak: 30,
    dayStarted: '12/12/2020',
    isGoalComplete: true,
  },
  {
    name: 'Socialise',
    iconNo: 4,
    daysCompleted: 30,
    currentStreak: 30,
    dayStarted: '12/12/2020',
    isGoalComplete: true,
  },
  {
    name: 'Enough Sleep',
    iconNo: 13,
    daysCompleted: 15,
    currentStreak: 30,
    dayStarted: '11/12/2020',
    isGoalComplete: true,
    dayEnded: '21/12/2020',
  },
];

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
            padding: '2em 2em 1em',
            width: '100%',
          }}
        >
          <div>
            <Header as="h1">My Habits</Header>
            <HabitList data={data} />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            padding: '2em',
            justifyContent: 'flex-start',
            width: '100%',
          }}
        >
          <Dropdown data={data} />
        </div>
        <div style={{ margin: '0em 2em 2em' }}>
          <HabitBoard />
        </div>
      </div>
      <Footer as="footer" />
    </div>
  );
};

export default User;
