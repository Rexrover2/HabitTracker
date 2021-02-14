import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Header, Modal } from 'semantic-ui-react';

interface Props {
  text: string;
}

interface CommentModalProps {
  create: boolean;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  date: string;
  myNote: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
}

interface submitData {
  note: string;
}

export const CommentModal = ({
  create,
  isOpen,
  setOpen,
  myNote,
  setNote,
  date,
}: CommentModalProps) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = ({ note }: submitData) => {
    setNote(note);
    if (myNote.length > 0 && note.length === 0) {
      // Call Axios Function here to post null as note back to DB
    }
    setOpen(false);
  };

  const onCancel = () => {
    setOpen(false);
    console.log('Closed');
  };
  useEffect(() => {
    console.log(create || myNote.length > 0);
  }, [create, myNote]);
  return (
    <Modal
      size="small"
      as={Form}
      closeOnDimmerClick={false}
      onClose={onCancel}
      onOpen={() => setOpen(true)}
      open={isOpen}
      dimmer="inverted"
    >
      <Modal.Header>
        {create && myNote.length === 0
          ? 'Create new note'
          : `Viewing note logged on ${date}`}
      </Modal.Header>
      <Modal.Content>
        <Form.Field>
          <textarea
            id="note"
            name="note"
            ref={register}
            placeholder="Log your notes here"
            defaultValue={myNote}
          />
          {errors.note && (
            <text style={{ color: 'red' }}>
              {'You cant submit without typing something'}
            </text>
          )}
        </Form.Field>
      </Modal.Content>
      <Modal.Actions>
        <Button
          type="button"
          color="black"
          onClick={handleSubmit(() => {
            setOpen(false);
          })}
        >
          Cancel
        </Button>
        <Button type="button" color="green" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const CommentBox = ({ text }: Props) => {
  return (
    <>
      <div
        style={{
          minWidth: '20vw',
          maxWidth: '45vw',
          maxHeight: '40vh',
          overflowY: 'scroll',
          padding: '0.3em',
        }}
      >
        <p style={{ fontSize: '1.2  em' }}>{text}</p>
      </div>
      <Header as="h6">Click hexagon to edit note</Header>
    </>
  );
};

export default CommentBox;