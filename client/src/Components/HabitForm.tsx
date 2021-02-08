import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';

import 'react-datepicker/dist/react-datepicker.css';
import {
  Button,
  Dropdown,
  DropdownItemProps,
  Form,
  Modal,
} from 'semantic-ui-react';
import { createHabitbyUser } from '../middleware/api';

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

/* interface InputData {
  habitName: string;
  iconNo: number;
  streakGoal: string;
  dateStarted: Date;
  dateEnded?: Date;
} */

interface Props {
  updateData: React.Dispatch<React.SetStateAction<boolean>>;
  user: string;
  habits: any;
}

export const NewHabitForm = ({ user, updateData, habits }: Props) => {
  const [opened, setOpen] = useState<boolean>(false);
  const username = useRef<string>(user);
  const [icon, setIcon] = useState<number>(0); // Required to set displayed icon!

  const isUnique = (habitName: string) => {
    console.log('HI');
    for (let inst in habits) {
      if (habitName === habits[inst].name) {
        return false;
      }
    }
    return true;
  };

  const clearInputs = () => {
    setIcon(0);
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
  };

  interface HabitData {
    habitName: string;
    iconNo: number;
    dateStarted: Date;
    dateEnded?: Date;
    streakGoal?: string;
  }

  const { register, errors, handleSubmit, control } = useForm();
  const onSubmit = ({
    habitName,
    streakGoal,
    dateStarted,
    dateEnded,
    ...props
  }: HabitData) => {
    const strDateStarted = formatDate(dateStarted);
    const strDateEnded =
      dateEnded !== undefined ? formatDate(dateEnded) : undefined;
    const numStreakGoal =
      streakGoal !== undefined ? parseInt(streakGoal) : null;
    console.log(
      'submit',
      props,
      habitName,
      icon,
      numStreakGoal,
      strDateStarted,
      strDateEnded,
      username.current
    );
    createHabitbyUser(username.current, {
      name: habitName,
      iconNo: icon + 1,
      dateStarted: strDateStarted,
      dateEnded: strDateEnded,
      streakGoal: numStreakGoal,
    }).then(() => updateData(true));
    setOpen(false);
  };

  const dropDownItems = myIcons.map((icon: any, i: number) => (
    <Dropdown.Item
      key={i}
      icon={icon}
      value={icon}
      onClick={(e, data: DropdownItemProps) => {
        setIcon(i);
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
            {errors.habitName && errors.habitName.type === 'required' && (
              <text style={{ color: 'red' }}>{'   *'}</text>
            )}
            {errors.habitName && errors.habitName.type === 'maxLength' && (
              <text style={{ color: 'red' }}>
                {'     The name is too long!'}
              </text>
            )}
            {errors.habitName && errors.habitName.type === 'validate' && (
              <text style={{ color: 'red' }}>
                {'     Please enter a unique name :D'}
              </text>
            )}
          </label>
          <input
            ref={register({
              required: true,
              maxLength: 50,
              validate: isUnique,
            })}
            name="habitName"
            placeholder="Habit Name"
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
            Streak Goal (Days - Optional)
            {errors.streakGoal && (
              <text style={{ color: 'red' }}>
                {'   * Please enter numbers greater than 0'}
              </text>
            )}
          </label>

          <input
            ref={register({ pattern: /^[1-9]([0-9]*)$/ })}
            name="streakGoal"
            placeholder="30"
          />
        </Form.Field>
        <Form.Group>
          <Form.Field>
            <label>
              Date Started{' '}
              {errors.dateStarted && (
                <text style={{ color: 'red' }}>{'   *'}</text>
              )}
            </label>
            <Controller
              defaultValue={null}
              control={control}
              register={register}
              name="dateStarted"
              render={({ onChange, value }) => (
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selected={value}
                  // excludeDates={[new Date(), subDays(new Date(), 1)]}
                  placeholderText="Select a date"
                  onChange={onChange}
                  isClearable
                />
              )}
              rules={{ required: true }}
            />
          </Form.Field>
          <Form.Field>
            <label>Date Ended</label>
            <Controller
              defaultValue={null}
              control={control}
              register={register}
              name="dateEnded"
              render={({ onChange, value }) => (
                <DatePicker
                  dateFormat="yyyy-MM-dd"
                  selected={value}
                  // excludeDates={[new Date(), subDays(new Date(), 1)]}
                  placeholderText="Select a date"
                  onChange={onChange}
                  isClearable
                />
              )}
            />
          </Form.Field>
        </Form.Group>

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
