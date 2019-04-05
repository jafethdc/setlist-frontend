import React from 'react';
import gql from 'graphql-tag';
import { useApolloClient } from 'react-apollo-hooks';
import { Columns, Column } from 'bloomer';
import Layout from '../components/Layout';
import Autocomplete from '../components/Autocomplete';

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
    <Layout>
      Setlists
      <Columns isCentered>
        <Column isSize="1/3">
          <Autocomplete
            onChange={value => console.log('term!', value)}
            onSelect={option => console.log('selected!', option)}
            fetchOptions={fetchOptions}
            optionLabel="name"
            placeholder="Type some artist's name"
          />
        </Column>
      </Columns>
    </Layout>
  );
};

export default Setlists;
