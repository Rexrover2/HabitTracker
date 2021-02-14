import React, { useState, useEffect, useRef } from 'react';
import MainNavbar from './Navbar';
import Footer from './Footer';
import HB from '../Components/HabitBoard';
import HabitList from '../Components/HabitList';
import {
  CheckboxProps,
  Dimmer,
  Header,
  Loader,
  Radio,
} from 'semantic-ui-react';
import Dropdown from '../Components/Dropdown';
import { getAllByUser, getUsername } from '../middleware/api';
import { useAuth } from '../Context/AuthContext';
import _ from 'lodash';

// const data = [
//   { name: 'Full Stack Project', iconNo: 9 },
//   { name: 'Socialise', iconNo: 4 },
//   { name: 'Enough Sleep', iconNo: 13 },
// ];

const User: React.FC<undefined> = () => {
  // const user = 'lawrence';
  const [username, setUsername] = useState<string | null>(null);
  const [habitData, setHabitData] = useState<any>(null);
  const [entryData, setEntryData] = useState<any>(null);
  const [notesData, setNotesData] = useState<any>(null);
  const [habit, setHabit] = useState<string | null>(null);
  const [isComment, setIsComment] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [checked, setChecked] = useState<boolean>(false);
  let { currentUser } = useAuth();

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

  const throttleToggleMode = useRef(
    _.throttle(
      (checked: boolean) => {
        setChecked(!checked);
        setIsComment(!checked);
        setLoading(true);
      },
      500,
      { trailing: true }
    )
  );

  useEffect(() => {
    const fetchData = async () => {
      console.log('Reading data');
      const user = await getUsername();
      const { habits, entries, notes } = await getAllByUser(user);
      // {hid: {date: true}, hid2: {date: true}}
      // [{hid: {date: note }]

      console.log(habits, entries, notes);
      if (habits && entries && notes) {
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

        setUsername(user);
        setHabitData(habits);
        setEntryData(formatedEntries);
        setNotesData(formatedNotes);

        if (habits && habits.length > 0) {
          setHabit(habits[0].name);
        } else {
          setHabit('-');
        }
      } else {
        // window.location.assign('/');
      }
      setIsFetching(false);
    };
    fetchData();
  }, [isFetching, currentUser]);

  return (
    <div
      className="App"
      style={{ display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}
    >
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
          {!isFetching && habit && entryData && notesData && username ? (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: habit === '-' ? 'center' : 'flexStart',
                  padding: '2em 2em 1em',
                  width: '100%',
                }}
              >
                <div>
                  <Header as="h1">My Habits</Header>
                  <HabitList
                    data={habitData}
                    updateData={setIsFetching}
                    user={username}
                  />
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
                <span style={{ marginLeft: '2em' }}>
                  Toggle {isComment ? 'comment' : 'tracking'} mode:
                </span>
                <Radio
                  slider
                  checked={checked}
                  style={{ marginLeft: '0.5em', paddingTop: '0.3em' }}
                  onChange={(
                    event: React.FormEvent<HTMLInputElement>,
                    data: CheckboxProps
                  ) => {
                    throttleToggleMode.current(checked);
                    /* setTimeout(() => {
                      setChecked(!checked);
                      setIsComment(!checked);
                      setLoading(true);
                    }, 3000); */
                  }}
                />
              </div>
              <div style={{ padding: '0em 2em 2em', width: '100%' }}>
                {habit !== '-' && (
                  <HB
                    habit={habit}
                    entryData={entryData}
                    habitData={habitData}
                    isCommentMode={isComment}
                    isLoading={isLoading}
                    setLoading={setLoading}
                  />
                )}
              </div>
            </>
          ) : (
            <Dimmer active inverted>
              <Loader size="large" inverted content="Loading" />
            </Dimmer>
          )}
        </div>

        <Footer as="footer" />
      </div>
    </div>
  );
};

export default User;
