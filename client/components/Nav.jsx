import React from 'react';
import { Link } from 'react-router';

export default class Nav extends React.Component {
  render() {
    return (
      <div id="navbar">
        {
          this.props.onLandingPage ? <div><div id="navlink"><Link to="profile">Your Profile</Link></div></div> :
            <div>
              <div id="navlink"><Link onClick={this.props.handleHomeClick}to="/">Home</Link></div>
              <div id="navlink"><Link to="text">Upload Text</Link></div>
              <div id="navlink"><Link to="speech">Record Speech</Link></div>
              <div id="navlink"><Link to="profile">Your Profile</Link></div>
            </div>
        }
      </div>
    );
  }
}
