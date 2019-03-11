import React from 'react';
import gql from 'graphql-tag';
import useQuery from '../custom-hooks/useCustomQuery';

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
  const first = 10;
  const { data, loading } = useQuery(TOP_ARTISTS_BY_SETLISTS_QUERY, {
    variables: {
      first,
      orderBy: {
        field: 'SETLISTS_COUNT',
        direction: 'DESC',
      },
    },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="list">
      {data.artists.nodes.map((artist, i) => (
        <div className="list-item" key={i}>
          {artist.name} - {artist.setlistsCount} setlists
        </div>
      ))}
    </div>
  );
};

export default PopularArtists;
