import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count < 0) {
      alert("Count cannot be Negative");
      setCount(0)
    }
  },[count])
  return (
    <>
      <h1>Counter</h1>
      <div className="card">
        <button onClick={() => setCount(count + 1)} >+</button>
        <h2>{count}</h2>
        <button onClick={() => setCount(count - 1)} >-</button>
      </div>
    </>
  )
}

export default App
