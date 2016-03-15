import React from 'react';
import { Link } from 'react-router';

export default class LandingButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: false,
    };
  }

  render() {
    return (
      <div id="landingButton">
        <Link
          onClick={this.props.handleLandingBtnClick}
          to={this.props.directTo}>
            {this.props.buttonName}
        </Link>
      </div>
    );
  }
}
