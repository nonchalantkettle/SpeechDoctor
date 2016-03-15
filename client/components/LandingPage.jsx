import React from 'react';
import { Link } from 'react-router';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: false,
    };
  }

  handleClick() {
    this.setState({
      showText: true,
    });
  }
  render() {
    return (
      <div>
        <h1>Landing Page!</h1>
        <Link to="text"> Analyze Text </Link>
        <Link to="speech"> Analyze Speech </Link>
      </div>
    );
  }
}
