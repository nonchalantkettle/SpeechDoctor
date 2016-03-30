import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router';

export default function Nav(prop) {
  if (prop.userLoggedIn) {
    return (
      <div id="navbar">
        <Col md={12}>
          <div id="navlink"><Link onClick={prop.handleHomeClick}to="/">Home</Link></div>
          <div id="navlink"><Link to="text">Upload Text</Link></div>
          <div id="navlink"><Link to="speech">Record Speech</Link></div>
          <div id="navlink"><Link to="profile">Your Profile</Link></div>
          <div id="navlink"><Link to="/" onClick={prop.logout}>Log Out</Link></div>
        </Col>
      </div>
    );
  }
  return (
    <div id="navbar">
      <Col md={12}>
        <div id="navlink"><Link to="/">Home</Link></div>
        <div id="navlink"><Link to="text">Upload Text</Link></div>
        <div id="navlink"><Link to="speech">Record Speech</Link></div>
        <div id="navlink"><Link to="signup">Sign Up</Link></div>
        <div id="navlink"><Link to="login">Log In</Link></div>
      </Col>
    </div>
  );
}
