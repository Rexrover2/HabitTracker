import ReactHexagon from 'react-hexagon';
import React, { useState, useRef } from 'react';
import { BoardData } from './HabitBoard';
import _ from 'lodash';

interface Props {
  id: string;
  initState: boolean;
  style?: object;
  habit: number;
  display: number;
  board: BoardData[];
  setBoard: React.Dispatch<React.SetStateAction<BoardData[]>>;
}

const Hexagon = ({ id, habit, setBoard, board, ...props }: Props) => {
  // const didMountRef = useRef(false);
  const [selected, setSelected] = useState<boolean>(props.initState);

  const toggle = (selected: boolean, board: BoardData[]) => {
    if (!selected) {
      const newArr: BoardData[] = board.slice();
      newArr[habit][id] = true;
      setBoard(newArr);
      console.log(id + 'on');
    } else {
      const newArr: BoardData[] = board.slice();
      delete newArr[habit][id];
      setBoard(newArr);
      console.log(id + 'off');
    }
  };
  const toggle_throttled = useRef(
    _.throttle((selected, board) => toggle(selected, board), 500, {
      trailing: true,
    })
  );

  const handleClick = () => {
    setSelected(!selected);
    toggle_throttled.current(selected, board);
  };
  // const id: string = `${props.display}-${props.month + 1}-2020`;

  const colourScheme = {
    unselected: {
      stroke: '#ffffcc',
      fill: '#f7e6d4',
    },
    selected: {
      stroke: '#ffff1a',
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
          padding: '0.3em',
          ...(selected ? colourScheme.selected : colourScheme.unselected),
          strokeWidth: 50,
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

export default Hexagon;
