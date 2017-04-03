import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Layout from '../components/Layout';
import Home from '../components/Home';
import Team from '../components/Team';
import Overview from '../components/Overview';
import Resources from '../components/Resources';
import AuthSuccess from '../components/AuthSuccess';

// export getRoutes function instead of simple JSX to access redux store in onEnter for example
const getRoutes = (store) => {
  const reqAuth = (nextState, replace, callback) => {
    const auth = store && store.getState().user.loggedIn;
    if (!auth) {
      replace('/');
    }
    callback();
  };

  return (
    <Route path="/" component={Layout} >
      <IndexRoute component={Home} />
      <Route path="/team" onEnter={reqAuth} component={Team} />
      <Route path="/resources" onEnter={reqAuth} component={Resources} />
      <Route path="/overview" onEnter={reqAuth} component={Overview} />
      <Route path="authsuccess" component={AuthSuccess} />
    </Route>);
};

export default getRoutes;
