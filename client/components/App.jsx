import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import TextView from './TextView.jsx';
import SpeechView from './SpeechView.jsx';
import Nav from './Nav.jsx';
import LandingPage from './LandingPage.jsx';

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
        {this.props.children}
      </div>
    );
  }
}

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LandingPage} />
      <Route path="/speech" component={SpeechView} />
      <Route path="/text" component={TextView} />
    </Route>
  </Router>,
  app);
