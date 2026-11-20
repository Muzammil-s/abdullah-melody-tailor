import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TailorProvider } from './context/TailorContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TailorProvider>
      <App />
    </TailorProvider>
  </React.StrictMode>,
)
