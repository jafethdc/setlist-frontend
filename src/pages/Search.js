import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';

const Search = ({ location }) => <Layout>Search! {location.search}</Layout>;
Search.propTypes = {
  location: PropTypes.object,
};

export default Search;
