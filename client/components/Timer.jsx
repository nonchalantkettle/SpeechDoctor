import React from 'react';

export default function Timer(prop) {
  const secondsLessThan10 = (prop.getSeconds() < 10) ?
    <h3 id="timer">{prop.getMinutes()}:0{prop.getSeconds()}</h3> :
    <h3 id="timer">{prop.getMinutes()}:{prop.getSeconds()}</h3>;

  return (
    <div>
      {secondsLessThan10}
    </div>
  );
}
