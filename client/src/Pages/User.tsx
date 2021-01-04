import React, { useState, useEffect } from 'react';
import MainNavbar from './Navbar';
import Footer from './Footer';
import HB from '../Components/HabitBoard';
import HabitList from '../Components/HabitList';
import { Header } from 'semantic-ui-react';
import Dropdown from '../Components/Dropdown';
import { getAllByUser } from '../middleware/api';
import NewHabitForm from '../Components/HabitForm';
import { instance } from '../middleware/auth';

// const data = [
//   { name: 'Full Stack Project', iconNo: 9 },
//   { name: 'Socialise', iconNo: 4 },
//   { name: 'Enough Sleep', iconNo: 13 },
// ];

const User: React.FC<undefined> = () => {
  const user = 'lawrence';
  const [habitData, setHabitData] = useState<any | null>(null);
  const [entryData, setEntryData] = useState<any>([]);
  const [notesData, setNotesData] = useState<any>([]);
  const [habit, setHabit] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const [HabitBoard, setHabitBoard] = useState<JSX.Element | null>(null);
  /*   useEffect(() => {
    const fetchData = async () => {
      getAllByUser(user).then((data) => {
        // console.log(data.habits, data.entries, data.notes);
        setHabitData(data.habits);
        setEntryData(data.entries);
        setNotesData(data.notes);
        if (data.habits.length > 0) {
          setHabit(data.habits[0].name);
        }
      });
    };
    fetchData();
  }, []); */

  interface Entries {
    [hid: string]: {
      [date: string]: boolean;
    };
  }

  interface Notes {
    [hid: string]: {
      [date: string]: string;
    };
  }

  useEffect(() => {
    const fetchData = async () => {
      const { habits, entries, notes } = await getAllByUser(user);
      // {hid: {date: true}, hid2: {date: true}}
      // [{hid: {date: note }]
      const formatedEntries: Entries = {};
      entries.forEach(({ hid, date }: any) => {
        const strHid: string = '' + hid;
        if (!(strHid in formatedEntries)) {
          formatedEntries[strHid] = {};
          formatedEntries[strHid][date] = true;
        } else {
          formatedEntries[strHid][date] = true;
        }
      });
      console.log(formatedEntries);
      const formatedNotes: Notes = {};
      notes.forEach(({ hid, date, note }: any) => {
        const strHid: string = '' + hid;
        if (!(strHid in formatedNotes)) {
          formatedNotes[strHid] = {};
          formatedNotes[strHid][date] = note;
        } else {
          formatedNotes[strHid][date] = note;
        }
      });
      console.log(formatedNotes);

      setHabitData(habits);
      setEntryData(entries);
      setNotesData(notes);
      if (habits.length > 0) {
        setHabit(habits[0].name);
      }
      return { habits, formatedEntries, formatedNotes };
    };
    fetchData().then((data) => {
      if (data.habits.length > 0) {
        console.log('Setting render board');
        const board = (
          <HB
            isFetching={false}
            habit={data.habits[0].name}
            entryData={data.entries}
            habitData={data.habits}
          />
        );
        setIsFetching(false);
        setHabitBoard(board);
        console.log(board);
      } else {
        setHabitBoard(null);
        setIsFetching(false);
      }
    });
  }, [isFetching]);

  /*  useEffect(() => {
    setTimeout(() => {
      if (entryData.length !== 0) {
        setIsFetching(false);
        console.log(entryData);
      }
    }, 1500);
  }, [entryData]); */

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
                <HabitList data={habitData} updateData={setIsFetching} />
                <NewHabitForm updateData={setIsFetching} user={user} />
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
              <>{HabitBoard}</>
            </div>
          </div>
          <Footer as="footer" />
        </div>
      )}
    </div>
  );
};

export default User;
