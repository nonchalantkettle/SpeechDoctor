import React from 'react';
import { Image } from 'react-bootstrap';

export default function LandingButton(prop) {
  return (
    <div id="landingButton">
      <p>{prop.buttonName}</p>
      <Image id="landing-steth-img" src={prop.imgSrc} alt="stethoscope"/>
    </div>
  );
}
