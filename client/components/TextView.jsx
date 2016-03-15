import React from 'react';
import InputForm from './InputForm.jsx';

export default class TextView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showAnalytics: false,
    };
  }

  handleClick() {
    this.setState({
      showAnalytics: true,
    });
  }

  render() {
    return (
      <div>
        <h1>Text Analyzer</h1>
         <InputForm />
           <button>
            Analyze Text
           </button>
         {/*
          TextAnalytics component below "Analyze Button"
        */}
        
      </div>
    );
  }
}
