import React from 'react';
import { List, Header } from 'semantic-ui-react';

interface HListProps {
  data: Habit[];
}

interface Habit {
  name: string;
  iconNo: number;
  daysCompleted: number;
  currentStreak: number;
  dayStarted: string;
  isGoalComplete?: boolean;
  dayEnded?: string;
}

const HabitList = (props: HListProps) => {
  const listItems = props.data.map((instance) => (
    <ListItem
      name={instance.name}
      iconNo={instance.iconNo}
      daysCompleted={instance.daysCompleted}
      currentStreak={instance.currentStreak}
      dayStarted={instance.dayStarted}
      isGoalComplete={instance.isGoalComplete}
      dayEnded={instance.dayEnded}
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
  daysCompleted: number;
  currentStreak: number;
  dayStarted: string;
  isGoalComplete?: boolean;
  dayEnded?: string;
}

const ListItem = (props: Props) => {
  return (
    <List.Item>
      <List.Icon
        name={icons[props.iconNo]}
        size="large"
        verticalAlign="middle"
        style={{ paddingRight: '1em' }}
      />
      <List.Content style={{ textAlign: 'initial' }}>
        <List horizontal divided>
          <List.Item>
            <Header as="H3">{props.name}</Header>
          </List.Item>
          <List.Item>
            <List.Description as="a">
              Total Days completed: {props.daysCompleted}
            </List.Description>
          </List.Item>
          <List.Item>
            <List.Description>
              Current streak: {props.currentStreak}
            </List.Description>
          </List.Item>
          <List.Item>
            <List.Description>Day started: {props.dayStarted}</List.Description>
          </List.Item>
          <List.Item>
            <List.Description>
              Streak goal broken: {props.isGoalComplete ? 'yes' : 'no'}
            </List.Description>
          </List.Item>
          {props.dayEnded ? (
            <List.Item>
              <List.Description>Day ended: {props.dayEnded}</List.Description>
            </List.Item>
          ) : null}
        </List>
      </List.Content>
    </List.Item>
  );
};

const icons: any[] = [
  'book',
  'briefcase',
  'bullhorn',
  'certificate',
  'coffee',
  'copyright',
  'globe',
  'pencil alternate',
  'chess',
  'code branch',
  'user secret',
  'comments',
  'language',
  'power off',
  'headphones',
  'money bill alternate',
  'calendar alternate',
  'paint brush',
  'tint',
  'superscript',
  'venus mars',
  'transgender alternate',
  'hand lizard',
  'handshake',
  'stethoscope',
  'heart',
];

export default HabitList;
