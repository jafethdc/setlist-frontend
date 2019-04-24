import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import gql from 'graphql-tag';
import Layout from '../components/Layout';
import useQuery from '../custom-hooks/useCustomQuery';
import SetlistsList from '../components/SetlistsList';

const SEARCH_SETLISTS_QUERY = gql`
  query GET_SETLISTS($first: Int, $after: String, $searchQuery: String) {
    setlists(first: $first, after: $after, searchQuery: $searchQuery) {
      totalCount
      totalPageCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      nodes {
        id
        date
        artist {
          id
          name
        }
        venue {
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
  }
`;

const Search = ({ location }) => {
  const queryParams = useMemo(() => queryString.parse(location.search), [
    location.search,
  ]);

  const { data, loading, fetchMore } = useQuery(SEARCH_SETLISTS_QUERY, {
    variables: {
      first: 20,
      searchQuery: queryParams.query,
    },
  });

  const loadMoreSetlists = () => {
    if (!data.setlists.pageInfo.hasNextPage) return;
    fetchMore({
      variables: {
        after: data.setlists.pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...fetchMoreResult,
          setlists: {
            ...fetchMoreResult.setlists,
            nodes: [...prev.setlists.nodes, ...fetchMoreResult.setlists.nodes],
          },
        };
      },
    });
  };

  return (
    <Layout footerLess>
      Search results for <em>{queryParams.query}</em>:{' '}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>{data.setlists.totalCount} results</h3>
          <SetlistsList
            items={data.setlists.nodes}
            onLoadMore={loadMoreSetlists}
          />
          {!data.setlists.pageInfo.hasNextPage && <p>No more setlists</p>}
        </>
      )}
    </Layout>
  );
};
Search.propTypes = {
  location: PropTypes.object,
};

export default Search;
