import React from 'react';
import PrivateRoutes from './Routes';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { secureStroge } from './utils/storage';
import history from './history'
// import pages
import LoginPage from './pages/login'
import RegisterPage from './pages/register'


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    secureStroge.get("user")
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
)

function App() {

  return (
    <Router history={history}>
      <div className="App" style={{ minHeight: "100vh" }}>
        <Switch>
          <Route exact path="/login" component={LoginPage}></Route>
          <Route exact path="/register" component={RegisterPage}></Route>
          <PrivateRoute component={PrivateRoutes}></PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
