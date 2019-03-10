import React, { useState } from 'react';
import gql from 'graphql-tag';
import Mutation from '../components/graphql/CustomMutation';
import Layout from '../components/Layout';
import SignInForm from '../components/SignInForm';

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      errors
      session {
        token
        expirationTime
      }
    }
  }
`;

const SignIn = () => {
  const [submitErrors, setSubmitErrors] = useState([]);

  const handleSubmit = signIn => async ({ email, password }) => {
    const {
      data: {
        signIn: { errors, session },
      },
    } = await signIn({
      variables: { email, password },
    });

    console.log('resultados!', { errors, session });
    setSubmitErrors(errors);
  };

  return (
    <Layout>
      <Mutation mutation={SIGN_IN_MUTATION}>
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
