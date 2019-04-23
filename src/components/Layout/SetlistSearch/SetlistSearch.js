import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Control, Field, Icon, Input } from 'bloomer';

const keyCodes = {
  enter: 13,
  upArrow: 38,
  downArrow: 40,
};

const SetlistSearch = ({ onSubmit }) => {
  const [term, setTerm] = useState('');

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
  onSubmit: PropTypes.func,
};

export default SetlistSearch;
