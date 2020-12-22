import { Dropdown as SDropdown, DropdownProps } from 'semantic-ui-react';

interface Props {
  data: Habit[];
  setHabit: React.Dispatch<React.SetStateAction<string>>;
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
    console.log(data.value);
  };

  const habitOptions = props.data.map((inst, key) => ({
    key: key,
    text: inst.name,
    value: inst.name,
  }));

  return (
    <span>
      Currently viewing entries for{' '}
      <SDropdown
        inline
        placeholder="Habit"
        options={habitOptions}
        defaultValue={habitOptions[0].value}
        onChange={onChange}
      />
    </span>
  );
};

export default Dropdown;
