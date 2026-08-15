import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Renderiza la aplicación React en el elemento con id 'root'
createRoot(document.getElementById('root')!).render(
  <StrictMode> 
    <App />
  </StrictMode>,
)
