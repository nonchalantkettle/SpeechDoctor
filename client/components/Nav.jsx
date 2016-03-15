import React from 'react';
import { Link } from 'react-router';

export default class Nav extends React.Component {
  render() {
    return (
      <div id="navbar">
        {
          this.props.onLandingPage ? <ul><li id="navlink"><Link to="profile">Profile</Link></li></ul> :
            <div>
              <ul>
                <li id="navlink"><Link onClick={this.props.handleHomeClick}to="/">Home</Link></li>
                <li id="navlink"><Link to="text">TextView</Link></li>
                <li id="navlink"><Link to="speech">Speech</Link></li>
                <li id="navlink"><Link to="profile">Profile</Link></li>
              </ul>
            </div>
        }
      </div>
    );
  }
}
