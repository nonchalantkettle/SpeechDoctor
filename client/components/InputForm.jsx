import React from 'react';

export default function InputForm(prop) {
  return (
    <div>
      <textarea
        className="inputForm"
        placeholder="The doctor will see you now!  Type or paste in your text sample here."
        type="text"
        rows="30"
        cols="150"
        onChange={prop.handleChange}
        value={prop.text}
      />
      <br />
      <button onClick={prop.analyzeText}>Analyze</button>
      <button onClick={prop.resetText}>Reset</button>
    </div>
  );
}
