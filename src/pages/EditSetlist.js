import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Title, Subtitle } from 'bloomer';
import Layout from '../components/Layout';
import useQuery from '../custom-hooks/useCustomQuery';
import EditSetlistForm from '../components/EditSetlistForm';

const GET_SETLIST_QUERY = gql`
  query GET_SETLIST_QUERY($id: Int) {
    setlist(where: { id: $id }) {
      id
      date
      artist {
        id
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
  const {
    data: { setlist },
    loading,
  } = useQuery(GET_SETLIST_QUERY, {
    variables: {
      id: parseInt(match.params.id),
    },
  });

  return (
    <Layout>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Title isSize={3}>{setlist.artist.name}</Title>
          <Subtitle isSize={4}>{`${setlist.venue.name}, ${
            setlist.venue.city.name
          }, ${setlist.venue.city.country.name}`}</Subtitle>
          <EditSetlistForm
            initialValues={setlist}
            onSubmit={values => console.log('submit edit setlist', values)}
          />
        </>
      )}
    </Layout>
  );
};

EditSetlist.propTypes = {
  match: PropTypes.object,
};

export default EditSetlist;
