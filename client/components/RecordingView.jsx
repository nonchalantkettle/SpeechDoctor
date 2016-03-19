import React from 'react';
import SpeechAnalytics from './SpeechAnalytics.jsx';

export default class RecordingView extends React.Component {

 constructor(props) {
   super(props);
   this.state = {
     recording: false,
     results: '',
     showTranscript: false,
   };
 }

 handleClick() {
   this.setState({
     recording: !this.state.recording,
   });
 }

 displayTranscript() {
   this.setState({
     showTranscript: !this.state.showTranscript,
   });
 }

 listener = () => {
   //we might want to remove this, in place for recognition.onstart/onend
   this.handleClick();
   const recognition = new webkitSpeechRecognition();
   recognition.continuous = true;
   recognition.interimResults = true;

   recognition.onstart = () =>{
      recognizing: this.state.recording,
   }

   recognition.onend = () =>{
      recognizing: this.state.recording,
   }

   recognition.onresult = (event) => {
     this.setState({
       results: event.results[0][0].transcript,
     });
   }
   recognition.start();
 }

 render() {
   //let transcript = this.state.showTranscript ? <div>{this.state.showTranscript}</div> : <div></div>
   let currentState = this.state.recording ? <div>Recording...</div> : <div>Star recording now</div>
   return (
     <div>
       <div id='speech-input'>
         <div id="recording-view">
           <button className="record-button" onClick={this.listener}>
             <img id="record-img" src="assets/record.png" alt="record"/>
           </button>
           <img id="record-img" src="assets/play.png" alt="play"/>
           <img id="record-img" src="assets/pause.png" alt="pause"/>
         </div>
       </div>
       <span>{currentState}</span>
       {/*Make this button toggle between Record and Stop Recording ALSO WHAT IS ALT*/}
       <div>
         <div id='rendered-speech'>{this.state.results}</div>
       </div>
     </div>
   );
 }
}
