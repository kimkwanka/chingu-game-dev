import React from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';

class Navigation extends React.Component {
  
  render() {
    const nav = !this.props.loggedIn ? null : (<ul className="nav"><li className="navItem"><IndexLink to="/" activeClassName="navItemActive">Home</IndexLink></li>
          {/* <li className="navItem"><Link to="/resources" activeClassName="navItemActive">Resources</Link></li>*/}
          <li className="navItem"><Link to="/team" activeClassName="navItemActive">My Team</Link></li> </ul>);
    return (
      <div>
      {nav}     
      </div>
    );
  }
}

Navigation.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
};

export default connect(store => ({
  loggedIn: store.user.loggedIn,
}))(Navigation);
