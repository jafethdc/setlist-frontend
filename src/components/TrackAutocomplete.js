import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useApolloClient } from 'react-apollo-hooks';
import PropTypes from 'prop-types';
import Autocomplete from './Autocomplete';
import debounce from '../lib/debounce';

const FILTER_TRACKS_QUERY = gql`
  query FILTER_TRACKS_QUERY($where: TrackWhere, $first: Int) {
    tracks(where: $where, first: $first) {
      nodes {
        id
        name
        medium {
          release {
            artist {
              name
            }
          }
        }
      }
    }
  }
`;

const TrackAutocomplete = ({ onSelect, onChange, initialValue, artistId }) => {
  const client = useApolloClient();
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = async value => {
    console.log('trackautocomplete handlechange');
    try {
      onChange(value);
      setLoading(true);
      const { data } = await client.query({
        query: FILTER_TRACKS_QUERY,
        variables: {
          where: {
            nameContains: value.toLowerCase(),
            artistId,
          },
          first: 20,
        },
      });
      setOptions(data.tracks.nodes);
    } catch (error) {
      console.log('Error fetching [FILTER_TRACKS_QUERY]', error);
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
      initialValue={initialValue}
      optionLabel="name"
      placeholder="Type some track's name"
    />
  );
};

TrackAutocomplete.propTypes = {
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
  initialValue: PropTypes.string,
  artistId: PropTypes.number,
};

export default TrackAutocomplete;
