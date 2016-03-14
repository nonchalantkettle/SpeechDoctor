import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';

import Nav from './Nav.jsx';

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
      <div>
        <Nav />
        <h1>in App</h1>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
