import _ from 'lodash';
import {
  Grid,
  Header,
  Segment,
  Image,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
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

/* interface EntryData {
  id: number;
  hid: number;
  date: string;
} */

interface Entries {
  [hid: string]: {
    [date: string]: boolean;
  };
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
  entryData: Entries;
  isCommentMode: boolean;
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const HabitBoard = ({
  habit,
  habitData,
  entryData,
  isCommentMode,
  isLoading,
  setLoading,
}: BoardProps) => {
  const [prevHexagonState, setPrevHexagonState] = useState<BoardData[]>([{}]);
  const [prevHabit, setPrevHabit] = useState<null | string>(null);
  const [boards, setBoards] = useState<JSX.Element>();
  const [hexagonState, sethexagonState] = useState<BoardData[]>([{}]);
  const [habitIndex, sethabitIndex] = useState<HabitIndex>({});
  const [didMountRef, setMount] = useState<boolean>(false);

  /* useEffect(() => {
    console.log('Loading: ', isLoading);
  }, [isLoading]); */

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
    const initHabitIndices = async () => {
      const tempHIndex: HabitIndex = {};
      for (let i = 0; i < habitData.length; i++) {
        tempHIndex[habitData[i].hid] = { index: i, name: habitData[i].name };
      }
      sethabitIndex(tempHIndex);
      return tempHIndex;
    };

    const defineBoard = async (entryData: any, habitIndex: HabitIndex) => {
      if (!didMountRef) {
        const tempHexStates: BoardData[] = _.times(
          habitData.length,
          () => ({})
        );
        for (let hid in entryData) {
          for (let date in entryData[hid]) {
            tempHexStates[habitIndex[parseInt(hid)].index][date] = true;
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
            <Grid.Row style={{ padding: '0', margin: '0.1vh 0.25vw' }} key={i}>
              <Grid.Column
                width={1}
                verticalAlign="middle"
                style={{ padding: '0em' }}
              >
                <Header as="h5" style={{ color: 'white' }}>
                  {months[i]}
                </Header>
              </Grid.Column>

              <Grid.Column
                width={15}
                verticalAlign="middle"
                style={{ paddingLeft: '0em', paddingRight: '0.5em' }}
              >
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
                        isCommentMode={isCommentMode}
                      />
                    );
                  })}
                </div>
              </Grid.Column>
            </Grid.Row>
          ))}
        </Grid>
      );
      setLoading(false);
    };

    initHabitIndices()
      .then((habitIndex) => defineBoard(entryData, habitIndex))
      .then((hexagonState) => {
        if (Object.keys(habitIndex).length > 0) {
          initPrevData(hexagonState);
          renderBoard(habitIndex, hexagonState, habit);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [habitData, entryData, habit, isCommentMode]);

  useEffect(() => {
    console.log(prevHexagonState);
  }, [prevHexagonState]);

  const postBoardState = (
    habit: string,
    habitIndex: HabitIndex,
    hexagonState: BoardData[],
    prevHexagonState: BoardData[]
  ) => {
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

  return isLoading ? (
    <Segment>
      <Dimmer active>
        <Loader />
      </Dimmer>
      <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
    </Segment>
  ) : (
    <>{boards}</>
  );
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
