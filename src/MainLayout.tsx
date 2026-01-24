import { Outlet } from '@tanstack/react-router'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <div className='min-h-screen'>
        <Outlet />
      </div>
    </>
  )
}

export default MainLayout
