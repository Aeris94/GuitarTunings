import React from 'react';

const OptionPanel = (props) =>
{
  return(
    <div id="optionPanel">
      <div id="tunningName">Tunning:</div>
      <select id="options" onChange = {props.onChange}>
        {props.options.map((item) => {
          return(
            <option value={item}>{item}</option>
          )})}
      </select>
    </div>
  )
}

export default OptionPanel;