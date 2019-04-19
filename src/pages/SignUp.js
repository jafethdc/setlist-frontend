import React, { useState } from 'react';
import gql from 'graphql-tag';
import Layout from '../components/Layout';
import SignUpForm from '../components/SignUpForm';
import Mutation from '../components/graphql/CustomMutation';
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

  const signUp = (signUpMutation, signInMutation) => async ({
    name,
    username,
    email,
    password,
    passwordConfirmation,
  }) => {
    const {
      data: {
        signUp: { errors: signUpErrors },
      },
    } = await signUpMutation({
      variables: {
        name,
        username,
        email,
        password,
        passwordConfirmation,
      },
    });

    setSubmitErrors(signUpErrors);

    if (!signUpErrors.length) {
      const {
        data: {
          signIn: { errors: signInErrors },
        },
      } = await signInMutation({
        variables: { email, password },
      });

      setSubmitErrors(signInErrors);
    }
  };

  return (
    <Layout>
      <Mutation mutation={SIGN_UP_MUTATION}>
        {(signUpMutation, { loading: signinUp }) => (
          <Mutation
            mutation={SIGN_IN_MUTATION}
            refetchQueries={({ data }) =>
              data.signIn.errors.length ? [] : [{ query: ME_QUERY }]
            }
          >
            {(signInMutation, { loading: signinIn }) => (
              <SignUpForm
                onSubmit={signUp(signUpMutation, signInMutation)}
                loading={signinUp || signinIn}
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
