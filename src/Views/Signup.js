import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Form, Input, Message } from 'semantic-ui-react';
import AuthView from '../Components/AuthView.js';
import toFrom from '../utils/toFrom.js';

const SignupForm = props => {
  return (
    <AuthView
      AuthMessage={SignupMessage}
      title={'Create new account'}
      onSubmit={toFrom(props.history)}
    >
      <Container>
        <Form.Field>
          <Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Your name"
            type="text"
            focus
            autoFocus
            tabIndex={1}
          />
        </Form.Field>
        <Form.Field>
          <Input
            fluid
            icon="mail"
            iconPosition="left"
            placeholder="Your email"
            type="email"
            focus
            tabIndex={2}
          />
        </Form.Field>

        <Button type="submit" primary fluid size="large">
          Sign up
        </Button>
      </Container>
    </AuthView>
  );
};

function SignupMessage(props) {
  return (
    <Message size="tiny">
      Already signed?{' '}
      <Link style={{ display: 'inline-block' }} to="/login">
        Log in
      </Link>
    </Message>
  );
}

export default SignupForm;
