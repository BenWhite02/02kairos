// =============================================================================
// KAIROS FRONTEND - FIXED MAIN ENTRY POINT
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/main.tsx
// =============================================================================

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'  // Fixed: Import from correct path
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)