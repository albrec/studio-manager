import React from 'react';
import { Devices } from './features/device/Devices';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Studio Manager</h1>
      </header>
      <main>
        <Devices />
      </main>
    </div>
  );
}

export default App;
