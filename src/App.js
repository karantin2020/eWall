import React, { PureComponent } from 'react';
// import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-wybo';
import Home from './Views/Home.js';
import AuthViews from './Views/AuthViews.js';
// import { store } from './index.js';

class AppLayout extends PureComponent {
  render() {
    return (
      <Router>
        <Grid style={{ height: '100vh', width: '100vw', margin: '0' }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/:authView(login|signup|restore)"
              component={AuthViews}
            />
            <Route path="/:user" component={User} />
          </Switch>
          <NotificationsSystem theme={theme} />
        </Grid>
      </Router>
    );
  }
}

const User = ({ match }) => (
  <div>
    <h2>User: {match.params.user}</h2>
  </div>
);

// const mapStateToProps = state => {
//   console.log('Recieved new state: ', state);
//   return {};
// };

// export default connect(mapStateToProps)(AppLayout);
export default AppLayout;
