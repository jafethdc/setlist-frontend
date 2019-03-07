import React, { useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const TOP_ARTISTS_BY_SETLISTS_QUERY = gql`
  query TOP_ARTISTS_BY_SETLISTS_QUERY($first: Int, $orderBy: ArtistOrder) {
    artists(first: $first, orderBy: $orderBy) {
      nodes {
        id
        name
        setlistsCount
      }
    }
  }
`;

const PopularArtists = () => {
  const [first] = useState(10);
  const variables = {
    first,
    orderBy: {
      field: 'SETLISTS_COUNT',
      direction: 'DESC',
    },
  };

  return (
    <Query query={TOP_ARTISTS_BY_SETLISTS_QUERY} variables={variables}>
      {({ data, error, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error:{error.message}</p>;
        return (
          <div className="list">
            {data.artists.nodes.map((artist, i) => (
              <div className="list-item" key={i}>
                {artist.name} - {artist.setlistsCount} setlists
              </div>
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default PopularArtists;
