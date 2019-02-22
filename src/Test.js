import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const ALL_ARTISTS_QUERY = gql`
  query ALL_ARTISTS_QUERY {
    artists {
      id
      name
      type {
        name
      }
    }
  }
`;

const Test = () => {
  return (
    <Query query={ALL_ARTISTS_QUERY}>
      {({ data, error, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error:{error.message}</p>;
        return (
          <ul>
            {data.artists.map(({ id, name }) => (
              <div key={id}>{name}</div>
            ))}
          </ul>
        );
      }}
    </Query>
  );
};

export default Test;
