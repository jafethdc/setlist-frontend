import React, { useState } from 'react';
import { ApolloProvider } from 'react-apollo';
import apolloClient from './lib/apolloClient';
import Test from './Test';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <Test />
  </ApolloProvider>
);

export default App;
