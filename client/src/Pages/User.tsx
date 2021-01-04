import React, { useState, useEffect } from 'react';
import MainNavbar from './Navbar';
import Footer from './Footer';
import HB from '../Components/HabitBoard';
import HabitList from '../Components/HabitList';
import { Header } from 'semantic-ui-react';
import Dropdown from '../Components/Dropdown';
import { getAllByUser } from '../middleware/api';
import NewHabitForm from '../Components/HabitForm';

// const data = [
//   { name: 'Full Stack Project', iconNo: 9 },
//   { name: 'Socialise', iconNo: 4 },
//   { name: 'Enough Sleep', iconNo: 13 },
// ];

const User: React.FC<undefined> = () => {
  const user = 'lawrence';
  const [habitData, setHabitData] = useState<any>(null);
  const [entryData, setEntryData] = useState<any>(null);
  const [notesData, setNotesData] = useState<any>(null);
  const [habit, setHabit] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);

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

      console.log(habits, entries, notes);
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
      setEntryData(formatedEntries);
      setNotesData(formatedNotes);

      if (habits.length > 0) {
        setHabit(habits[0].name);
      } else {
        setHabit('-');
      }
      setIsFetching(false);
    };
    fetchData();
  }, [isFetching]);

  return (
    <div
      className="App"
      style={{ display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}
    >
      {habit && entryData && notesData ? (
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
              <HB
                isFetching={false}
                habit={habit}
                entryData={entryData}
                habitData={habitData}
              />
            </div>
          </div>
          <Footer as="footer" />
        </div>
      ) : null}
    </div>
  );
};

export default User;
