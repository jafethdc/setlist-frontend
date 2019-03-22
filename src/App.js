import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Index from './pages/Index';
import Artists from './pages/Artists';
import Festivals from './pages/Festivals';
import Setlists from './pages/Setlists';
import NewSetlist from './pages/NewSetlist';
import EditSetlist from './pages/EditSetlist';
import Statistics from './pages/Statistics';
import Venues from './pages/Venues';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import useCurrentUser from './custom-hooks/useCurrentUser';
import './App.scss';

const App = () => {
  const currentUser = useCurrentUser();
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/festivals" component={Festivals} />
        <Route path="/setlists/new" component={NewSetlist} />
        <Route path="/setlists/edit/:id" component={EditSetlist} />
        <Route path="/setlists" component={Setlists} />
        <Route path="/venues" component={Venues} />
        <Route path="/artists" component={Artists} />
        <Route path="/statistics" component={Statistics} />

        {currentUser && <Redirect to="/" />}
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
      </Switch>
    </Router>
  );
};

export default App;
