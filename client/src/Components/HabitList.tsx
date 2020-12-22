import React from 'react';
import { List, Header, Icon } from 'semantic-ui-react';

interface HListProps {
  data: Habit[];
}

interface Habit {
  name: string;
  iconNo: number;
}

const HabitList = (props: HListProps) => {
  const listItems = props.data.map((instance, key) => (
    <ListItem key={key} name={instance.name} iconNo={instance.iconNo} />
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
}

const ListItem = (props: Props) => {
  return (
    <List.Item>
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
