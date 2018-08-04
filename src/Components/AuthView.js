import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
import logo from '../Static/logo.png';

class AuthView extends PureComponent {
  state = {};

  componentDidMount() {
    this.setState({
      handleMouseLeave: this.handleMouseLeave,
      handleMouseMove: this.handleMouseMove,
      handleOnFocus: this.handleOnFocus,
      handleOnBlure: this.handleOnBlure,
      raised: false
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

  handleOnFocus = () => {
    // console.log('In focus');
    this.setState({
      handleOnFocus: null,
      handleOnBlure: this.handleOnBlure,
      raised: true
    });
  };

  handleOnBlur = () => {
    // console.log('In blur');
    this.setState({
      handleOnFocus: this.handleOnFocus,
      handleOnBlure: null,
      raised: false
    });
  };

  render() {
    const { AuthMessage, children, title, className, onSubmit, action } = this.props;
    return (
      <Grid.Row centered style={{ margin: '0' }} className={className}>
        <Grid.Column
          style={{ minWidth: '320px', maxWidth: '368px' }}
          mobile={16}
          tablet={8}
          computer={8}
          verticalAlign="middle"
        >
          <Header as="h2" color="teal" textAlign="center">
            <Header.Subheader style={{paddingBottom: "1.5em"}}>
              <Image src={logo} size="tiny" as={Link} to="/" />
            </Header.Subheader>
            {title}
          </Header>
          <Form
            size="large"
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            onSubmit={onSubmit}
            action={action}
          >
            <Segment
              stacked
              raised={this.state.raised || this.state.isHovering}
              onMouseLeave={this.handleMouseLeave}
              onMouseMove={this.handleMouseMove}
            >
              {children}
            </Segment>
            {AuthMessage !== undefined ? <AuthMessage /> : null}
          </Form>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default AuthView;
