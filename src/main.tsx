// =============================================================================
// KAIROS FRONTEND - FIXED MAIN ENTRY POINT
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/main.tsx
// =============================================================================

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'  // CHANGED: Import index.css instead of styles/globals.css
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)