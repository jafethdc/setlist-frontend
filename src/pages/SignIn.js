import React, { useState } from 'react';
import gql from 'graphql-tag';
import Mutation from '../components/graphql/CustomMutation';
import Layout from '../components/Layout';
import SignInForm from '../components/SignInForm';
import { ME_QUERY } from '../custom-hooks/useCurrentUser';

export const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      errors
      user {
        id
        email
        name
      }
    }
  }
`;

const SignIn = () => {
  const [submitErrors, setSubmitErrors] = useState([]);

  const handleSubmit = signIn => async ({ email, password }) => {
    const {
      data: {
        signIn: { errors, user },
      },
    } = await signIn({
      variables: { email, password },
    });

    if (errors.length) {
      setSubmitErrors(errors);
    } else {
      console.log('exito!', user);
    }
  };

  return (
    <Layout>
      <Mutation
        mutation={SIGN_IN_MUTATION}
        refetchQueries={({ data }) =>
          data.signIn.errors.length ? [] : [{ query: ME_QUERY }]
        }
      >
        {(signIn, { loading }) => (
          <SignInForm
            onSubmit={handleSubmit(signIn)}
            loading={loading}
            errors={submitErrors}
          />
        )}
      </Mutation>
    </Layout>
  );
};

export default SignIn;
