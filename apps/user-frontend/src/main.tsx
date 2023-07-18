import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { nonNullish } from 'utils/nonNullish.ts'

const root = document.getElementById('root')
if (!nonNullish(root)) {
  throw new Error('root is not defined');
}


ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
