import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v1';
import PropTypes from 'prop-types';
import {
  Button,
  Field,
  Control,
  Label,
  TextArea,
  Icon,
  DropdownItem,
} from 'bloomer';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SetlistItemInput from './SetlistItemInput';
import reorder from '../lib/reorder';
import BasicDropdown from './BasicDropdown';

const EditSetlistForm = ({ initialValues, onSubmit }) => {
  const [values, setValues] = useState(initialValues);

  useEffect(() => setValues(initialValues), [initialValues]);

  const handleChange = index => setlistItem =>
    setValues({
      ...values,
      items: [
        ...values.items.slice(0, index),
        setlistItem,
        ...values.items.slice(index + 1),
      ],
    });

  const addItem = type => setDropdownActive => () => {
    setValues({
      ...values,
      items: [...values.items, { type, _id: uuid() }],
    });
    setDropdownActive(false);
  };

  const onDragEnd = result => {
    if (!result.destination) return;

    setValues({
      ...values,
      items: reorder(
        values.items,
        result.source.index,
        result.destination.index
      ),
    });
  };

  return (
    <form>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="setlistItems">
          {droppableProvided => (
            <div
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              {values.items.map((item, index) => (
                <Draggable
                  key={item.id || item._id}
                  draggableId={item.id || item._id}
                  index={index}
                >
                  {draggableProvided => (
                    <SetlistItemInput
                      value={item}
                      artistId={parseInt(initialValues.artist.id)}
                      onChange={handleChange(index)}
                      defaultValue={initialValues.items.find(
                        ({ id }) => id === item.id
                      )}
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    />
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Field>
        <Control>
          <BasicDropdown
            trigger={
              <Button isOutlined>
                Add Item &nbsp;
                <Icon className="fa fa-angle-down" isSize="small" />
              </Button>
            }
          >
            {({ setDropdownActive }) => (
              <>
                <DropdownItem
                  className="hoverable"
                  onClick={addItem('set')(setDropdownActive)}
                >
                  Set
                </DropdownItem>
                <DropdownItem
                  className="hoverable"
                  onClick={addItem('track')(setDropdownActive)}
                >
                  Track
                </DropdownItem>
                <DropdownItem
                  className="hoverable"
                  onClick={addItem('tape')(setDropdownActive)}
                >
                  Tape
                </DropdownItem>
              </>
            )}
          </BasicDropdown>
        </Control>
      </Field>

      <Field>
        <Label>Edit comment</Label>
        <Control>
          <TextArea
            onChange={event =>
              setValues({ ...values, comment: event.target.value })
            }
          />
        </Control>
      </Field>

      <Field>
        <Control>
          <Button isColor="primary" onClick={() => onSubmit(values)}>
            Submit
          </Button>
        </Control>
      </Field>
    </form>
  );
};

EditSetlistForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default EditSetlistForm;
