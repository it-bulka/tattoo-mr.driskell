import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './toast.scss'
import { Portal } from '@/shared/ui/Portal/Portal.tsx'

export const CustomToastContainer = () => {
  return (
    <Portal>
      <ToastContainer
        position="bottom-right"
        theme="dark"
        transition={Slide}
        autoClose={1500}
        pauseOnHover
        limit={2}
        newestOnTop={true}
      />
    </Portal>
   )
}