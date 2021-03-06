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
  Checkbox,
  Popup
} from 'semantic-ui-react';
import { notify, removeNotification } from 'reapop';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import matches from 'validator/lib/matches';
import AuthView from '../Components/AuthView.js';
import toFrom from '../utils/toFrom.js';

let strongRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*<>?])(?=.{8,})'
);
let defaultMsgConfig = {
  dismissible: true,
  dismissAfter: 0
};

class LoginForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rememberMe: true,
      userIDError: true,
      passwordError: true,
      erroruserID: false,
      errorpassword: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.userIDRef = React.createRef();
    this.passwordRef = React.createRef();
  }
  componentDidMount = () => {
    this.userIDNode = this.userIDRef.current.inputRef;
    this.passwordNode = this.passwordRef.current.inputRef;
  };
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      return this.handleSubmit(event);
    }
  }
  verifyFields() {
    var correct = true;
    let { notify, removeNotification } = this.props;
    if (this.state.userIDError) {
      this.setState((prevState, props) => ({
        erroruserID: true
      }));
      notify({
        ...defaultMsgConfig,
        id: 'loginUserIDError',
        title: 'UserID is invalid',
        message: 'Need valid email',
        status: 'error'
      });
      correct = false;
    } else {
      removeNotification('loginUserIDError');
    }
    return correct;
  }
  verifyUserID(userID) {
    if (isEmail(userID)) return true;
    return false;
  }
  verifyPassword(password) {
    if (
      matches(password, strongRegex) &&
      isLength(password, { min: 8, max: 64 })
    )
      return true;
    return false;
  }
  handleInputChange = (event, { name, value }) => {
    let { removeNotification } = this.props;
    this.setState((prevState, props) => ({
      ['error' + name]: false
    }));
    if (name === 'userID') {
      if (!this.verifyUserID(value)) {
        this.setState({
          userIDError: true
        });
        return false;
      } else {
        this.setState({
          userIDError: false
        });
        removeNotification('loginUserIDError');
      }
    }
    return true;
  };
  handleEdit = (event, { name, value }) => {
    if (value === undefined) {
      return false;
    }
    if (name === 'userID') {
      this.setState({
        userIDError: false
      });
    }
    if (name === 'password') {
      this.setState({
        passwordError: false
      });
    }
  };
  handleSubmit(event) {
    event.preventDefault();
    if (!this.verifyFields()) {
      return;
    }
    let { notify } = this.props;
    if (!true /*authenticate()*/) {
      notify({
        ...defaultMsgConfig,
        id: 'loginAuthError',
        title: 'Bad credentials',
        message: 'Your email or password is invalid',
        dismissAfter: 7000,
        status: 'error'
      });
      return;
    }
    notify({
      ...defaultMsgConfig,
      id: 'loginSuccess',
      title: 'Welcome',
      message: 'Now you can start work',
      dismissAfter: 7000,
      status: 'success'
    });
    return toFrom(this.props.history)();
  }
  render() {
    return (
      <AuthView
        title={'Log-in to your account'}
        AuthMessage={LoginMessage}
        onSubmit={this.handleSubmit}
      >
        <Container>
          <Form.Field error={this.state.erroruserID}>
            <Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Your email"
              type="email"
              name="userID"
              ref={this.userIDRef}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
              tabIndex={1}
              autoFocus
            />
          </Form.Field>
          <Popup
            context={this.userIDNode}
            style={{ padding: '0.5em 0.7em' }}
            content="Need valid email"
            position="bottom left"
            open={this.state.erroruserID}
          />
          <Form.Field>
            <Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              ref={this.passwordRef}
              onChange={this.handleInputChange}
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
            disabled={this.state.userIDError}
          >
            Login
          </Button>
        </Container>
      </AuthView>
    );
  }
}

let LoginMessage = () => (
  <Message size="tiny">
    Are you new here?
    {'   '}
    <Link to="/signup">Sign up</Link>
  </Message>
);

export default connect(
  null,
  { notify, removeNotification }
)(LoginForm);
// export default LoginForm;
