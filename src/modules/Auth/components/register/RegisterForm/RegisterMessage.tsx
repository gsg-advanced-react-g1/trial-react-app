import { Alert, Text } from '@mantine/core'
import { Link } from '@tanstack/react-router'

const RegisterMessage = ({ serverMessage }: { serverMessage: string }) => {

    if (serverMessage.includes("Already signed in")) return <Alert color="red" className='flex flex-col'>
        <Text>{serverMessage}</Text>
        <Link to="/">Go to Home page</Link>
    </Alert>
    if (serverMessage.includes("Account already registered")) return <Alert color="red" className='flex flex-col'>
        <h5 className='font-bold'>{serverMessage}</h5>
        <Link to="/login" className='text-blue-500'>Go to login page</Link>
    </Alert>

    return <Alert color="green">{serverMessage}</Alert>
}

export default RegisterMessage