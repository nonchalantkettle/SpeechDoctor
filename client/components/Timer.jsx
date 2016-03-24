import React from 'react';

export default function Timer(props) {
  const secondsLessThan10 = (props.getSeconds() < 10) ?
    <h3 id="timer">{props.getMinutes()}:0{props.getSeconds()}</h3> :
    <h3 id="timer">{props.getMinutes()}:{props.getSeconds()}</h3>;

  return (
    <div>
      {secondsLessThan10}
    </div>
  );
}
