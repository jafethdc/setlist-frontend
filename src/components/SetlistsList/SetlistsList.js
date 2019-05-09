import React from 'react';
import PropTypes from 'prop-types';
import useInfiniteScroll from '../../custom-hooks/useInfiniteScroll';

const SetlistsList = ({ items, onLoadMore }) => {
  useInfiniteScroll(onLoadMore);

  return (
    <>
      {items.map(setlist => (
        <p style={{ fontSize: 30 }} key={setlist.id}>
          {setlist.id} - {setlist.date} - {setlist.artist.name}
        </p>
      ))}
    </>
  );
};

SetlistsList.propTypes = {
  items: PropTypes.array,
  onLoadMore: PropTypes.func,
};

export default SetlistsList;
