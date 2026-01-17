import { Group } from '@mantine/core'
import { Link } from '@tanstack/react-router'

const Header = () => {

    const navs = [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Products",
            href: "/products",
        },
    ]

    return (
        <header className='shadow-lg h-[45px] bg-white fixed top-0 left-0 right-0 z-50 flex items-center justify-center'>
            <Group className='flex items-center gap-10'>
                {navs.map((nav) =>
                    <Link
                        to={nav.href}
                        style={{ color: "#999" }}
                        activeOptions={{ exact: true }}
                        activeProps={{ style: { color: "black" } }}
                        className='hover:text-black transition-all duration-300'
                    >
                        {nav.label}
                    </Link>
                )}
            </Group>
        </header>
    )
}

export default Header