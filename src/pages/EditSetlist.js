import React, { useState } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Title, Subtitle } from 'bloomer';
import Form from '../components/EditSetlistForm';
import Layout from '../components/Layout';
import Setlist from '../components/Setlist';
import Mutation from '../components/graphql/CustomMutation';
import useQuery from '../custom-hooks/useCustomQuery';

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
        id
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
          id
          name
        }
        track {
          name
          medium {
            release {
              name
              artist {
                id
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

const EditSetlist = ({ match: routeMatch }) => {
  const {
    data: { setlist },
    loading: fetchingSetlist,
  } = useQuery(GET_SETLIST_QUERY, {
    variables: {
      id: parseInt(routeMatch.params.id),
    },
  });

  const [setlistPreview, setSetlistPreview] = useState(null);

  const updateSetlist = mutation => async ({ id, items, comment }) => {
    const {
      data: {
        editSetlist: { errors },
      },
    } = await mutation({
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

    console.log('edition updateSetlist errors!', errors);
  };

  return (
    <Layout>
      {fetchingSetlist ? (
        <p>Loading...</p>
      ) : (
        <>
          <Title isSize={3}>{setlist.artist.name}</Title>
          <Subtitle isSize={4}>{`${setlist.venue.name}, ${
            setlist.venue.city.name
          }, ${setlist.venue.city.country.name}`}</Subtitle>
          <Mutation mutation={EDIT_SETLIST_MUTATION}>
            {(mutation, { loading: updatingSetlist }) => (
              <Form
                initialValues={setlist}
                onSubmit={updateSetlist(mutation)}
                onPreview={setSetlistPreview}
                loading={updatingSetlist}
              />
            )}
          </Mutation>

          {setlistPreview && <Setlist setlist={setlistPreview} />}
        </>
      )}
    </Layout>
  );
};

EditSetlist.propTypes = {
  match: PropTypes.object,
};

export default EditSetlist;
