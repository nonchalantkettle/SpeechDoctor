import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

import LandingButton from './LandingButton.jsx';

export default function LandingPage() {
  return (
    <div id="landing">
      <Row>
        <Col md={12}>
          <h1 id="landing-title">SpeechDoctor</h1>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h3 id="subtitle">Personalized analytics on your speaking and writing</h3>
        </Col>
      </Row>
      <Row>
        <div id="landing-buttons">
          <Col md={1} />
          <Col md={4} id="noLinkHover">
            <Link to="text">
              <div id="left-landing">
                <LandingButton
                  buttonName={'Click to analyze text'}
                  imgSrc={'assets/pen.png'}
                />
              </div>
            </Link>
          </Col>
          <Col md={2} />
          <Col md={4} id="noLinkHover">
            <Link to="speech">
              <div id="right-landing">
                <LandingButton
                  buttonName={'Click to analyze speech'}
                  imgSrc={'assets/microphone.png'}
                />
              </div>
            </Link>
          </Col>
          <Col md={1} />
        </div>
      </Row>
    </div>
  );
}
