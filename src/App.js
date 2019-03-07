import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import apolloClient from './lib/apolloClient';
import Index from './pages/Index';
import Artists from './pages/Artists';
import Festivals from './pages/Festivals';
import Setlists from './pages/Setlists';
import Statistics from './pages/Statistics';
import Venues from './pages/Venues';
import 'bulma/css/bulma.css';
import './App.css';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <Router>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/festivals" component={Festivals} />
        <Route path="/setlists" component={Setlists} />
        <Route path="/venues" component={Venues} />
        <Route path="/artists" component={Artists} />
        <Route path="/statistics" component={Statistics} />
      </Switch>
    </Router>
  </ApolloProvider>
);

export default App;
