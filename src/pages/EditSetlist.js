import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Title, Subtitle } from 'bloomer';
import Layout from '../components/Layout';
import useQuery from '../custom-hooks/useCustomQuery';
import EditSetlistForm from '../components/EditSetlistForm';
import Mutation from '../components/graphql/CustomMutation';

const fragments = {
  SetlistFields: gql`
    fragment SetlistFields on Setlist {
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
  `,
};

const EDIT_SETLIST_MUTATION = gql`
  mutation EDIT_SETLIST_MUTATION(
    $id: ID!
    $items: [SetlistItemInput!]!
    $comment: String
  ) {
    editSetlist(input: { id: $id, items: $items, comment: $comment }) {
      errors
      setlist {
        ...SetlistFields
      }
    }
  }
  ${fragments.SetlistFields}
`;

const GET_SETLIST_QUERY = gql`
  query GET_SETLIST_QUERY($id: Int) {
    setlist(where: { id: $id }) {
      ...SetlistFields
    }
  }
  ${fragments.SetlistFields}
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

  const handleSubmit = editSetlist => async ({ id, items, comment }) => {
    const {
      data: {
        editSetlist: { errors },
      },
    } = await editSetlist({
      variables: {
        id,
        comment,
        items: items.map(
          (
            { type, info, isCover, track, featuringArtist, ...restItem },
            index
          ) => ({
            id: restItem.id,
            trackId: track ? track.id : null,
            featuringArtistId: featuringArtist ? featuringArtist.id : null,
            position: index + 1,
            type,
            info,
            isCover,
          })
        ),
      },
    });

    console.log('edition submit errors!', errors);
  };

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
          <Mutation mutation={EDIT_SETLIST_MUTATION}>
            {(editSetlist, { loading: submitting }) => (
              <EditSetlistForm
                initialValues={setlist}
                onSubmit={handleSubmit(editSetlist)}
                loading={submitting}
              />
            )}
          </Mutation>
        </>
      )}
    </Layout>
  );
};

EditSetlist.propTypes = {
  match: PropTypes.object,
};

export default EditSetlist;
