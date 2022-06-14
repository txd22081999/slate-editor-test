import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import MyEditor from './components/MyEditor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <MyEditor />
    </div>
  )
}

export default App
