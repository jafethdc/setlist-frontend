import React, { useState } from 'react';
import { Skeleton, List } from 'antd';
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
        if (loading) return <Skeleton active />;
        if (error) return <p>Error:{error.message}</p>;
        return (
          <List
            bordered
            header={<h3>Artist By Setlists</h3>}
            dataSource={data.artists.nodes}
            renderItem={artist => (
              <List.Item>
                {artist.name} - {artist.setlistsCount} setlists
              </List.Item>
            )}
          />
        );
      }}
    </Query>
  );
};

export default PopularArtists;
