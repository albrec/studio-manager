import React, { useState } from 'react'
import { Devices } from './features/device/Devices'
import { Matrix } from './features/matrix/Matrix'
import { ImportExport } from './features/files/ImportExport'
import './App.scss'
import classNames from 'classnames'

function App() {
  const DEVICES = 'DEVICES'
  const MATRIX = 'MATRIX'
  const [openTab, setOpenTab] = useState(DEVICES)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Studio Manager</h1>
        <ImportExport />
        <ul className="tabs">
          <li><button onClick={ (e) => setOpenTab(DEVICES) } className={ classNames({ active: openTab === DEVICES }) }>Devices</button></li>
          <li><button onClick={ (e) => setOpenTab(MATRIX) } className={ classNames({ active: openTab === MATRIX }) }>Matrix</button></li>
        </ul>
      </header>
      <main>
        { openTab === DEVICES && <Devices /> }
        { openTab === MATRIX &&<Matrix /> }
      </main>
    </div>
  )
}

export default App