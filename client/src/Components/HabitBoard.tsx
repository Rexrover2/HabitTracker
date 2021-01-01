import _ from 'lodash';
import { Grid, Header } from 'semantic-ui-react';
import React, { useEffect, useState, useRef } from 'react';
import Hexagon from './Hexagon';
import { createEntries, deleteEntries } from '../middleware/api';
import { Console } from 'console';

export interface BoardData {
  [key: string]: boolean;
}

interface HabitData {
  dateEnded?: string;
  dateStarted: string;
  hid: number;
  iconNo: number;
  name: string;
  streakGoal?: number;
  username: string;
}

interface EntryData {
  id: number;
  hid: number;
  date: string;
}

interface Habit {
  index: number;
  name: string;
}

interface HabitIndex {
  // key will be hid
  [key: number]: Habit;
}

interface BoardProps {
  habit: string;
  habitData: HabitData[];
  entryData: EntryData[][];
  isFetching: boolean;
}

const HabitBoard = ({
  habit,
  habitData,
  entryData,
  isFetching,
}: BoardProps) => {
  const [prevHexagonState, setPrevHexagonState] = useState<BoardData[]>([{}]);
  const [prevHabit, setPrevHabit] = useState<null | string>(null);
  const [boards, setBoards] = useState<JSX.Element>();
  const [hexagonState, sethexagonState] = useState<BoardData[]>([{}]);
  const [habitIndex, sethabitIndex] = useState<HabitIndex>({});
  const [didMountRef, setMount] = useState<boolean>(true);

  useEffect(() => {
    const initHabitIndices = () => {
      const tempHIndex: HabitIndex = {};
      console.log(habitData);
      for (let i = 0; i < habitData.length; i++) {
        tempHIndex[habitData[i].hid] = { index: i, name: habitData[i].name };
      }
      sethabitIndex(tempHIndex);
    };

    // Initialise the indices for habits
    /* if (!isFetching) {
      initHabitIndices();
    } */
    initHabitIndices();
  }, [habitData /* isFetching */]);

  useEffect(() => {
    console.log(habit);
  }, [habit]);

  useEffect(() => {
    setPrevHabit(habit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(prevHabit);
  }, [prevHabit]);

  useEffect(() => {
    console.log(hexagonState);
  }, [hexagonState]);

  useEffect(() => {
    const defineBoard = () => {
      const tempHexStates: BoardData[] = _.times(habitData.length, () => ({}));
      for (let i = 0; i < entryData.length; i++) {
        for (let j = 0; j < entryData[i].length; j++) {
          // console.log(entryData[i]);
          // console.log(entryData[i][j].date);
          // console.log(entryData[i][j].hid);
          tempHexStates[habitIndex[entryData[i][j].hid].index][
            entryData[i][j].date
          ] = true;
        }
      }
      sethexagonState(tempHexStates);
      setMount(false);
    };
    if (!isFetching && habitData.length === Object.entries(habitIndex).length) {
      defineBoard(); /* .catch((error) => console.log(error)); */
    }
  }, [habitData, isFetching, entryData, habitIndex]);

  // Renders the Habit board reading from hexagon states, upon initialisation, habit change, new get.
  useEffect(() => {
    const renderBoard = (
      habitIndex: HabitIndex,
      hexagonState: BoardData[],
      habit: string
    ) => {
      const habitKey: string = Object.keys(habitIndex).find(
        (key) => habitIndex[parseInt(key)].name === habit
      ) as string;
      const habitNo = habitIndex[parseInt(habitKey)].index;
      setBoards(
        <Grid
          key={habitNo}
          style={{
            padding: '1em 0em',
            backgroundColor: '#2d2d2d',
            borderRadius: '25px',
          }}
        >
          {_.times(12, (i) => (
            <Grid.Row style={{ padding: '0', margin: '0.25em 0.25em' }} key={i}>
              <Grid.Column width={1} verticalAlign="middle">
                <Header as="h5" style={{ color: 'white' }}>
                  {months[i]}
                </Header>
              </Grid.Column>

              <Grid.Column width={15} verticalAlign="middle">
                <div style={{ display: 'flex' }}>
                  {_.times(days[i], (j) => {
                    const id: string = `2020-${
                      i + 1 >= 10 ? i + 1 : '0' + (i + 1)
                    }-${j + 1 >= 10 ? j + 1 : '0' + (j + 1)}`;
                    return (
                      <Hexagon
                        key={j}
                        display={j + 1}
                        id={id}
                        initState={id in hexagonState[habitNo] ? true : false}
                        board={hexagonState}
                        setBoard={sethexagonState}
                        habit={habitNo}
                      />
                    );
                  })}
                </div>
              </Grid.Column>
            </Grid.Row>
          ))}
        </Grid>
      );
    };

    if (!isFetching && Object.entries(habitIndex).length > 0) {
      renderBoard(habitIndex, hexagonState, habit);
    }
  }, [habitIndex, isFetching, habit, hexagonState]);

  useEffect(() => {
    const initPrevData = () => {
      const newStates = hexagonState.map((obj) => ({ ...obj }));
      console.log('init');
      setPrevHexagonState(newStates);
    };

    if (!didMountRef) {
      initPrevData();
      setMount(true);
    }
  }, [didMountRef, hexagonState]);

  useEffect(() => {
    console.log(prevHexagonState);
  }, [prevHexagonState]);

  const postBoardState = (
    habitIndex: HabitIndex,
    hexagonState: BoardData[],
    prevHexagonState: BoardData[]
  ) => {
    console.log('TOGGLE');
    const hid: string = Object.keys(habitIndex).find(
      (key) => habitIndex[parseInt(key)].name === habit
    ) as string;

    // Create entryData for entries in hexagonState that arent already in EntryData.
    const newEntries: string[] = [];
    const i = habitIndex[parseInt(hid)].index;
    // key is date e.g. 12-12-2020
    for (let key in hexagonState[i]) {
      console.log('create', key, hexagonState[i], prevHexagonState[i]);
      if (!(key in prevHexagonState[i])) newEntries.push(key);
    }
    // console.log(newEntries);

    const oldEntries: string[] = [];
    const j = habitIndex[parseInt(hid)].index;
    for (let key in prevHexagonState[j]) {
      console.log('delete', key, prevHexagonState[j], hexagonState[j]);
      if (!(key in hexagonState[j])) oldEntries.push(key);
    }

    if (newEntries.length > 0) {
      createEntries(hid, newEntries);
    }
    if (oldEntries.length > 0) {
      deleteEntries(hid, oldEntries);
    }
  };

  const throttlePostData = useRef(
    _.throttle(
      (
        habitIndex: HabitIndex,
        hexagonState: BoardData[],
        prevHexagonState: BoardData[]
      ) => postBoardState(habitIndex, hexagonState, prevHexagonState),
      2000,
      { trailing: true }
    )
  );

  useEffect(() => {
    // written to ignore habit changes for now!
    // deps: habit, habitIndex,

    //TODO:  Need to log before rendering new board when switching habit via dropdown

    if (/* prevHabit !== null && */ Object.entries(habitIndex).length !== 0) {
      throttlePostData.current(habitIndex, hexagonState, prevHexagonState);
      setPrevHabit(habit);
      const newStates = hexagonState.map((obj) => ({ ...obj }));
      setPrevHexagonState(newStates);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- "add prevHexagonState"
  }, [habitIndex, hexagonState, habit]);

  return isFetching ? null : <>{boards}</>;
};

export default HabitBoard;

const months = [
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const tempYear = 2020;

const leapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const days = [
  31,
  leapYear(tempYear) ? 29 : 28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31,
];
