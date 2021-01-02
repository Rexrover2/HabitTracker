import React, { useState } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { deleteHabitById } from '../middleware/api';

interface Props {
  name: string;
  hid: number;
  icon: any;
  updateData: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmDelete = ({ name, hid, icon, updateData }: Props) => {
  const [opened, setOpen] = useState<boolean>(false);

  return (
    <Modal
      size="large"
      open={opened}
      onClose={() => setOpen(false)}
      trigger={
        <Button
          inverted
          color="red"
          icon="trash alternate outline"
          onClick={() => setOpen(true)}
        />
      }
    >
      <Modal.Header>
        {`Delete "${name}" `}
        <Icon name={icon} />
      </Modal.Header>
      <Modal.Content>
        <p>
          Are you sure you want to delete your habit? All your progress will be
          lost!
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button positive onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          negative
          onClick={() => {
            deleteHabitById(`${hid}`, name);
            updateData(true);
            setOpen(false);
          }}
        >
          Confirm Delete
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
export default ConfirmDelete;
