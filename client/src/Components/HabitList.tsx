import React from 'react';
import { List, Header } from 'semantic-ui-react';

const HabitList = () => {
  return (
    <List divided relaxed>
      <ListItem name="Full Stack Project" iconNo={9} />
      <ListItem name="Full Stack Project" iconNo={16} />
      <ListItem name="Full Stack Project" iconNo={13} />
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
      <List.Icon
        name={icons[props.iconNo]}
        size="large"
        verticalAlign="middle"
      />
      <List.Content>
        {/**
         * Total Days: X
         * Current Streak: X
         * Longest Streak: X
         * Day Started: --/–/--
         * */}
        <List horizontal divided>
          <List.Item>
            <Header as="H3">{props.name}</Header>
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
