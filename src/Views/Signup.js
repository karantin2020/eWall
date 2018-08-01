import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react';
import logo from '../Static/logo.png';

class LoginForm extends PureComponent {
  state = {};

  componentDidMount() {
    this.setState({
      handleMouseLeave: this.handleMouseLeave,
      handleMouseMove: this.handleMouseMove
    });
  }

  handleMouseLeave = () => {
    this.setState({
      isHovering: false,
      handleMouseLeave: null,
      handleMouseMove: this.handleMouseMove
    });
  };

  handleMouseMove = () => {
    this.setState({
      isHovering: true,
      handleMouseLeave: this.handleMouseLeave,
      handleMouseMove: null
    });
  };

  render() {
    const { handleMouseLeave, handleMouseMove, isHovering } = this.state;
    const formStyle = {
      position: 'relative',
      boxShadow: '0 1px 2px #ccc',
      ...(isHovering && {
        boxShadow: '0 2px 8px #bbb'
      })
    };
    return (
      <div style={{ height: '100%' }} className="login-form">
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450, minWidth: 250 }}>
            <Header as="h2" color="teal" textAlign="center">
              <Image src={logo} /> Create your new account
            </Header>
            <Form
              size="large"
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              style={formStyle}
            >
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Your name"
                  type="text"
                />
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="Your email"
                  type="email"
                />

                <Button primary fluid size="large">
                  Sign up
                </Button>
              </Segment>
            </Form>
            <Message>
              Already signed up?{' '}
              <Link style={{ display: 'inline-block' }} to="/login">
                Log in
              </Link>{' '}
              or go to{' '}
              <Link style={{ display: 'inline-block' }} to="/">
                Homepage
              </Link>
              <br/>
              Restore your{' '}
              <Link style={{ display: 'inline-block' }} to="/restore">
                password
              </Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default LoginForm;
