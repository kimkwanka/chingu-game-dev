import React from 'react';
import LoginButton from './LoginButton';
import { IndexLink } from 'react-router';
import Navigation from './Navigation';

class Header extends React.Component {
  render() {
    const className = this.props.loggedIn ? '' : 'headerNotLoggedIn';
    return (
      <header className={className}>
        <div className="headerContainer">
          <IndexLink to="/"><h1 className="headerLogo"><span>Chingu!!</span><span>Game</span><span>Dev</span></h1></IndexLink>
          <LoginButton handleLogin={this.props.handleLogin} loggedIn={this.props.loggedIn} />
          <Navigation />
        </div>
      </header>
    );
  }
}
Header.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  handleLogin: React.PropTypes.func.isRequired,
};
export default Header;
