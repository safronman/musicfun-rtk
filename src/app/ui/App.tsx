import { useGlobalLoading } from '@/common/hooks/useGlobalLoading.ts'
import { ToastContainer } from 'react-toastify'
import { Header, LinearProgress } from '@/common/components'
import { Routing } from '@/common/routing'
import 'react-toastify/dist/ReactToastify.css'
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
