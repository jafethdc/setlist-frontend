import React from 'react';
import gql from 'graphql-tag';
import useQuery from '../custom-hooks/useCustomQuery';

const TOP_ATTENDED_ARTISTS_QUERY = gql`
  query TOP_ATTENDED_ARTISTS_QUERY($first: Int, $orderBy: ArtistOrder) {
    artists(first: $first, orderBy: $orderBy) {
      nodes {
        id
        name
        attendancesCount
        setlistsCount
      }
    }
  }
`;

const PopularArtists = () => {
  const first = 5;
  const { data, loading } = useQuery(TOP_ATTENDED_ARTISTS_QUERY, {
    variables: {
      first,
      orderBy: {
        field: 'ATTENDANCES_COUNT',
        direction: 'DESC',
      },
    },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="list">
      {data.artists.nodes.map((artist, i) => (
        <div className="list-item" key={i}>
          {artist.name} - {artist.setlistsCount} setlists -{' '}
          {artist.attendancesCount} attendances
        </div>
      ))}
    </div>
  );
};

export default PopularArtists;
