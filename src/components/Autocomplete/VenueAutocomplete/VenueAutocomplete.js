import React from 'react';
import gql from 'graphql-tag';
import { useApolloClient } from 'react-apollo-hooks';
import Autocomplete from '../Autocomplete';

const FILTER_VENUES_QUERY = gql`
  query FILTER_VENUES_QUERY($where: VenueWhere, $first: Int) {
    venues(where: $where, first: $first) {
      nodes {
        id
        name
        city {
          name
          country {
            name
          }
        }
      }
    }
  }
`;

const VenueAutocomplete = props => {
  const client = useApolloClient();

  const fetchOptions = async value => {
    const { data } = await client.query({
      query: FILTER_VENUES_QUERY,
      variables: {
        where: {
          fullNameContains: value
            .toLowerCase()
            .split(',')
            .map(x => x.trim())
            .join(''),
        },
        first: 20,
      },
    });
    return data.venues.nodes;
  };

  return (
    <Autocomplete
      {...props}
      fetchOptions={fetchOptions}
      optionLabel={option =>
        `${option.name}, ${option.city.name}, ${option.city.country.name}`
      }
      placeholder="Type some venue's name"
    />
  );
};

export default VenueAutocomplete;
