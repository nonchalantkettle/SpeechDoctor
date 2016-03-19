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
      onLandingPage: this.chooseRenderForm(),
    };
  }

  handleHomeClick = () => {
    this.setState({
      onLandingPage: true,
    });
  }

  handleLandingBtnClick = () => {
    this.setState({
      onLandingPage: this.chooseRenderForm(),
    });
  }

  chooseRenderForm = () => {
    let pathHash = window.location.hash;
    if (pathHash.includes('text') || pathHash.includes('speech') || pathHash.includes('profile')) {
      this.setState({
        onLandingPage: false,
      });
    } else {
      this.setState({
        onLandingPage: true,
      });
    }
  }

  render() {
    const Children = React.cloneElement(this.props.children, {
      state: this.state,
      handleLandingBtnClick: this.handleLandingBtnClick,
    });
    return (
      <div>
        <Nav onLandingPage={this.state.onLandingPage} handleHomeClick={this.handleHomeClick}/>
        {Children}
      </div>
    );
  }
}

class LandingPageHandler extends React.Component {
  render() {
    return (
      <LandingPage handleLandingBtnClick={this.props.handleLandingBtnClick} />
    )
  }
}

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LandingPageHandler} />
      <Route path="/speech" component={SpeechView} />
      <Route path="/text" component={TextView} />
    </Route>
  </Router>,
  app);
