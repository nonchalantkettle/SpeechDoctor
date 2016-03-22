import React from 'react';
import { Link } from 'react-router';

export default function LandingButton(prop) {
  return (
    <div id="landingButton">
      <Link onClick={prop.handleLandingBtnClick} to={prop.directTo}>
        {prop.buttonName}
      </Link>
    </div>
  );
}
