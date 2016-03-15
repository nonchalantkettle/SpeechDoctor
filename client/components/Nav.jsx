import React from 'react';
import { Link } from 'react-router';

export default class Nav extends React.Component {
  render() {
    return (
      <div id="navbar">
        {
          this.props.onLandingPage ? <Link to="profile">Profile</Link> :
            <div>
              <Link onClick={this.props.handleHomeClick}to="/">Home</Link>
              <Link to="text">TextView</Link>
              <Link to="speech">Speech</Link>
              <Link to="profile">Profile</Link>
            </div>
        }
      </div>
    );
  }
}
