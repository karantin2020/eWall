import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Form,
  Container,
  Input,
  Message,
  List,
  Checkbox
} from 'semantic-ui-react';
import { notify } from 'reapop';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import matches from 'validator/lib/matches';
import AuthView from '../Components/AuthView.js';
import toFrom from '../utils/toFrom.js';

let strongRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@-_+,.<>)(#$%^&*])(?=.{8,})'
);
let defaultMsgConfig = {
  dismissible: true,
  dismissAfter: 5000
};

class LoginForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rememberMe: true,
      userIDError: false,
      passwordError: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  handleKeyPress(event, data) {
    if (event.key === 'Enter') {
      const ok = this.handleInputChange(event, data);
      if (ok) {
        notify({
          ...defaultMsgConfig,
          id: 'loginFormSuccess',
          title: 'Welcome',
          status: 'success'
        });
        return toFrom(this.props.history)();
      } else {
        notify({
          ...defaultMsgConfig,
          id: 'loginFormError',
          message: 'Incorrect form field values',
          status: 'error'
        });
      }
      this.handleSubmit(event);
    }
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
    const { notify } = this.props;
    var value = target.value;
    if (value === undefined && data === undefined) {
      return false;
    }
    // value = value || data.checked;
    const name = target.name || data.name;
    if (name === 'userID') {
      if (!this.verifyUserID(value)) {
        this.setState({
          userIDError: true
        });
        // 3. we use `notify` to create a notification
        notify({
          ...defaultMsgConfig,
          id: 'idError',
          message: 'Invalid userID field value',
          status: 'error'
        });
        return false;
      } else {
        this.setState({
          userIDError: false
        });
      }
    }
    if (name === 'password') {
      if (!this.verifyPassword(value)) {
        this.setState({
          passwordError: true
        });
        notify({
          ...defaultMsgConfig,
          id: 'passError',
          message: 'Invalid password field value',
          status: 'error'
        });
        return false;
      } else {
        this.setState({
          passwordError: false
        });
      }
    }
    this.setState({
      [name]: value
    });
    return true;
  }
  handleSubmit(event) {
    const { notify } = this.props;
    event.preventDefault();
    if (this.verifyFields()) {
      console.log('loginFormSuccess');
      notify({
        ...defaultMsgConfig,
        id: 'loginFormSuccess',
        title: 'Welcome',
        status: 'success'
      });
      return toFrom(this.props.history)();
    } else {
      notify({
        ...defaultMsgConfig,
        id: 'loginFormError',
        message: 'Incorrect form field values',
        status: 'error'
      });
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
          <Form.Field error={this.state.userIDError}>
            <Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Your ID"
              type="text"
              name="userID"
              onBlur={this.handleInputChange}
              tabIndex={1}
              autoFocus
            />
          </Form.Field>
          <Form.Field error={this.state.passwordError}>
            <Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              onBlur={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
              tabIndex={2}
            />
          </Form.Field>

          <List horizontal size="small" style={{ margin: '-0.5em 0 0.7em 0' }}>
            <Checkbox
              as={List.Item}
              defaultChecked
              label={'Remember me'}
              name="rememberMe"
              onChange={this.handleInputChange}
              tabIndex={3}
            />
            <List.Item as={Link} to="/restore">
              Forgot password?
            </List.Item>
          </List>

          <Button
            tabIndex={4}
            primary
            fluid
            size="large"
            type="submit"
            disabled={this.state.userIDError || this.state.passwordError}
          >
            Login
          </Button>
        </Container>
      </AuthView>
    );
  }
}

const LoginMessage = () => (
  <Message size="tiny">
    Are you new here?
    {'   '}
    <Link to="/signup">Sign up</Link>
  </Message>
);

export default connect(
  null,
  { notify }
)(LoginForm);
// export default LoginForm;
