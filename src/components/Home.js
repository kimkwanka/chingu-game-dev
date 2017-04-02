/* global window */
import React from 'react';
import { connect } from 'react-redux';
import HomeMarkdown from '../markdown/home.md';

class Home extends React.Component {
  handleLoginClick = (e) => {
    e.preventDefault();
    window.loginSuccess = this.props.handleLogin;
    const url = '/login';
    const name = 'Github Login';
    const specs = 'width=600,height=600';
    window.open(url, name, specs);
  }
  render() {
    const content = !this.props.loggedIn ? (
      <div className="searchHero">
        <div className="heroContent">
          <h1 className="heroTitle"><span>Chingu</span><span>Game</span><span>Dev</span></h1>
          <h3 className="heroSubTitle">LEVEL 0: &quot;The Clone&quot; is here at last!</h3>
          <a onClick={this.handleLoginClick} className="button heroLoginButton" href="/login"><span>GET STARTED</span><span> &gt;</span></a>
        </div>
      </div>
    ) : (
      <div className="homeContent">
        <HomeMarkdown />
      </div>
    );
    return (
      content
    );
  }
}

Home.propTypes = {
  handleLogin: React.PropTypes.func.isRequired,
  loggedIn: React.PropTypes.bool.isRequired,
};

export default connect(store => ({
  userName: store.user.name,
  loggedIn: store.user.loggedIn,
}))(Home);
