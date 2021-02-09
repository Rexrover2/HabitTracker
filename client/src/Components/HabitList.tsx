import React from 'react';
import { List, Icon, Segment, Header } from 'semantic-ui-react';
import ConfirmDelete from './DeleteConfirmation';
import HabitForm from './HabitForm';

interface HListProps {
  data: Habit[];
  updateData: React.Dispatch<React.SetStateAction<boolean>>;
  user: string;
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

const HabitList = ({ data, updateData, user }: HListProps) => {
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
  if (listItems.length > 0) {
    return (
      <div>
        <Segment>
          <List divided relaxed>
            {listItems}
          </List>
        </Segment>
        <HabitForm updateData={updateData} user={user} habits={data} />
      </div>
    );
  } else {
    // Add place holder as there are no habits created
    return (
      <Segment placeholder /* style={{ width: 'auto' }} */>
        <Header icon style={{ margin: '3vh 3vw' }}>
          <Icon name="paper plane" />
          Get started on a habit here!
        </Header>
        <HabitForm updateData={updateData} user={user} habits={data} />
      </Segment>
    );
  }
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
              {`Streak Goal: `}
              {props.streakGoal
                ? props.streakGoal > 1
                  ? `${props.streakGoal} days`
                  : `${props.streakGoal} day`
                : 'none'}
            </List.Description>
          </List.Item>
          <List.Item>
            <List.Description key="Day Started">
              {`Date Started: ${formatDate(props.dateStarted)}`}
            </List.Description>
          </List.Item>
          <List.Item>
            <List.Description key="Day Ended">
              {props.dateEnded &&
              formatDate(props.dateEnded) !== '01/01/1970' &&
              formatDate(props.dateEnded) !== '31/12/1969'
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
