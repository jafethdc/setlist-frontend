import React, { useState } from 'react';
import { Field, Label, Control, Input, Button, TextArea, Help } from 'bloomer';
import PropTypes from 'prop-types';
import ArtistAutocomplete from './ArtistAutocomplete';
import VenueAutocomplete from './VenueAutocomplete';
import FormErrors from './FormErrors';

const validate = values => {
  const errors = {};
  if (!values.artist) errors.artist = 'Artist is required';
  if (!values.venue) errors.venue = 'Venue is required';
  if (!values.date) errors.date = 'Date is required';
  return errors;
};

const NewSetlistForm = ({
  onSubmit,
  onPreview,
  loading,
  errors: submitErrors,
}) => {
  const [artist, setArtist] = useState(null);
  const [venue, setVenue] = useState(null);
  const [date, setDate] = useState(null);
  const [comment, setComment] = useState(null);
  const [errors, setErrors] = useState({});

  const handleClick = action => () => {
    const newErrors = validate({ artist, venue, date, comment });
    setErrors(newErrors);
    if (!Object.keys(newErrors).length) {
      action({ artist, venue, date, comment });
    }
  };

  return (
    <form>
      <Field>
        <Label>Artist</Label>
        <ArtistAutocomplete
          onChange={() => setArtist(null)}
          onSelect={setArtist}
        />
        {errors.artist && <Help isColor="danger">{errors.artist}</Help>}
      </Field>
      <Field>
        <Label>Venue</Label>
        <VenueAutocomplete
          onChange={() => setVenue(null)}
          onSelect={setVenue}
        />
        {errors.venue && <Help isColor="danger">{errors.venue}</Help>}
      </Field>
      <Field>
        <Label>Event Date</Label>
        <Control>
          <Input
            type="date"
            name="date"
            onChange={event => setDate(event.target.value)}
          />
          {errors.date && <Help isColor="danger">{errors.date}</Help>}
        </Control>
      </Field>
      <Field>
        <Label>Comment</Label>
        <Control>
          <TextArea
            name="comment"
            onChange={event => setComment(event.target.value)}
          />
          {errors.comment && <Help isColor="danger">{errors.comment}</Help>}
        </Control>
      </Field>

      {submitErrors && submitErrors.length > 0 && (
        <FormErrors errors={submitErrors} />
      )}

      <div className="buttons">
        <Button
          isColor="primary"
          disabled={loading}
          onClick={handleClick(onSubmit)}
        >
          Submit
        </Button>

        <Button isColor="secondary" onClick={handleClick(onPreview)}>
          Preview
        </Button>
      </div>
    </form>
  );
};

NewSetlistForm.propTypes = {
  onSubmit: PropTypes.func,
  onPreview: PropTypes.func,
  errors: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
};

export default NewSetlistForm;
