import React, { PureComponent } from 'react';
// import { Redirect } from 'react-router-dom';
import { Form } from 'semantic-ui-react';

class ShadowForm extends PureComponent {
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
    const { children, style, history, ...rest } = this.props;
    const formStyle = {
      position: 'relative',
      boxShadow: '0 1px 2px #ccc',
      ...(isHovering && {
        boxShadow: '0 2px 8px #bbb'
      })
    };
    // console.log(getUrlParams(history.location.search)['from']);
    var from = urlQuery(history.location.search)['from'];
    if (from === undefined) {
      from = '/';
    }
    // console.log(from)
    return (
      <Form
        size="large"
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{ ...formStyle, ...style }}
        onSubmit={toFrom(history)}
        {...rest}
      >
        {children}
      </Form>
    );
  }
}

function toFrom(history) {
  var from = urlQuery(history.location.search)['from'];
  if (from === undefined) {
    from = '/';
  }
  return ()=>(history.push(from);)
}

function urlQuery(search) {
  let hashes = search.slice(search.indexOf('?') + 1).split('&');
  return hashes.reduce((params, hash) => {
    let [key, val] = hash.split('=');
    return Object.assign(params, { [key]: decodeURIComponent(val) });
  }, {});
}

export default ShadowForm;
