import ApolloClient from 'apollo-boost';

export default new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_SERVER,
  credentials: 'include', // this allows to include cookies in the requests
});
