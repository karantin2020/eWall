import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import Login from './Login.js';
import Signup from './Signup.js';
import Restore from './Restore.js';

class AuthViews extends PureComponent {
  render() {
    return (
      <Grid style={{ height: '100vh', width: '100vw', margin: '0' }}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/restore" component={Restore} />
        </Switch>
      </Grid>
    );
  }
}

export default AuthViews;
