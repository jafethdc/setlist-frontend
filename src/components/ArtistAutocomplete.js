import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useApolloClient } from 'react-apollo-hooks';
import PropTypes from 'prop-types';
import Autocomplete from './Autocomplete';
import debounce from '../lib/debounce';

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

const ArtistAutocomplete = ({ onSelect, onChange }) => {
  const client = useApolloClient();
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = async value => {
    try {
      onChange(value);
      setLoading(true);
      const { data } = await client.query({
        query: FILTER_ARTISTS_QUERY,
        variables: {
          where: {
            nameContains: value.toLowerCase(),
          },
          first: 20,
        },
      });
      setOptions(data.artists.nodes);
    } catch (error) {
      console.log('Error fetching [FILTER_ARTISTS_QUERY]', error);
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
      optionLabel="name"
      placeholder="Type some artist's name"
    />
  );
};

ArtistAutocomplete.propTypes = {
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
};

export default ArtistAutocomplete;
