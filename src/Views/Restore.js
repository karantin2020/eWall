import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Input, Form } from 'semantic-ui-react';
import AuthView from '../Components/AuthView.js';
import isEmail from 'validator/lib/isEmail';
import { notify } from 'reapop';
import toFrom from '../utils/toFrom.js';

class ResoreForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      emailError: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event, data) {
    const target = event.target;
    const { notify } = this.props;
    var value = target.value;
    if (value === undefined && data === undefined) {
      return;
    }
    // value = value || data.checked;
    const name = target.name || data.name;
    if (name === 'email' && !isEmail(value)) {
      this.setState({
        emailError: true
      });
      notify({
        id: 'restoreEmailError',
        message: 'Invalid email field value',
        status: 'error',
        dismissible: true,
        dismissAfter: 5000
      });
      return;
    } else {
      this.setState({
        emailError: false
      });
    }
  }
  handleSubmit(event) {
    const { notify } = this.props;
    event.preventDefault();
    if (!this.state.emailError) {
      notify({
        id: 'restoreFormSuccess',
        message: 'New Password was sent on your email',
        status: 'success',
        dismissible: true,
        dismissAfter: 5000
      });
      toFrom(this.props.history)();
    } else {
      notify({
        id: 'restoreFormError',
        message: 'Incorrect form field values',
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
          <Form.Field error={this.state.emailError}>
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
              onBlur={this.handleInputChange}
              onClick={this.handleSubmit}
            />
          </Form.Field>

          <Button primary fluid size="large">
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
