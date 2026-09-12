import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PausedOverlay from './PausedOverlay.jsx'

// =============================================
// 🔴 SITE PAUSED — Payment pending from client
// To UNPAUSE: Change the line below to → const SITE_PAUSED = false
// =============================================
const SITE_PAUSED = true

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {SITE_PAUSED ? <PausedOverlay /> : <App />}
  </StrictMode>,
)
