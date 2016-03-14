import React from 'react';
// import ReactDOM from 'react-dom';
// import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';

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
        <h2><a href="#">Home</a></h2>
        <h2><a href="#">Text</a></h2>
        <h2><a href="#">Speech</a></h2>
      </div>
    );
  }
}
