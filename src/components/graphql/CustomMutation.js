import React from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

// Waiting for react-apollo-hooks' useMutation to return a tuple
// ref: https://github.com/trojanowski/react-apollo-hooks/pull/93
const CustomMutation = ({ children, ...rest }) => (
  <Mutation {...rest}>
    {(mutation, result) => {
      if (result.error)
        throw new Error(result.error.message.replace('GraphQL error: ', ''));
      return children(mutation, result);
    }}
  </Mutation>
);

CustomMutation.propTypes = {
  children: PropTypes.any.isRequired,
};

export default CustomMutation;
