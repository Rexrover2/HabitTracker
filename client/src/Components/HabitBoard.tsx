import _ from 'lodash';
import { Grid, Header } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import Hexagon from './Hexagon';

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

interface BoardProps {
  habit: string;
  data: HabitData[];
  isFetching: boolean;
}

const HabitBoard = ({ habit, data, isFetching }: BoardProps) => {
  const [boards, setBoards] = useState<JSX.Element>();
  const [hexagonState, sethexagonState] = useState<BoardData[]>([{}]);

  useEffect(() => {
    // Initialise the state of hexagons!
    if (!isFetching) {
      console.log(data.length);
      sethexagonState(_.times(data.length, (i) => ({})));
    }
  }, [data, isFetching]);

  useEffect(() => {
    console.log(hexagonState);
  }, [hexagonState]);

  useEffect(() => {
    // Renders the Habit board reading from hexagon states, upon initialisation, habit change, new get.

    const habitNo = data.findIndex((inst) => inst.name === habit);
    if (!isFetching) {
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
                  {_.times(days[i], (j) => (
                    <Hexagon
                      key={j}
                      display={j + 1}
                      initState={
                        `2020,${i + 1},${j + 1}` in hexagonState[habitNo]
                          ? true
                          : false
                      }
                      month={i}
                      board={hexagonState}
                      setBoard={sethexagonState}
                      habit={habitNo}
                    />
                  ))}
                </div>
              </Grid.Column>
            </Grid.Row>
          ))}
        </Grid>
      );
    }
  }, [data, isFetching, habit, hexagonState]);

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
