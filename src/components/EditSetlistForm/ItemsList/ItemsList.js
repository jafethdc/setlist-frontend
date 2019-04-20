import React, { useState, useEffect, useCallback } from 'react';
import uuid from 'uuid/v1';
import PropTypes from 'prop-types';
import { Button, Control, DropdownItem, Field, Icon } from 'bloomer';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import BasicDropdown from '../../BasicDropdown';
import ItemInput from '../ItemInput';
import arrToObj from '../../../lib/arrToObj';
import reorder from '../../../lib/reorder';

const types = ['set', 'tape', 'track'];

const ItemsList = ({ items, onChange, defaultValues, artistId, errors }) => {
  const [_defaultValues, _setDefaultValues] = useState(
    arrToObj(defaultValues, 'id')
  );

  useEffect(() => _setDefaultValues(arrToObj(defaultValues, 'id')), [
    defaultValues,
  ]);

  const addItem = type =>
    onChange(_items => [..._items, { type, _id: uuid() }]);

  const updateItem = useCallback(
    (i, item) =>
      onChange(_items => [..._items.slice(0, i), item, ..._items.slice(i + 1)]),
    [onChange]
  );

  const removeItem = useCallback(
    i => onChange(_items => [..._items.slice(0, i), ..._items.slice(i + 1)]),
    [onChange]
  );

  const reorderItems = ({ source, destination }) => {
    if (!destination) return;
    onChange(_items => reorder(_items, source.index, destination.index));
  };

  return (
    <>
      <DragDropContext onDragEnd={reorderItems}>
        <Droppable droppableId="setlistItems">
          {droppableProvided => (
            <div
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              {items.map((item, index) => (
                <Draggable
                  key={item.id || item._id}
                  draggableId={item.id || item._id}
                  index={index}
                >
                  {draggableProvided => (
                    <ItemInput
                      index={index}
                      value={item}
                      error={errors ? errors[index] : undefined}
                      artistId={artistId}
                      onChange={updateItem}
                      onRemove={removeItem}
                      defaultValue={_defaultValues[item.id]}
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
            {({ setActive }) => (
              <>
                {types.map(type => (
                  <DropdownItem
                    key={type}
                    className="hoverable"
                    onClick={() => {
                      addItem(type);
                      setActive(false);
                    }}
                  >
                    {type}
                  </DropdownItem>
                ))}
              </>
            )}
          </BasicDropdown>
        </Control>
      </Field>
    </>
  );
};

ItemsList.propTypes = {
  items: PropTypes.array,
  onChange: PropTypes.func,
  defaultValues: PropTypes.array,
  artistId: PropTypes.number,
  errors: PropTypes.array,
};

export default ItemsList;
