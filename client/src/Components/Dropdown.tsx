import { Dropdown as SDropdown, DropdownProps } from 'semantic-ui-react';

interface Props {
  data: Habit[];
  habit: string;
  setHabit: React.Dispatch<React.SetStateAction<string | null>>;
}

interface Habit {
  name: string;
  description?: string;
}

const Dropdown = (props: Props) => {
  const onChange = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    props.setHabit(data.value as string);
  };

  const habitOptions = props.data.map((inst) => ({
    text: inst.name,
    value: inst.name,
  }));
  if (habitOptions.length > 0) {
    return (
      <span>
        Currently viewing entries for{' '}
        <SDropdown
          inline
          placeholder="Habit"
          options={habitOptions}
          value={props.habit}
          onChange={onChange}
        />
      </span>
    );
  } else {
    return null;
  }
};

export default Dropdown;
