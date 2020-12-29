import React, { useState, useEffect, useRef } from 'react';
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
  const didMountRef = useRef(false);
  const [habitData, setHabitData] = useState<any>([]);
  const [entryData, setEntryData] = useState<any>([]);
  const [notesData, setNotesData] = useState<any>([]);
  const [habit, setHabit] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      getAllByUser(user).then((data) => {
        setHabitData(data.habits);
        setEntryData(data.entries);
        setNotesData(data.notes);
        setHabit(data.habits[0].name);
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const updateLoading = async () => {
      setIsFetching(false);
    };

    setTimeout(() => {
      if (entryData.length !== 0) {
        updateLoading();
        console.log(entryData);
      }
    }, 1000);
  }, [entryData]);

  return (
    <div
      className="App"
      style={{ display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}
    >
      {isFetching ? null : (
        <div>
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
                <HabitList data={habitData} />
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
              <Dropdown data={habitData} habit={habit} setHabit={setHabit} />
            </div>
            <div style={{ margin: '0em 2em 2em' }}>
              <HabitBoard
                isFetching={isFetching}
                habit={habit}
                entryData={entryData}
                habitData={habitData}
              />
            </div>
          </div>
          <Footer as="footer" />
        </div>
      )}
    </div>
  );
};

export default User;
