import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Field,
  FieldLabel,
  FieldBody,
  Checkbox,
  Control,
  Icon,
  Input,
  Label,
  Button,
  DropdownItem,
  Tag,
} from 'bloomer';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ArtistAutocomplete from './ArtistAutocomplete';
import TrackAutocomplete from './TrackAutocomplete';
import CustomDropdown from './CustomDropdown';

const SetlistItemInput = forwardRef(
  ({ value, onChange, artistId, defaultValue, ...rest }, ref) => (
    <div className="field is-horizontal" ref={ref} {...rest}>
      <FieldLabel isNormal>
        <Label>
          <Tag isColor="light">{value.type}</Tag>
        </Label>
      </FieldLabel>

      <FieldBody>
        {value.type !== 'set' && (
          <Field hasAddons>
            <Control>
              <Button isStatic>Track</Button>
            </Control>
            <Control isExpanded>
              <TrackAutocomplete
                onChange={() => onChange({ ...value, track: null })}
                onSelect={track => onChange({ ...value, track })}
                artistId={value.isCover ? undefined : artistId}
                initialValue={defaultValue.track.name}
              />
            </Control>
          </Field>
        )}

        <Field hasAddons>
          <Control>
            <Button isStatic>Info</Button>
          </Control>
          <Control isExpanded>
            <Input
              type="text"
              name="input"
              value={value.info || ''}
              onChange={e => onChange({ ...value, info: e.target.value })}
            />
          </Control>
        </Field>

        {value.type === 'track' && (
          <Field hasAddons>
            <Control>
              <Button isStatic>Ft.</Button>
            </Control>
            <Control isExpanded>
              <ArtistAutocomplete
                onChange={() => onChange({ ...value, featuringArtist: null })}
                onSelect={featuringArtist =>
                  onChange({ ...value, featuringArtist })
                }
                initialValue={
                  defaultValue.featuringArtist
                    ? defaultValue.featuringArtist.name
                    : ''
                }
              />
            </Control>
          </Field>
        )}

        <Field>
          <Control>
            <CustomDropdown
              trigger={
                <Button isOutlined>
                  <Icon className="fa fa-angle-down" isSize="small" />
                </Button>
              }
            >
              {value.type !== 'set' && (
                <DropdownItem>
                  <Field>
                    <Control>
                      <Checkbox
                        checked={value.isCover}
                        onChange={e =>
                          onChange({ ...value, isCover: e.target.checked })
                        }
                      >
                        {' '}
                        Is cover?
                      </Checkbox>
                    </Control>
                  </Field>
                </DropdownItem>
              )}
              <DropdownItem href="#">Delete</DropdownItem>
            </CustomDropdown>
          </Control>
        </Field>
      </FieldBody>
    </div>
  )
);

SetlistItemInput.displayName = 'SetlistItemInput';

SetlistItemInput.propTypes = {
  value: PropTypes.shape({
    type: PropTypes.string.isRequired,
    track: PropTypes.object,
    info: PropTypes.string,
    featuringArtist: PropTypes.object,
    isCover: PropTypes.bool,
  }),
  artistId: PropTypes.number,
  onChange: PropTypes.func,
  defaultValue: PropTypes.object,
};

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

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
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
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {draggableProvided => (
                    <SetlistItemInput
                      key={item.id}
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

      <Button isColor="primary" onClick={() => onSubmit(values)}>
        Submit
      </Button>
    </form>
  );
};

EditSetlistForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default EditSetlistForm;
