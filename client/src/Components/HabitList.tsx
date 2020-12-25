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
  const listItems = props.data.map((instance) => (
    <ListItem
      key={instance.name}
      name={instance.name}
      iconNo={instance.iconNo}
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
