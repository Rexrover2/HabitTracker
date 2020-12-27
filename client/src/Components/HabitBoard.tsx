import ReactHexagon from 'react-hexagon';
import _ from 'lodash';
import { Grid, Header } from 'semantic-ui-react';
import React, { useEffect, useState, useRef } from 'react';

interface BoardData {
  [key: string]: boolean;
}

interface Props {
  initState: boolean;
  style?: object;
  habit: number;
  display: number;
  month: number;
  board: BoardData[];
  setBoard: React.Dispatch<React.SetStateAction<BoardData[]>>;
}

export const Hexagon = ({ habit, setBoard, board, ...props }: Props) => {
  const didMountRef = useRef(false);
  const [selected, setSelected] = useState<boolean>(props.initState);
  const handleClick = () => {
    setSelected(!selected);
  };
  const id: string = `2020,${props.month + 1},${props.display}`;

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
    if (board !== undefined) {
      if (didMountRef.current) {
        if (selected) {
          const newArr: BoardData[] = board;
          console.log(newArr);
          newArr[habit][id] = true;
          setBoard(newArr);
          console.log(id + 'on');
        } else {
          const newArr: BoardData[] = board;
          delete newArr[habit][id];
          setBoard(newArr);
          console.log(id + 'off');
        }
      } else {
        didMountRef.current = true;
      }
    }
  }, [selected, habit]);

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
        >
          {props.display}
        </text>
      </ReactHexagon>
    </div>
  );
};

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
