import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';

import Nav from './Nav';


class App extends React.Component {
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
      <Nav />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
