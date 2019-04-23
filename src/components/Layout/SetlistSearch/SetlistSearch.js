import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Control, Field, Icon, Input } from 'bloomer';

const keyCodes = {
  enter: 13,
  upArrow: 38,
  downArrow: 40,
};

const SetlistSearch = ({ initialValue, onSubmit }) => {
  const [term, setTerm] = useState(initialValue);

  useEffect(() => setTerm(initialValue), [initialValue]);

  const handleKeyDown = ({ keyCode }) => {
    switch (keyCode) {
      case keyCodes.enter:
        onSubmit(term);
        break;
      default:
    }
  };

  return (
    <Field className="search-setlists">
      <Control hasIcons="right">
        <Input
          type="text"
          value={term}
          placeholder="Artist, venue, tour"
          onChange={e => setTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="is-rounded"
        />
        <Icon isSize="small" isAlign="right" className="fa fa-search" />
      </Control>
    </Field>
  );
};

SetlistSearch.propTypes = {
  initialValue: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default SetlistSearch;
