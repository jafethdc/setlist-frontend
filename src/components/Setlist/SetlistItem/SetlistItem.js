import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'bloomer';
import { Link } from 'react-router-dom';

const SetlistItem = ({
  item: { type, track, info, isCover, featuringArtist },
}) => {
  const title = type === 'set' ? info : track.name;

  return (
    <div className={`setlist-item setlist-${type}`}>
      <div className="setlist-item-title">
        {type === 'tape' && (
          <>
            <Icon className="fa fa-volume-up" isSize="small" />
            &nbsp;
          </>
        )}
        {title}
      </div>

      {type !== 'set' && (isCover || info || featuringArtist) && (
        <div className="setlist-item-subtitle">
          {featuringArtist && (
            <>
              (
              <Link to={`/artists/${featuringArtist.id}`}>
                {featuringArtist.name}
              </Link>
              &nbsp;cover)
            </>
          )}
          &nbsp;
          {isCover && (
            <>
              (with&nbsp;
              <Link to={`/artists/${track.medium.release.artist.id}`}>
                {track.medium.release.artist.name}
              </Link>
              )
            </>
          )}
          &nbsp;
          {info && `(${info})`}
        </div>
      )}
    </div>
  );
};

SetlistItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default SetlistItem;
