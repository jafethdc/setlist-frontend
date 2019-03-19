import React, { useState } from 'react';
import { Title, Columns, Column } from 'bloomer';
import gql from 'graphql-tag';
import Mutation from '../components/graphql/CustomMutation';
import Layout from '../components/Layout';
import NewSetlistForm from '../components/NewSetlistForm';

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

  const handleSubmit = createSetlist => async ({
    artistId,
    venueId,
    date,
    comment,
  }) => {
    const {
      data: {
        createSetlist: { errors, setlist },
      },
    } = await createSetlist({
      variables: {
        artistId,
        venueId,
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
        <Column isSize="1/3">
          <Mutation mutation={CREATE_SETLIST_MUTATION}>
            {(createSetlist, { loading }) => (
              <NewSetlistForm
                onSubmit={handleSubmit(createSetlist)}
                loading={loading}
                errors={submitErrors}
              />
            )}
          </Mutation>
        </Column>
      </Columns>
    </Layout>
  );
};

export default NewSetlist;
