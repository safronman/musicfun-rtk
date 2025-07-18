import { Header, LinearProgress } from '@/common/components'
import { useGlobalLoading } from '@/common/hooks'
import { Routing } from '@/common/routing'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import s from './App.module.css'

export const App = () => {
  const isGlobalLoading = useGlobalLoading()

  return (
    <>
      <Header />
      {isGlobalLoading && <LinearProgress />}
      <div className={s.layout}>
        <Routing />
      </div>
      <ToastContainer />
    </>
  )
}
