import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useApolloClient } from 'react-apollo-hooks';
import { Columns, Column } from 'bloomer';
import Layout from '../components/Layout';
import Autocomplete from '../components/Autocomplete';
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

const Setlists = () => {
  const client = useApolloClient();
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = async value => {
    try {
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
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      Setlists
      <Columns isCentered>
        <Column isSize="1/3">
          <Autocomplete
            onChange={debounce(handleChange, 300)}
            onSelect={option => console.log('selected!', option)}
            options={options}
            loadingOptions={loading}
            optionLabel="name"
            placeholder="Type some artist's name"
          />
        </Column>
      </Columns>
    </Layout>
  );
};

export default Setlists;
