import {
    createRouter,
    createRoute,
    createRootRoute,
    Outlet,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Products as ProductsList } from './modules/Products/views/index'
import { ProductDetails } from './modules/Products/views/ProductDetails'

// Define the Root Route
const rootRoute = createRootRoute({
    component: () => (
        <>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
})

// Define the Index Route
const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: ProductsList,
})

// Define the Product Route
export const productRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '$productId',
    component: ProductDetails,
})

// Create the route tree
const routeTree = rootRoute.addChildren([indexRoute, productRoute])

// Create the router
export const router = createRouter({ routeTree })

// Register the router for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
