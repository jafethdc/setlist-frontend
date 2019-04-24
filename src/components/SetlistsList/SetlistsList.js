import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const SetlistsList = ({ items, onLoadMore }) => {
  const loadMoreSetlists = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      onLoadMore();
    }
  }, [onLoadMore]);

  useEffect(() => {
    window.addEventListener('scroll', loadMoreSetlists);
    return () => window.removeEventListener('scroll', loadMoreSetlists);
  }, [loadMoreSetlists]);

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
