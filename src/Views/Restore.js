import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Form, Input } from 'semantic-ui-react';
import AuthView from '../Components/AuthView.js';
// import DelayInput from '../Components/DelayInput.js';
import isEmail from 'validator/lib/isEmail';
import { notify } from 'reapop';
import toFrom from '../utils/toFrom.js';

class ResoreForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      emailError: true,
      activeButton: false,
      fieldError: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event, { name, value }) {
    this.setState((prevState, props) => ({
      fieldError: false
    }));
    if (value === undefined) {
      return;
    }
    if (name === 'email') {
      if (!isEmail(value)) {
        this.setState((prevState, props) => ({
          emailError: true,
          activeButton: false
        }));
        return;
      } else {
        this.setState((prevState, props) => ({
          emailError: false,
          activeButton: true
        }));
      }
    }
  }
  handleEdit = () =>
    this.setState((prevState, props) => ({
      emailError: false
    }));
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    }
  };
  handleSubmit(event) {
    const { notify } = this.props;
    event.preventDefault();
    if (!this.state.emailError) {
      notify({
        id: 'restoreFormSuccess',
        message: 'New Password was sent to your email',
        status: 'success',
        dismissible: true,
        dismissAfter: 5000
      });
      toFrom(this.props.history)();
    } else {
      this.setState((prevState, props) => ({
        fieldError: true
      }));
      notify({
        id: 'restoreEmailError',
        title: 'Invalid email',
        message: 'Need correct email address',
        status: 'error',
        dismissible: true,
        dismissAfter: 5000
      });
    }
  }
  render() {
    return (
      <AuthView title={'Restore your password'} onSubmit={this.handleSubmit}>
        <Container>
          <Form.Field error={this.state.fieldError}>
            <Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Your email"
              type="email"
              tabIndex={1}
              focus
              autoFocus
              onKeyPress={this.handleKeyPress}
              onChange={this.handleInputChange}
            />
          </Form.Field>

          <Button
            primary
            fluid
            size="large"
            disabled={!this.state.activeButton}
          >
            Send me a new password
          </Button>
        </Container>
      </AuthView>
    );
  }
}

// export default ResoreForm;

export default connect(
  null,
  { notify }
)(ResoreForm);
