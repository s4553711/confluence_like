import { useState } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import { useOutletContext } from "react-router-dom";
import viteLogo from '/vite.svg'
import './App.css'

import AuthConsumer from './AuthProvider2.jsx';

function App() {
	const [count, setCount] = useState(0)
	const { token, onLogin } = useOutletContext();
	const token2 = AuthConsumer().token2;

	React.useEffect(() => {
	}, [])

  return (
    <>
      <div>
		<span>{token}</span>
		<span>{token2}</span>
		<button onClick={onLogin} className="btn btn-info">Click</button>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
