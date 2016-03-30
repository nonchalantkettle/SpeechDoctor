import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

import LandingButton from './LandingButton.jsx';

export default function LandingPage() {
  return (
    <div>
      <Row>
        <Col md={12}>
          <h1>SpeechDoctor</h1>
        </Col>
      </Row>
      <Row>
        <div id="landing-buttons">
          <Col md={1} />
          <Col md={4} id="noLinkHover">
            <Link to="speech">
              <div id="left-landing">
                <LandingButton
                  buttonName={'Click to analyze text'}
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
