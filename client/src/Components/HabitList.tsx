import React from 'react';
import { List, Header, Icon, Button } from 'semantic-ui-react';
import ConfirmDelete from './DeleteConfirmation';

interface HListProps {
  data: Habit[];
  updateData: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Habit {
  name: string;
  iconNo: number;
  hid: number;
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
  /* daysCompleted: number;
  currentStreak: number;
  dayStarted: string;
  isGoalComplete?: boolean;
  dayEnded?: string; */
  updateData: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListItem = (props: Props) => {
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
        <List horizontal divided>
          <List.Item>
            <Header as="h3">{props.name}</Header>
          </List.Item>
          <List.Item>
            <List.Description as="a">Updated 22 mins ago</List.Description>
          </List.Item>
          <List.Item>
            <List.Description>Read 10 mins ago</List.Description>{' '}
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
