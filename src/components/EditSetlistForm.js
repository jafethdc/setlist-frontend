import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Field, Control, Label, TextArea } from 'bloomer';
import ItemsList from './ItemsList';

const EditSetlistForm = ({ initialValues, onSubmit }) => {
  const [values, setValues] = useState(initialValues);

  useEffect(() => setValues(initialValues), [initialValues]);

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
