import _ from 'lodash';
import { Grid, Header } from 'semantic-ui-react';
import React, { useEffect, useState, useRef } from 'react';
import Hexagon from './Hexagon';
import { createEntries, deleteEntries } from '../middleware/api';
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
  const [didMountRef, setMount] = useState<boolean>(false);

  useEffect(() => {
    const initHabitIndices = () => {
      const tempHIndex: HabitIndex = {};
      console.log(habitData);
      for (let i = 0; i < habitData.length; i++) {
        tempHIndex[habitData[i].hid] = { index: i, name: habitData[i].name };
      }
      sethabitIndex(tempHIndex);
    };

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
    const defineBoard = async (entryData: any, habitIndex: HabitIndex) => {
      if (!didMountRef) {
        const tempHexStates: BoardData[] = _.times(
          habitData.length,
          () => ({})
        );
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
        return tempHexStates;
      } else {
        return hexagonState;
      }
    };

    const initPrevData = (hexagonState: BoardData[]) => {
      const newStates = hexagonState.map((obj) => ({ ...obj }));
      setPrevHexagonState(newStates);
      setMount(true);
    };

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

    if (!isFetching && habitData.length === Object.entries(habitIndex).length) {
      defineBoard(entryData, habitIndex).then((hexagonState) => {
        initPrevData(hexagonState);
        renderBoard(habitIndex, hexagonState, habit);
      });
    }
  }, [habitData, isFetching, entryData, habitIndex, habit]);

  useEffect(() => {
    console.log(prevHexagonState);
  }, [prevHexagonState]);

  const postBoardState = (
    habit: string,
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
      // console.log('create', key, hexagonState[i], prevHexagonState[i]);
      if (!(key in prevHexagonState[i])) newEntries.push(key);
    }
    // console.log(newEntries);

    const oldEntries: string[] = [];
    const j = habitIndex[parseInt(hid)].index;
    for (let key in prevHexagonState[j]) {
      // console.log('delete', key, prevHexagonState[j], hexagonState[j]);
      if (!(key in hexagonState[j])) oldEntries.push(key);
    }

    if (newEntries.length > 0) {
      createEntries(hid, newEntries);
    }
    if (oldEntries.length > 0) {
      deleteEntries(hid, oldEntries);
    }

    const newStates = hexagonState.map((obj) => ({ ...obj }));
    setPrevHexagonState(newStates);
  };

  const throttlePostData = useRef(
    _.throttle(
      (
        habit: string,
        habitIndex: HabitIndex,
        hexagonState: BoardData[],
        prevHexagonState: BoardData[]
      ) => postBoardState(habit, habitIndex, hexagonState, prevHexagonState),
      1000,
      { trailing: true }
    )
  );

  useEffect(() => {
    // written to ignore habit changes for now!
    // deps: habit, habitIndex,

    //TODO:  Need to log before rendering new board when switching habit via dropdown

    if (didMountRef && Object.entries(habitIndex).length !== 0) {
      throttlePostData.current(
        habit,
        habitIndex,
        hexagonState,
        prevHexagonState
      );
      setPrevHabit(habit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- "add prevHexagonState"
  }, [habitIndex, hexagonState, habit]);

  return isFetching ? null : <>{boards}</>;
};

export default HabitBoard;

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
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
