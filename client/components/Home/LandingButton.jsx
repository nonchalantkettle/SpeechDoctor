import React from 'react';

export default function LandingButton(prop) {
  return (
    <div id="landingButton">
      <p>{prop.buttonName}</p>
      <img id="landing-steth-img" src={prop.imgSrc} alt="stethoscope"/>
    </div>
  );
}
