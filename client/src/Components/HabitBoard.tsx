import ReactHexagon from 'react-hexagon';
import _ from 'lodash';
import { Grid, Header } from 'semantic-ui-react';
import React, { useState } from 'react';

interface Props {
  initState: boolean;
  children?: React.ReactNode;
  style?: object;
  name?: string;
  display: number;
}

export const Hexagon = (props: Props) => {
  const [selected, setSelected] = useState<boolean>(props.initState);
  const handleClick = () => {
    setSelected(!selected);
  };

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

interface BoardProps {
  habit: string;
}

const HabitBoard = (props: BoardProps) => {
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

  const rows = _.times(12, (i) => (
    <Grid.Row style={{ padding: '0', margin: '0.25em 0.25em' }} key={i}>
      <Grid.Column width={1} verticalAlign="middle">
        <Header as="h5" style={{ color: 'white' }}>
          {months[i]}
        </Header>
      </Grid.Column>

      <Grid.Column width={15} verticalAlign="middle">
        <div style={{ display: 'flex' }}>
          {_.times(days[i], (j) => (
            <Hexagon key={j} display={j + 1} initState={false} />
          ))}
        </div>
      </Grid.Column>
    </Grid.Row>
  ));

  return (
    <Grid
      style={{
        padding: '1em 0em',
        backgroundColor: '#2d2d2d',
        borderRadius: '25px',
      }}
    >
      {rows}
    </Grid>
  );
};

export default HabitBoard;
