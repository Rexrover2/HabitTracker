import ReactHexagon from 'react-hexagon';
import _ from 'lodash';
import {Grid, GridColumn} from 'semantic-ui-react';
import React, {useState} from 'react';

interface Props {
  children?: React.ReactNode;
  style?: object;
  name?: string;
  display: number; 
}

const leapYear = (year:number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export const Hexagon = (props: Props) => {
  const [selected, setSelected] = useState<boolean>(false);
  const handleClick = () => {
    setSelected(!selected);
  };

  const colourScheme = {
    unselected: {
      stroke: '#993300',
      fill: '#808080',
    },
    selected: {
      stroke: '#ffe802',
      fill: '#ff8e02',
    },
  };

  const textPosition = {
    singleDigit: {
      x:"40%",
      y:"65%"
    },
    twoDigit: {
      x:"30%",
      y:"65%"
    }
  }

  return (
    <div
      style={{
        width:"3.2%"
      }}
    >
      <ReactHexagon
        flatTop={true}
        style={{
          ...props.style,
          padding: '0.5em',
          ...(selected ? colourScheme.selected : colourScheme.unselected),
          strokeWidth: 20,
        }}
        onClick={handleClick}
      >
        <text 
          {...(props.display>=10 ? textPosition.twoDigit : textPosition.singleDigit)} 
          fontSize="1000%" 
          style={{ /* userSelect: 'none' */ }}
        >
          {props.display}
        </text>
      </ReactHexagon>
    </div>
  );
};

const HabitBoard = () => {
  const months = [
   "Jan",
   "Feb",
   "March",
   "April",
   "May",
   "June",
   "July" ,
   "August",
   "September" ,
   "October",
   "November",
   "December",
  ]

  const tempYear = 2020;
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
    <Grid.Row 
      style={{padding:"0", margin:"0.25em 0.25em"}} 
      key={i}
    >
      <Grid.Column width={2}>
        <text  
          fontSize="120%" 
        >
          {months[i]}
        </text>
      </Grid.Column>

      <Grid.Column width={14}>
        <div style={{display:"flex"}}>
          {_.times(days[i], (j) => (
            <Hexagon display={j+1}/>
          ))}
        </div>    
      </Grid.Column>
    </Grid.Row>
   ));


  /* const rows = _.times(12, (i) => (
    <Grid.Row key={i}>
      {_.times(days[i], (j) => (
        <Grid.Column key={j}>
          <Hexagon/>
        </Grid.Column>
      ))}
    </Grid.Row>
  )); */

  return (<Grid style={{marginBottom:"1em"}}>{rows}</Grid>);
};

export default HabitBoard;