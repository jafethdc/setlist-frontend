import React from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

const CustomQuery = ({ children, ...rest }) => (
  <Mutation {...rest}>
    {(mutation, result) => {
      if (result.error)
        throw new Error(result.error.message.replace('GraphQL error: ', ''));
      return children(mutation, result);
    }}
  </Mutation>
);

CustomQuery.propTypes = {
  children: PropTypes.any.isRequired,
};

export default CustomQuery;
