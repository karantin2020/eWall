import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import NotificationSystem from 'react-notification-system';
import Login from './Views/Login.js';
import Signup from './Views/Signup.js';
import Restore from './Views/Restore.js';
import Home from './Views/Home.js';

class AppLayout extends PureComponent {
  constructor(props) {
    super(props);
    this.notificationSystem = null;
    // create a ref to store the textInput DOM element
    this.notificationSystem = React.createRef();
    this.addNotification = this.addNotification.bind(this);
  }

  addNotification = event => {
    event.preventDefault();
    this.notificationSystem.current.addNotification({
      message: 'Notification message',
      level: 'success'
    });
  };
  // componentDidMount: function() {
  //   this.notificationSystem = this.refs.notificationSystem;
  // }
  render() {
    return (
      <Router>
        <Grid style={{ height: '100vh', width: '100vw', margin: '0' }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/restore" component={Restore} />
            <Route exact path="/:user" component={User} />
          </Switch>
          <NotificationSystem ref={this.notificationSystem} />
        </Grid>
      </Router>
    );
  }
}

// const Home = () => (
//   <div>
//     <h2>Home</h2>
//     <div>
//       <Link to="/login">Login</Link>
//     </div>
//   </div>
// );
const User = ({ match }) => (
  <div>
    <h2>User: {match.params.user}</h2>
  </div>
);

export default AppLayout;
