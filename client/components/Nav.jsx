import React from 'react';
import { Link } from 'react-router';

export default function Nav(prop) {
  return (
    <div id="navbar">
      <div id="navlink"><Link onClick={prop.handleHomeClick}to="/">Home</Link></div>
      <div id="navlink"><Link to="text">Upload Text</Link></div>
      <div id="navlink"><Link to="speech">Record Speech</Link></div>
      <div id="navlink"><Link to="profile">Your Profile</Link></div>
    </div>
  );
}
