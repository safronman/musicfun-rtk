import { App } from '@/app/App.tsx'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
