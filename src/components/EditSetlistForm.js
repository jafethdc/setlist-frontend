import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Field, Control, Label, TextArea } from 'bloomer';
import ItemsList from './ItemsList';

const validateItem = value => {
  const errors = {};

  if (value.type === 'set' && !value.info) errors.info = 'Info is required';
  if (['track', 'tape'].includes(value.type) && !value.track)
    errors.track = 'Track is required';

  return errors;
};

const validate = values => {
  const errors = {};

  const itemsErrors = values.items.map(validateItem);
  if (itemsErrors.some(err => Object.keys(err).length))
    errors.items = itemsErrors;

  return errors;
};

const EditSetlistForm = ({ initialValues, onSubmit, loading }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => setValues(initialValues), [initialValues]);

  const handleClick = action => () => {
    const { comment, items } = values;
    const newErrors = validate({ comment, items });
    setErrors(newErrors);
    if (!Object.keys(newErrors).length) {
      action(values);
    }
  };

  const updateItems = useCallback(
    setItems =>
      setValues(_values => ({
        ..._values,
        items: setItems(_values.items),
      })),
    []
  );

  return (
    <form>
      <ItemsList
        items={values.items}
        onChange={updateItems}
        defaultValues={initialValues.items}
        artistId={parseInt(initialValues.artist.id)}
        errors={errors.items}
      />

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
          <Button
            isColor="primary"
            disabled={loading}
            onClick={handleClick(onSubmit)}
          >
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
  loading: PropTypes.bool,
};

export default EditSetlistForm;
