const validateItem = value => {
  const errors = {};

  if (value.type === 'set' && !value.info) errors.info = 'Info is required';
  if (['track', 'tape'].includes(value.type) && !value.track)
    errors.track = 'Track is required';

  return errors;
};

const validate = setlist => {
  const errors = {};

  const itemsErrors = setlist.items.map(validateItem);
  if (itemsErrors.some(err => Object.keys(err).length))
    errors.items = itemsErrors;

  return errors;
};

export default validate;
