import React, { useState } from 'react';
import { Field, Label, Control, Input, Button, TextArea, Help } from 'bloomer';
import PropTypes from 'prop-types';
import ArtistAutocomplete from './ArtistAutocomplete';
import VenueAutocomplete from './VenueAutocomplete';
import FormErrors from './FormErrors';

const validate = values => {
  const errors = {};
  if (!values.artistId) errors.artistId = 'Artist is required';
  if (!values.venueId) errors.venueId = 'Venue is required';
  if (!values.date) errors.date = 'Date is required';
  return errors;
};

const NewSetlistForm = ({ onSubmit, loading, errors: submitErrors }) => {
  const [artistId, setArtistId] = useState(null);
  const [venueId, setVenueId] = useState(null);
  const [date, setDate] = useState(null);
  const [comment, setComment] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = values => {
    const newErrors = validate(values);
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    } else {
      onSubmit(values);
    }
  };

  return (
    <form>
      <Field>
        <Label>Artist</Label>
        <ArtistAutocomplete
          onChange={() => setArtistId(null)}
          onSelect={artist => setArtistId(parseInt(artist.id))}
        />
        {errors.artistId && <Help isColor="danger">{errors.artistId}</Help>}
      </Field>
      <Field>
        <Label>Venue</Label>
        <VenueAutocomplete
          onChange={() => setVenueId(null)}
          onSelect={venue => setVenueId(parseInt(venue.id))}
        />
        {errors.venueId && <Help isColor="danger">{errors.venueId}</Help>}
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

      <Button
        isColor="primary"
        disabled={loading}
        onClick={() => handleSubmit({ artistId, venueId, date, comment })}
      >
        Submit
      </Button>
    </form>
  );
};

NewSetlistForm.propTypes = {
  onSubmit: PropTypes.func,
  errors: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
};

export default NewSetlistForm;
