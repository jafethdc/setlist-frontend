import React from 'react';
import gql from 'graphql-tag';
import { useApolloClient } from 'react-apollo-hooks';
import PropTypes from 'prop-types';
import Autocomplete from '../Autocomplete';

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

const TrackAutocomplete = ({ artistId, ...rest }) => {
  const client = useApolloClient();

  const fetchOptions = async value => {
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
    return data.tracks.nodes;
  };

  return (
    <Autocomplete
      {...rest}
      fetchOptions={fetchOptions}
      optionLabel="name"
      placeholder="Type some track's name"
    />
  );
};

TrackAutocomplete.propTypes = {
  artistId: PropTypes.number,
};

export default TrackAutocomplete;
