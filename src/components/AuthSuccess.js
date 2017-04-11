/* global window */
// Based on https://github.com/jaredhanson/passport-facebook/issues/188
import React from 'react';
import { connect } from 'react-redux';

class AuthSuccess extends React.Component {
  componentDidMount() {
    window.opener.loginSuccess(this.props.user, this.props.team, this.props.teams);
    window.opener.loginSuccess = null;
    window.close();
  }
  render() {
    return (
      <div>Authentication successful.</div>
    );
  }
}

AuthSuccess.propTypes = {
  user: React.PropTypes.shape({
    name: React.PropTypes.string,
    loggedIn: React.PropTypes.bool,
    lastLogin: React.PropTypes.number,
    avatar: React.PropTypes.string,
  }).isRequired,
  team: React.PropTypes.shape({
    name: React.PropTypes.string,
    tasks: React.PropTypes.array,
    id: React.PropTypes.string,
    members: React.PropTypes.array,
  }).isRequired,
  teams: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default connect(store => ({
  user: store.user,
  team: store.team,
  teams: store.teams,
}))(AuthSuccess);

