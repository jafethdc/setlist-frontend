import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useApolloClient } from 'react-apollo-hooks';
import PropTypes from 'prop-types';
import Autocomplete from './Autocomplete';
import debounce from '../lib/debounce';

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

const VenueAutocomplete = ({ onSelect, onChange }) => {
  const client = useApolloClient();
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = async value => {
    try {
      onChange(value);
      setLoading(true);
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
      setOptions(data.venues.nodes);
    } catch (error) {
      console.log('Error fetching [FILTER_VENUES_QUERY]', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Autocomplete
      onChange={debounce(handleChange, 300)}
      onSelect={onSelect}
      options={options}
      loadingOptions={loading}
      optionLabel={option =>
        `${option.name}, ${option.city.name}, ${option.city.country.name}`
      }
      placeholder="Type some venue's name"
    />
  );
};

VenueAutocomplete.propTypes = {
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
};

export default VenueAutocomplete;
