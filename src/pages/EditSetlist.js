import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Content } from 'bloomer';
import JSONTree from 'react-json-tree';
import Layout from '../components/Layout';
import useQuery from '../custom-hooks/useCustomQuery';

const GET_SETLIST_QUERY = gql`
  query GET_SETLIST_QUERY($id: Int) {
    setlist(where: { id: $id }) {
      id
      date
      artist {
        name
      }
      venue {
        name
        city {
          name
          country {
            name
          }
        }
      }
      items {
        id
        type
        featuringArtist {
          name
        }
        track {
          name
          medium {
            release {
              name
              artist {
                name
              }
            }
          }
        }
        info
        isCover
      }
    }
  }
`;

const EditSetlist = ({ match }) => {
  const { data, loading } = useQuery(GET_SETLIST_QUERY, {
    variables: {
      id: parseInt(match.params.id),
    },
  });

  return (
    <Layout>
      Edit Setlist for {match.params.id}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Content>
          <JSONTree data={data} />
        </Content>
      )}
    </Layout>
  );
};

EditSetlist.propTypes = {
  match: PropTypes.object,
};

export default EditSetlist;
