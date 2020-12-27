import React, { useState, useEffect } from 'react';
import MainNavbar from './Navbar';
import Footer from './Footer';
import HabitBoard from '../Components/HabitBoard';
import HabitList from '../Components/HabitList';
import { Header } from 'semantic-ui-react';
import Dropdown from '../Components/Dropdown';
import { getAllByUser } from '../middleware/api';

// const data = [
//   { name: 'Full Stack Project', iconNo: 9 },
//   { name: 'Socialise', iconNo: 4 },
//   { name: 'Enough Sleep', iconNo: 13 },
// ];

const User: React.FC<undefined> = () => {
  const user = 'lawrence';
  const [data, setData] = useState<any>([]);
  const [habit, setHabit] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      getAllByUser(user).then((data) => {
        setData(data.habits);
        setHabit(data.habits[0].name);
        setIsFetching(false);
        return data;
      });
    };
    fetchData();
  }, []);

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
          <Dropdown data={data} habit={habit} setHabit={setHabit} />
        </div>
        <div style={{ margin: '0em 2em 2em' }}>
          <HabitBoard isFetching={isFetching} habit={habit} data={data} />
        </div>
      </div>
      <Footer as="footer" />
    </div>
  );
};

export default User;
