import ReactHexagon from 'react-hexagon';
import _ from 'lodash';
import { Grid, Header, GridRowProps } from 'semantic-ui-react';
import React, { useEffect, useState, useRef } from 'react';

interface BoardData {
  [key: string]: boolean;
}

interface Props {
  initState: boolean;
  children?: React.ReactNode;
  style?: object;
  habit: number;
  display: number;
  month: number;
  board: BoardData[];
  setBoard: React.Dispatch<React.SetStateAction<BoardData[]>>;
}

export const Hexagon = (props: Props) => {
  const didMountRef = useRef(false);
  const [selected, setSelected] = useState<boolean>(props.initState);
  const handleClick = () => {
    setSelected(!selected);
  };
  const id: string = '2020' + ',' + (props.month + 1) + ',' + props.display;

  /* const colourScheme = {
    unselected: {
      stroke: '#993300',
      fill: '#808080',
    },
    selected: {
      stroke: '#ffe802',
      fill: '#ff8e02',
    },
  }; */

  const colourScheme = {
    unselected: {
      stroke: 'lightyellow',
      fill: 'linen',
    },
    selected: {
      stroke: 'yellow',
      fill: 'goldenrod',
    },
  };

  /* const textPosition = {
    singleDigit: {
      x: '40%',
      y: '65%',
    },
    twoDigit: {
      x: '30%',
      y: '65%',
    },
  }; */

  const textPosition = {
    singleDigit: {
      x: '32%',
      y: '60%',
    },
    twoDigit: {
      x: '28%',
      y: '60%',
    },
  };

  useEffect(() => {
    if (props.board !== undefined) {
      if (didMountRef.current) {
        console.log(props.board);
        if (selected) {
          const newArr: BoardData[] = props.board;
          console.log(newArr);
          newArr[props.habit][id] = true;
          props.setBoard(newArr);
          console.log(id + 'on');
        } else {
          const newArr: BoardData[] = [...props.board];
          delete newArr[props.habit][id];
          props.setBoard(newArr);
          console.log(id + 'off');
        }
      } else {
        didMountRef.current = true;
      }
    }
  }, [selected]);

  return (
    <div
      style={{
        width: '3.1%',
        marginLeft: '0.1em',
      }}
      onClick={handleClick}
    >
      <ReactHexagon
        flatTop={true}
        style={{
          ...props.style,
          padding: '0.5em',
          ...(selected ? colourScheme.selected : colourScheme.unselected),
          strokeWidth: 70,
        }}
      >
        <text
          {...(props.display >= 10
            ? textPosition.twoDigit
            : textPosition.singleDigit)}
          fontSize="1000%"
          style={
            {
              /* userSelect: 'none' */
            }
          }
        >
          {props.display}
        </text>
      </ReactHexagon>
    </div>
  );
};

interface HabitData {
  dateEnded: string;
  dateStarted: string;
  hid: number;
  iconNo: number;
  name: string;
  streakGoal: number;
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
  }, [data, isFetching, habit]);

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
