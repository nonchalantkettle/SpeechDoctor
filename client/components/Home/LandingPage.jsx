import React from 'react';
import { Row, Col } from 'react-bootstrap';

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
          <Col md={4}>
            <div id="left-landing">
              <LandingButton
                directTo={'text'}
                buttonName={'Click to analyze text'}
              />
            </div>
          </Col>
          <Col md={2} />
          <Col md={4}>
            <div id="right-landing">
              <LandingButton
                directTo={'speech'}
                buttonName={'Click to analyze speech'}
              />
            </div>
          </Col>
          <Col md={1} />
        </div>
      </Row>
    </div>
  );
}
