import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Artists from './pages/Artists';
import EditSetlist from './pages/EditSetlist';
import Festivals from './pages/Festivals';
import Index from './pages/Index';
import NewSetlist from './pages/NewSetlist';
import Setlists from './pages/Setlists';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Statistics from './pages/Statistics';
import Venues from './pages/Venues';
import useCurrentUser from './custom-hooks/useCurrentUser';
import './App.scss';

const App = () => {
  const currentUser = useCurrentUser();

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/setlists/:id/edit" component={EditSetlist} />
        <Route path="/setlists/new" component={NewSetlist} />
        <Route path="/setlists" component={Setlists} />
        <Route path="/artists" component={Artists} />
        <Route path="/festivals" component={Festivals} />
        <Route path="/statistics" component={Statistics} />
        <Route path="/venues" component={Venues} />

        {currentUser && <Redirect to="/" />}
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
      </Switch>
    </Router>
  );
};

export default App;
