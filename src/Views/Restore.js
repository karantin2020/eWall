import React from 'react';
import {
  Button,
  Container,
  Form
} from 'semantic-ui-react';
import AuthView from '../Components/AuthView.js';

const ResoreForm = props => {
  return (
    <AuthView
      title={'Restore your password'}
    >
      <Container>
        <Form.Input
          fluid
          icon="mail"
          iconPosition="left"
          placeholder="Your email"
          type="email"
        />

        <Button primary fluid size="large">
          Send me a new password
        </Button>
      </Container>
    </AuthView>
  );
};

export default ResoreForm;
