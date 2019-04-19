import React from 'react';
import gql from 'graphql-tag';
import { useApolloClient } from 'react-apollo-hooks';
import Autocomplete from './Autocomplete';

const FILTER_ARTISTS_QUERY = gql`
  query FILTER_ARTISTS_QUERY($where: ArtistWhere, $first: Int) {
    artists(where: $where, first: $first) {
      nodes {
        id
        name
      }
    }
  }
`;

const ArtistAutocomplete = props => {
  const client = useApolloClient();

  const fetchOptions = async value => {
    const { data } = await client.query({
      query: FILTER_ARTISTS_QUERY,
      variables: {
        where: {
          nameContains: value.toLowerCase(),
        },
        first: 20,
      },
    });
    return data.artists.nodes;
  };

  return (
    <Autocomplete
      {...props}
      fetchOptions={fetchOptions}
      optionLabel="name"
      placeholder="Type some artist's name"
    />
  );
};

export default ArtistAutocomplete;
