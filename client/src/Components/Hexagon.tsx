import ReactHexagon from 'react-hexagon';
import React, { useState, useRef } from 'react';
import { BoardData } from './HabitBoard';
import _ from 'lodash';
import { Popup } from 'semantic-ui-react';
import CommentBox, { CommentModal } from './CommentBox';

interface Props {
  id: string;
  initState: boolean;
  style?: object;
  habit: number;
  display: number;
  board: BoardData[];
  setBoard: React.Dispatch<React.SetStateAction<BoardData[]>>;
  isCommentMode: boolean;
  comment: string | null;
}

const Hexagon = ({
  id,
  habit,
  setBoard,
  board,
  isCommentMode,
  comment,
  ...props
}: Props) => {
  const [selected, setSelected] = useState<boolean>(props.initState);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [myNote, setNote] = useState<string>('');

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
    if (!isCommentMode) {
      setSelected(!selected);
      toggle_throttled.current(selected, board);
    } else {
      setOpen(true);
    }
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
    <Popup
      on="hover"
      size="large"
      style={{ padding: '.416em 0.5em' }}
      disabled={!isCommentMode || myNote.length === 0}
      content={<CommentBox text={myNote} />}
      trigger={
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
              style={{ userSelect: 'none' }}
            >
              {props.display}
            </text>
          </ReactHexagon>
          <CommentModal
            create={myNote.length > 0 ? false : true}
            isOpen={isOpen}
            setOpen={setOpen}
            date={
              '' + props.display + '/' + id.slice(5, 7) + '/' + id.slice(0, 4)
            }
            myNote={myNote}
            setNote={setNote}
          />
        </div>
      }
    />
  );
};

export default Hexagon;
