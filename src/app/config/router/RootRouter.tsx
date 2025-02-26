import { Outlet } from 'react-router'

export const RootRouter = () => {
  return (
    <div>
      <header>header</header>
      <Outlet />
      <footer>footer</footer>
    </div>
  )
}