import React, { useState } from 'react';
import axios from 'axios';

import Passphrase from './Passphrase';
import InputChooser from './InputChooser';

const CreatePassphrase = () => {
  const [numWords, setNumWords] = useState(4);
  const [codeWords, setCodeWords] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [passtype, setPassType] = useState('num');

  const onSubmit = async (e) => {
    e.preventDefault();
    var param;
    if(passtype === "num") {
      param = numWords;
    }
    else {
      param = codeWords;
    }

    const res = await axios.get(`/generate/${param}`);
    setPassphrase(res.data.passphrase);

  };

  const onSlideChange = (e) => setNumWords(e.target.value);
  const onTextChange = (e) => {
    if(isNaN(e.target.value)){
      setCodeWords(e.target.value);
    }
    else{
      setCodeWords("");
    }
  }
  const onTypeChange = (e) => setPassType(e.target.value);


  return (
    <div>
      <form onSubmit={onSubmit} className="form-container">
        <div className="text-center">
          <h3>Select passphrase generation method</h3>
          <label for="typenum" className="radiolabel">
            <input type="radio" id="typenum" value="num" name="passtype" onChange={onTypeChange} checked={passtype === "num"}/>
            <span className="radio1">Standard</span>
          </label>
          <label for="typecode" className="radiolabel">
            <input type="radio" id="typecode" value="code" name="passtype" onChange={onTypeChange} checked={passtype ==="code"}/>
            <span className="radio1">Coded Phrase</span>
          </label>
        </div>
        <br/><br/>
        <InputChooser inputType={passtype} onTextChange={onTextChange} onSlideChange={onSlideChange} slideValue={numWords} textValue={codeWords} />        
        
        <input
          type="submit"
          value="Generate"
          className="btn btn-primary btn-block"
        />
      </form>
      <Passphrase passphrase={passphrase} />
    </div>
  );
};

export default CreatePassphrase;
