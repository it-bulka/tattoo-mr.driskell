import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './toast.scss'

export const CustomToastContainer = () => {
  return (
    <ToastContainer
      position="bottom-right"
      theme="dark"
      transition={Slide}
      autoClose={1500}
      pauseOnHover
      limit={2}
      newestOnTop={true}
    />
   )
}