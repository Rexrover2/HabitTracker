import React from 'react';
import { List, Icon } from 'semantic-ui-react';
import ConfirmDelete from './DeleteConfirmation';

interface HListProps {
  data: Habit[];
  updateData: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Habit {
  name: string;
  iconNo: number;
  hid: number;
  dateEnded: string;
  dateStarted: string;
  streakGoal: number;
  updateData: React.Dispatch<React.SetStateAction<boolean>>;
}

const HabitList = ({ data, updateData }: HListProps) => {
  const listItems = data.map((instance) => (
    <ListItem
      key={instance.name}
      name={instance.name}
      iconNo={instance.iconNo - 1}
      hid={instance.hid}
      updateData={updateData}
      dateStarted={instance.dateStarted}
      dateEnded={instance.dateEnded}
      streakGoal={instance.streakGoal}
    />
  ));
  return (
    <List divided relaxed>
      {listItems}
    </List>
  );
};

interface Props {
  children?: React.ReactNode;
  iconNo: any;
  name: string;
  hid: number;
  streakGoal: number;
  // daysCompleted: string;
  // currentStreak: number;
  dateStarted: string;
  isGoalComplete?: boolean;
  dateEnded?: string;
  updateData: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListItem = (props: Props) => {
  const formatDate = (date: string) => {
    const year: string = date.slice(0, 4);
    const month: string = date.slice(5, 7);
    const day: string = date.slice(8, 10);
    console.log(date, day + '/' + month + '/' + year);
    return day + '/' + month + '/' + year;
  };

  return (
    <List.Item>
      <List.Content floated="right" /* style={{ textAlign: 'initial' }} */>
        <ConfirmDelete
          name={props.name}
          hid={props.hid}
          icon={icons[props.iconNo]}
          updateData={props.updateData}
        />
      </List.Content>
      <Icon
        name={icons[props.iconNo]}
        size="large" /* style={{ width: '20px' }} */
      />
      <List.Content style={{ textAlign: 'initial' }}>
        {/**
         * Total Days: X
         * Current Streak: X
         * Longest Streak: X
         * Day Started: --/–/--
         * */}
        <List horizontal>
          {/* <List.Item>
            <Header as="h3">{props.name}</Header>
          </List.Item> */}
          <List.Header as="h3">{props.name}</List.Header>
          <List.Item>
            <List.Description key="Streak Goal">
              {`Streak Goal: ${props.streakGoal} `}
              {props.streakGoal > 1 ? 'days' : 'day'}
            </List.Description>
          </List.Item>
          <List.Item>
            <List.Description key="Day Started">
              {`Date Started: ${formatDate(props.dateStarted)}`}
            </List.Description>
          </List.Item>
          <List.Item>
            <List.Description key="Day Ended">
              {props.dateEnded && formatDate(props.dateEnded) !== '31/12/1969'
                ? `Day Ended: ${formatDate(props.dateEnded)}`
                : 'Ongoing'}
            </List.Description>
          </List.Item>
        </List>
      </List.Content>
    </List.Item>
  );
};

const icons: any[] = [
  'book', //0
  'briefcase',
  'bullhorn',
  'certificate',
  'coffee',
  'copyright', //5
  'globe',
  'pencil alternate',
  'chess',
  'code branch',
  'user secret', //10
  'comments',
  'language',
  'power off',
  'headphones',
  'money bill alternate', //15
  'calendar alternate',
  'paint brush',
  'tint',
  'superscript',
  'venus mars', //20
  'transgender alternate',
  'hand lizard',
  'handshake',
  'stethoscope',
  'heart', //25
];

export default HabitList;
