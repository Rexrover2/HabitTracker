import { Dropdown as SDropdown } from 'semantic-ui-react';

interface Props {
  data: Habit[];
}

interface Habit {
  name: string;
  description?: string;
}

const Dropdown = (props: Props) => {
  const habitOptions = props.data.map((inst, key) => ({
    key: key,
    text: inst.name,
    value: inst.name,
  }));

  return (
    // prettier-ignore
    <span>
      Currently viewing entries for  {' '}
      <SDropdown
        inline
        placeholder='Habit'
        options={habitOptions}  
        defaultValue={habitOptions[0].value}
      />
    </span>
  );
};

export default Dropdown;
