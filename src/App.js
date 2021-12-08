import React from 'react'
import { Devices } from './features/device/Devices'
import { Matrix } from './features/matrix/Matrix'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Studio Manager</h1>
      </header>
      <main>
        <Devices />
        <Matrix />
      </main>
    </div>
  )
}

export default App