import { Header } from '@/common/components/Header/Header.tsx'
import { Routing } from '@/common/routing/Routing.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import s from './App.module.css'

export const App = () => {
  return (
    <>
      <Header />
      <div className={s.layout}>
        <Routing />
      </div>
      <ToastContainer />
    </>
  )
}
