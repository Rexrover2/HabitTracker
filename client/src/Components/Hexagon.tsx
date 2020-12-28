import ReactHexagon from 'react-hexagon';
import React, { useState, useEffect, useRef } from 'react';
import { BoardData } from './HabitBoard';

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

  const handleClick = () => {
    setSelected(!selected);
    if (!selected) {
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
  };
  // const id: string = `${props.display}-${props.month + 1}-2020`;

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

  /*   useEffect(() => {
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
  }, [selected, habit, setBoard, id]); */

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

export default Hexagon;
