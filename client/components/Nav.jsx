import React from 'react';
import { Link } from 'react-router';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: false,
    };
  }

  render() {
    return (
      <div>
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
