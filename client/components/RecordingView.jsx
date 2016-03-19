import React from 'react';
import SpeechAnalytics from './SpeechAnalytics.jsx';

export default class RecordingView extends React.Component {

 constructor(props) {
   super(props);
   this.state = {
     recording: false,
     results: '',
     showTranscript: false,
     clearHearing: true,
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
   //Right now, it will stop recording when the user stops speaking for a few seconds
   const recognition = new webkitSpeechRecognition();
   recognition.continuous = true;
   recognition.interimResults = true;

   recognition.onresume = () => {
     console.log("continuting")
   }

   recognition.onend = () => {
     recognition.start()
   }

   recognition.onresult = (event) => {
     console.log(event.results)
     let returnedTranscript = "";
     let threshold = 0.75;
     let confidence = true;

     for(let i = 0; i < event.results.length; i++){
       if(event.results[i][0].confidence  < threshold){
         confidence = false;
       } else {
         confidence = true;
       }
       returnedTranscript += event.results[i][0].transcript
     }

     this.setState({
       results: returnedTranscript,
       clearHearing: confidence,
     });
   }

   recognition.start()

 }

 render() {
   let hearingClearly = this.state.clearHearing ?  <div></div> :
   <div>Sorry, we are having trouble understanding you
   Please speek more clearly</div>

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
       <span>{hearingClearly}</span>
       {/*Make this button toggle between Record and Stop Recording ALSO WHAT IS ALT*/}
       <div>
         <div id='rendered-speech'>{this.state.results}</div>
       </div>
     </div>
   );
 }
}
