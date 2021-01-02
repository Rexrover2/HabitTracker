import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Dropdown,
  DropdownItemProps,
  Form,
  Modal,
} from 'semantic-ui-react';

const myIcons: any[] = [
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

interface Props {
  updateData: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewHabitForm = ({ updateData }: Props) => {
  const [opened, setOpen] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [icon, setIcon] = useState<number>(0);
  const [streakGoal, setStreakGoal] = useState<number | null>(null);
  const [dateStarted, setDateStarted] = useState<string>('');
  const [dateEnded, setDateEnded] = useState<string>('');

  const clearInputs = () => {
    console.log('Close');
    setName('');
    setIcon(0);
    setStreakGoal(null);
    setDateStarted('');
    setDateEnded('');
  };

  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    // console.log('submit', name, icon, streakGoal, dateStarted, dateEnded);
    console.log('submit', data);
  };

  const dropDownItems = myIcons.map((icon: any, i: number) => (
    <Dropdown.Item
      key={i}
      icon={icon}
      value={icon}
      onClick={(e, data: DropdownItemProps) => {
        console.log(data.value);
        setIcon(i);
        // setIcon(myIcons.findIndex((inst) => inst === data.value));
      }}
    />
  ));

  return (
    <Modal
      // size="small"
      as={Form}
      onClose={() => {
        setOpen(false);
        clearInputs();
      }}
      onOpen={() => setOpen(true)}
      open={opened}
      trigger={
        <Button
          icon="add"
          label={{ basic: true, content: 'Add Habit' }}
          labelPosition="right"
        />
      }
      dimmer="inverted"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Modal.Header>Start a new habit</Modal.Header>
      <Modal.Content>
        <Form.Field>
          <label>
            Habit Name{' '}
            {errors.habitName && <text style={{ color: 'red' }}>{'   *'}</text>}
          </label>
          <input
            ref={register({ required: true })}
            name="habitName"
            placeholder="Habit Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Choose Icon</label>
          <Dropdown
            button
            scrolling
            floating
            className="icon"
            ref={register}
            name="iconNo"
            icon={myIcons[icon]}
          >
            <Dropdown.Menu>{dropDownItems}</Dropdown.Menu>
          </Dropdown>
        </Form.Field>
        <Form.Field>
          <label>
            Streak Goal (Days)
            {errors.streakGoal && (
              <text style={{ color: 'red' }}>
                {'   * Please enter a numbers only'}
              </text>
            )}
          </label>

          <input
            ref={register({ required: true, pattern: /^[0-9]+$/ })}
            name="streakGoal"
            placeholder="30"
            onChange={(e) => {
              setStreakGoal(parseInt(e.target.value));
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>
            Date Started{' '}
            {errors.dateStarted && (
              <text style={{ color: 'red' }}>{'   *'}</text>
            )}
          </label>
          <input
            ref={register({ required: true })}
            name="dateStarted"
            placeholder="12-12-2000"
            onChange={(e) => {
              setDateStarted(e.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Date Ended</label>
          <input
            ref={register}
            name="dateEnded"
            placeholder="12-12-2000"
            onChange={(e) => {
              setDateEnded(e.target.value);
            }}
          />
        </Form.Field>
        <label style={{ color: 'red' }}>
          {(errors.dateStarted || errors.streakGoal || errors.habitName) &&
            'Invalid inputs please try again :)'}
        </label>
      </Modal.Content>
      <Modal.Actions>
        <Button
          type="button"
          color="black"
          onClick={() => {
            clearInputs();
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button ref={register} color="green" type="submit">
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default NewHabitForm;
