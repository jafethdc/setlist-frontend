import React from 'react';
import PropTypes from 'prop-types';

const SetlistItem = ({ item: { type, track, info } }) => {
  let content = '';
  if (type === 'set') content = info;
  else content = track.name;

  return (
    <div>
      {type} - {content}
    </div>
  );
};

SetlistItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default SetlistItem;
