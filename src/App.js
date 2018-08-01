import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './Views/Login.js';
import Signup from "./Views/Signup.js"
import Restore from "./Views/Restore.js"

const AmbiguousExample = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/restore" component={Restore} />
        <Route exact path="/:user" component={User} />
      </Switch>
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
    <div>
      <Link to="/login">Login</Link>
    </div>
  </div>
);
const User = ({ match }) => (
  <div>
    <h2>User: {match.params.user}</h2>
  </div>
);

export default AmbiguousExample;
