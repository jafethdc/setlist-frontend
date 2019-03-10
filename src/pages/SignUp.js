import React, { useState } from 'react';
import gql from 'graphql-tag';
import Mutation from '../components/graphql/CustomMutation';
import Layout from '../components/Layout';
import SignUpForm from '../components/SignUpForm';

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

  const handleSubmit = signUp => async ({
    name,
    username,
    email,
    password,
    passwordConfirmation,
  }) => {
    const {
      data: {
        signUp: { errors, user },
      },
    } = await signUp({
      variables: {
        name,
        username,
        email,
        password,
        passwordConfirmation,
      },
    });

    console.log('resultados!', { errors, user });
    setSubmitErrors(errors);
  };

  return (
    <Layout>
      <Mutation mutation={SIGN_UP_MUTATION}>
        {(signUp, { error, loading }) => {
          if (error) return <p>Error!</p>;
          return (
            <SignUpForm
              onSubmit={handleSubmit(signUp)}
              loading={loading}
              errors={submitErrors}
            />
          );
        }}
      </Mutation>
    </Layout>
  );
};

export default SignUp;
