/* global window */
import React from 'react';

class LoginButton extends React.Component {
  handleClick = (e) => {
    e.preventDefault();
    window.loginSuccess = this.props.handleLogin;
    const url = '/login';
    const name = 'Github Login';
    const specs = 'width=600,height=600';
    window.open(url, name, specs);
  }
  render() {
    const button = (!this.props.loggedIn) ? <a onClick={this.handleClick} className="button loginButton" href="/login">Sign in with slack</a>
                : <a className="button loginButton" href="/logout">Logout</a>;
    return (
      button
    );
  }
}
LoginButton.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  handleLogin: React.PropTypes.func.isRequired,
};
export default LoginButton;
