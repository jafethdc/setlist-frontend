import React, { useState } from 'react';
import { Title, Columns, Column, Button } from 'bloomer';
import gql from 'graphql-tag';
import Mutation from '../components/graphql/CustomMutation';
import Layout from '../components/Layout';
import NewSetlistForm from '../components/NewSetlistForm';
import Setlist from '../components/Setlist';

const CREATE_SETLIST_MUTATION = gql`
  mutation CREATE_SETLIST_MUTATION(
    $artistId: Int!
    $venueId: Int!
    $date: Date!
    $comment: String
  ) {
    createSetlist(
      input: {
        artistId: $artistId
        venueId: $venueId
        date: $date
        comment: $comment
      }
    ) {
      errors
      setlist {
        id
        date
      }
    }
  }
`;

const NewSetlist = () => {
  const [submitErrors, setSubmitErrors] = useState([]);
  const [setlistPreview, setSetlistPreview] = useState(null);

  const createSetlist = mutation => async ({
    artist,
    venue,
    date,
    comment,
  }) => {
    const {
      data: {
        createSetlist: { errors, setlist },
      },
    } = await mutation({
      variables: {
        artistId: parseInt(artist.id),
        venueId: parseInt(venue.id),
        date,
        comment,
      },
    });

    console.log('resultados!', { errors, setlist });
    setSubmitErrors(errors);
  };

  return (
    <Layout>
      <Title isSize={3}>New Setlist</Title>
      <Columns>
        <Column isSize="1/2">
          <Mutation mutation={CREATE_SETLIST_MUTATION}>
            {(mutation, { loading: creatingSetlist }) => (
              <NewSetlistForm
                onSubmit={createSetlist(mutation)}
                onPreview={setSetlistPreview}
                loading={creatingSetlist}
                errors={submitErrors}
              />
            )}
          </Mutation>
        </Column>
        {setlistPreview && (
          <>
            <div className="is-divider-vertical" />
            <Column isSize="1/2">
              <Setlist setlist={setlistPreview} />
              <Button
                isColor="secondary"
                onClick={() => setSetlistPreview(null)}
              >
                Hide preview
              </Button>
            </Column>
          </>
        )}
      </Columns>
    </Layout>
  );
};

export default NewSetlist;
