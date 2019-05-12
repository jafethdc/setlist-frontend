import React from 'react';
import PropTypes from 'prop-types';
import useInfiniteScroll from '../../custom-hooks/useInfiniteScroll';
import SetlistItem from './SetlistItem';

const SetlistsList = ({ items, onLoadMore }) => {
  useInfiniteScroll(onLoadMore);

  return (
    <>
      {items.map(setlist => (
        <SetlistItem key={setlist.id} setlist={setlist} />
      ))}
    </>
  );
};

SetlistsList.propTypes = {
  items: PropTypes.array,
  onLoadMore: PropTypes.func,
};

export default SetlistsList;
