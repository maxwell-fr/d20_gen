import React from 'react';

const InputChooser = ({ inputType ,  onSlideChange ,  slideValue , onTextChange, textValue } ) => {
    switch(inputType) {
        case 'num':
          return (
            <div>
              <h3>Select the length of the passphrase</h3>
              <input
                type="range"
                min="1"
                max="8"
                value={slideValue}
                id="slider"
                className="slider"
                onChange={onSlideChange}
              />
              <p className="text-center">{slideValue}</p>
            </div>
          );

        case 'code':
          return (
            <div>
              <h3>Enter codeword(s)</h3>
              <input 
                type="text"
                value={textValue}
                id="textinput"
                className="textInput"
                onChange={onTextChange}
              />
            </div>
          );

        default:
          return (
            <div>Weird...</div>
          );
      }
}

export default InputChooser;