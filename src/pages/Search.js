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
    // not sure why is this policy needed.
    fetchPolicy: 'cache-and-network',
  });

  const loadMoreSetlists = () => {
    if (loading) return;
    if (!(data && data.setlists)) return;
    if (!data.setlists.pageInfo.hasNextPage) return;
    fetchMore({
      variables: {
        after: data.setlists.pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        const currentResults = prev.setlists.nodes;
        const newResults = fetchMoreResult.setlists.nodes;
        // hotfix | we need a better way (throttling seems not to work properly)
        // to prevent loadMoreSetlists from being called multiple times almost
        // at the same time.
        if (
          currentResults[currentResults.length - 1].id ===
          newResults[newResults.length - 1].id
        )
          return;

        return {
          ...fetchMoreResult,
          setlists: {
            ...fetchMoreResult.setlists,
            nodes: [...currentResults, ...newResults],
          },
        };
      },
    });
  };

  return (
    <Layout footerLess>
      Search results for <em>{queryParams.query}</em>:{' '}
      <>
        <SetlistsList
          items={data && data.setlists ? data.setlists.nodes : []}
          onLoadMore={loadMoreSetlists}
        />
        {data && data.setlists && !data.setlists.pageInfo.hasNextPage && (
          <p>No more setlists</p>
        )}
        {loading && <div className="loadersmall" />}
      </>
    </Layout>
  );
};
Search.propTypes = {
  location: PropTypes.object,
};

export default Search;
