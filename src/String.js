import React from 'react';

const String = (props) =>
{
  return(
    <div id="string">
      <div calss="note">{props.note}</div>
      <button id={props.id}>{props.note}</button>
      <div class="key">{props.id}</div>
    </div>
  )
}

export default String;