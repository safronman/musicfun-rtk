import { store } from '@/app/model/store.ts'
import { App } from '@/app/ui/App.tsx'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
)
