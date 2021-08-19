import React, { Suspense } from 'react';

// ? lib third party
import { useAppSelector } from 'store';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// ?components
import Home from 'pages/Home';
import PrivateRoute from './privateRouter';
import { Routers } from './root.router';

const ListRouter = () => {
  const isHome = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              isHome ? <Redirect to="/create-playlist" /> : <Home />
            }
          />
          {Routers.map((route) => (
            <PrivateRoute
              key={route.path}
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </Router>
    </Suspense>
  );
};

export default ListRouter;
