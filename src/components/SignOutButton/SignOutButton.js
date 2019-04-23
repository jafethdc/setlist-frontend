import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { Button } from 'bloomer';
import { ME_QUERY } from '../../custom-hooks/useCurrentUser';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signOut {
      message
    }
  }
`;

export const useSignOut = () =>
  useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }],
  });

const SignOutButton = props => {
  const signOut = useSignOut();

  return (
    <Button isColor="light" onClick={signOut} {...props}>
      Sign out
    </Button>
  );
};

export default SignOutButton;
