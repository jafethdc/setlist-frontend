import React, { useState } from 'react';
import { Skeleton, List } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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
  const [first] = useState(5);
  const variables = {
    first,
    orderBy: {
      field: 'ATTENDANCES_COUNT',
      direction: 'DESC',
    },
  };

  return (
    <Query query={TOP_ATTENDED_ARTISTS_QUERY} variables={variables}>
      {({ data, error, loading }) => {
        if (loading) return <Skeleton active />;
        if (error) return <p>Error:{error.message}</p>;
        return (
          <List
            bordered
            header={<h3>Top Attended Artists</h3>}
            dataSource={data.artists.nodes}
            renderItem={artist => (
              <List.Item>
                {artist.name} - {artist.setlistsCount} setlists -{' '}
                {artist.attendancesCount} attendances
              </List.Item>
            )}
          />
        );
      }}
    </Query>
  );
};

export default PopularArtists;
