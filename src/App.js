import React, { Component } from 'react';
import './App.css';
import OptionPanel from './OptionPanel.js';
import StringPanel from './StringPanel.js';

class App extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { 
      keyCodes: { 
        "81": "Q",
        "87": "W",
        "69": "E",
        "82": "R",
        "84": "T",
        "89": "Y"},
      tunningsNames: [],
      activeTunning: [],
      synth: null,
    }
    
    this.animateString = this.animateString.bind(this);
    this.playSound = this.playSound.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }
  
  componentWillMount()
  {
  fetch('https://gist.githubusercontent.com/Aeris94/1100fd6021accab70a73b95524c48dd8/raw/fc6695684e7d7c118f057c1495806213b1c06db0/QuitarTunnings.json')
  .then(response => response.json())
  .then(myJson => {
      this.setState({tunningsNames: myJson.tunningNames, activeTunning: myJson.Standard, synth: new window.Tone.PolySynth(6, window.Tone.QuitarSynth).toMaster()});
  });
}
  
  componentDidMount()
  {
    const sound = this.playSound;
    const keyCodes = this.state.keyCodes;
    const animate = this.animateString;
    
    document.querySelectorAll('button').forEach(function(button){
	    button.addEventListener('click', function(e){
		    sound(e.target.textContent);
        animate(e.target.id);
      })
    })
    
    document.addEventListener('keydown', function(e){
      if(keyCodes.hasOwnProperty(e.keyCode))
      {
        let id = keyCodes[e.keyCode];
        let button = document.getElementById(id);
        sound(button.textContent);
        animate(button.id);
      }
    })
  }
  
  playSound(note)
  {
     this.state.synth.triggerAttackRelease(note, '3n'); 
  }
  
  animateString(stringId)
  {
   
    document.getElementById(stringId).animate([
  // keyframes
  { transform: 'translateY(0px)' }, 
  { transform: 'translateY(-2px)' },
  { transform: 'translateY(0px)' },
  { transform: 'translateY(2px)' },    
], { 
  // timing options
  duration: 50,
  iterations: 20
});
  }
  
  handleOptionChange()
  {
     let select = document.getElementById("options");
     let selectedOption = select.options[select.selectedIndex].text;
   fetch('https://gist.githubusercontent.com/Aeris94/1100fd6021accab70a73b95524c48dd8/raw/fc6695684e7d7c118f057c1495806213b1c06db0/QuitarTunnings.json')
  .then(response => response.json())
  .then(myJson => {
      this.setState({activeTunning: myJson[selectedOption]});
    });     
  }
  
  render()
  {
    return(
      <div id="tunningsApp">
        <OptionPanel options={this.state.tunningsNames} 
                     onChange={this.handleOptionChange}/>
        <StringPanel notes={this.state.activeTunning} />
          <div id="footer">@Created by Ada</div>
      </div>
    )
  }
}

export default App;
