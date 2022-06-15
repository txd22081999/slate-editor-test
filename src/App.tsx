import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import DragArea from './components/DragArea'
import MyEditor from './components/MyEditor'

function App() {
  return (
    <div className='App'>
      <MyEditor />
      {/* <DragArea /> */}
    </div>
  )
}

export default App
