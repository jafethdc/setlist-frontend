import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

const CustomQuery = ({ children, ...rest }) => (
  <Query {...rest}>
    {result => {
      if (result.error)
        throw new Error(result.error.message.replace('GraphQL error: ', ''));
      return children(result);
    }}
  </Query>
);

CustomQuery.propTypes = {
  children: PropTypes.any.isRequired,
};

export default CustomQuery;