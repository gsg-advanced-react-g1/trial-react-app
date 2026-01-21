import { Outlet } from '@tanstack/react-router'
import Header from './components/Header'

const MainLayout = () => {
    return (
        <div>
            <div className='mb-11.25'>
                <Header />
            </div>
            <div className='min-h-screen'>
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout
