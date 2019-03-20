import React, { useState } from 'react';
import gql from 'graphql-tag';
import Mutation from '../components/graphql/CustomMutation';
import Layout from '../components/Layout';
import SignUpForm from '../components/SignUpForm';
import { SIGN_IN_MUTATION } from './SignIn';
import { ME_QUERY } from '../custom-hooks/useCurrentUser';

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    signUp(
      input: {
        name: $name
        username: $username
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
      }
    ) {
      errors
      user {
        id
        name
        username
        email
      }
    }
  }
`;

const SignUp = () => {
  const [submitErrors, setSubmitErrors] = useState([]);

  const handleSubmit = (signUpMutation, signInMutation) => async ({
    name,
    username,
    email,
    password,
    passwordConfirmation,
  }) => {
    const {
      data: { signUp },
    } = await signUpMutation({
      variables: {
        name,
        username,
        email,
        password,
        passwordConfirmation,
      },
    });

    setSubmitErrors(signUp.errors);

    if (!signUp.errors.length) {
      const {
        data: { signIn },
      } = await signInMutation({
        variables: { email, password },
      });

      setSubmitErrors(signIn.errors);
    }
  };

  return (
    <Layout>
      <Mutation mutation={SIGN_UP_MUTATION}>
        {(signUp, { loading: signUpLoading }) => (
          <Mutation
            mutation={SIGN_IN_MUTATION}
            refetchQueries={({ data }) =>
              data.signIn.errors.length ? [] : [{ query: ME_QUERY }]
            }
          >
            {(signIn, { loading: signInLoading }) => (
              <SignUpForm
                onSubmit={handleSubmit(signUp, signIn)}
                loading={signUpLoading || signInLoading}
                errors={submitErrors}
              />
            )}
          </Mutation>
        )}
      </Mutation>
    </Layout>
  );
};

export default SignUp;
