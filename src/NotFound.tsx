import { Link } from '@tanstack/react-router'

const NotFound = ({ msg, path }: { msg?: string, path?: string }) => {
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100 gap-10'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-4xl font-bold text-center text-gray-600'>404</h1>
                <h2 className='text-center text-gray-600 text-2xl'> Page Not Found</h2>
            </div>
            <Link to={path || "/"}>
                <button className='px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600'>
                    {msg || "Go to Home"}
                </button>
            </Link>
        </div>
    )
}

export default NotFound