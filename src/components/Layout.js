import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { hydrateUser } from '../actions/userActions';
import { hydrateTeam } from '../actions/teamActions';

class Layout extends React.Component {
  handleLogin = (user, team) => {
    this.props.dispatch(hydrateUser(user));
    this.props.dispatch(hydrateTeam(team));
  }
  render() {
    // Pass handleLogin to all children
    const children = React.Children.map(this.props.children,
     child => React.cloneElement(child, {
       handleLogin: this.handleLogin,
     }));
    return (
      <div>
        <Header handleLogin={this.handleLogin} loggedIn={this.props.loggedIn} />
        <main>
          {children}
        </main>
      </div>
    );
  }
}
Layout.propTypes = {
  children: React.PropTypes.node,
  loggedIn: React.PropTypes.bool.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};
Layout.defaultProps = () => ({ children: null });

export default connect(store => ({
  loggedIn: store.user.loggedIn,
}))(Layout);
