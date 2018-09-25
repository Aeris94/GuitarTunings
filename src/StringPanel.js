import React from 'react';
import String from './String.js';

const StringPanel = (props) =>
{
  return(
    <div id="stringPanel">
      <String id="Q" note={props.notes[0]} />
      <String id="W" note={props.notes[1]} />
      <String id="E" note={props.notes[2]} />
      <String id="R" note={props.notes[3]} />
      <String id="T" note={props.notes[4]} />
      <String id="Y" note={props.notes[5]} />
    </div>
  )
}

export default StringPanel;