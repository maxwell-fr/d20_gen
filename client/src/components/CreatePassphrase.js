import React, { useState } from 'react';
import axios from 'axios';

import Passphrase from './Passphrase';

const CreatePassphrase = () => {
  const [numWords, setNumWords] = useState(4);
  const [passphrase, setPassphrase] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get(`/generate/${numWords}`);
    setPassphrase(res.data.passphrase);
  };

  const onChange = (e) => setNumWords(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className="form-container">
        <h3>Select the length of the passphrase</h3>
        <input
          type="range"
          min="1"
          max="8"
          value={numWords}
          id="slider"
          className="slider"
          onChange={onChange}
        />
        <p className="text-center">{numWords}</p>
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
