import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Form,
  Container,
  Message,
  List,
  Checkbox
} from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import matches from 'validator/lib/matches';
import AuthView from '../Components/AuthView.js';
import toFrom from '../utils/toFrom.js';

let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@-_+,.<>)(#$%^&*])(?=.{8,})");

class LoginForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rememberMe: true,
      userIDError: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.verifyFields = this.verifyFields.bind(this);
    this.verifyUserID = this.verifyUserID.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
  }
  verifyFields() {
    if (
      !this.verifyUserID(this.state.useID) &&
      !this.verifyPassword(this.state.password)
    ) {
      return false;
    }
    return true;
  }
  verifyUserID(userID) {
    if (userID && (isEmail(userID) || isLength(userID, { min: 3, max: 64 })))
      return true;
    return false;
  }
  verifyPassword(password) {
    if (
      password &&
      matches(password, strongRegex) &&
      isLength(password, { min: 8, max: 64 })
    )
      return true;
    return false;
  }
  handleInputChange(event, data) {
    const target = event.target;
    var value = target.value;
    if (value === undefined && data === undefined) {
      return;
    }
    value = value || data.checked;
    const name = target.name || data.name;
    if (name === 'userID' && !this.verifyUserID(value)) {
      this.setState({
        userIDError: true
      });
      return;
    } else {
      this.setState({
        userIDError: false
      });
    }
    if (name === 'password' && !this.verifyPassword(value)) {
      this.setState({
        passwordError: true
      });
      return;
    } else {
      this.setState({
        passwordError: false
      });
    }
    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.verifyFields()) {
      toFrom(this.props.history)();
    } else {
      // console.log('Some fields are nor correct');
      // EMIT ERROR MESSAGE HERE
    }
  }
  render() {
    return (
      <AuthView
        title={'Log-in to your account'}
        AuthMessage={LoginMessage}
        onSubmit={this.handleSubmit}
      >
        <Container>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Your ID"
            name="userID"
            error={this.state.userIDError}
            onBlur={this.handleInputChange}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            name="password"
            error={this.state.passwordError}
            onBlur={this.handleInputChange}
          />

          <List horizontal size="small" style={{ margin: '-0.5em 0 0.7em 0' }}>
            <Checkbox
              as={List.Item}
              defaultChecked
              label={'Remember me'}
              name="rememberMe"
              onChange={this.handleInputChange}
            />
            <List.Item as={Link} to="/restore">
              Forgot password?
            </List.Item>
          </List>

          <Button primary fluid size="large" type="submit">
            Login
          </Button>
        </Container>
      </AuthView>
    );
  }
}

const LoginMessage = () => (
  <Message size="tiny">
    Are you new here?{'   '}
    <Link to="/signup">Sign up</Link>
  </Message>
);

export default LoginForm;
