import React from 'react';
import { Link } from 'react-router';

export default class Nav extends React.Component {
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
        <Link to="/home"> Home </Link>
        <Link to="text"> Analyze Text </Link>
        <Link to="speech"> Analyze Speech </Link>
      </div>
    );
  }
}
