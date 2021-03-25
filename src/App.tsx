import React from 'react';
import PrivateRoutes from './container/index'
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import history from './history'
// react query
import { QueryClient, QueryClientProvider } from 'react-query'

// import pages
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import auth from './utils/auth';

const queryClient = new QueryClient()


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.checkAuth()
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
)

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <div className="App" style={{ minHeight: "100vh" }}>
          <Switch>
            <Route exact path="/login" component={LoginPage}></Route>
            <Route exact path="/register" component={RegisterPage}></Route>
            <PrivateRoute component={PrivateRoutes}></PrivateRoute>
          </Switch>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
