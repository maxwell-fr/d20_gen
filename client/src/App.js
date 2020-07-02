import React from 'react';
import './App.css';

import Navbar from './components/Navbar';
import CreatePassphrase from './components/CreatePassphrase';

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <CreatePassphrase />
      </div>
    </div>
  );
}

export default App;
