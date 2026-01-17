import {
    createRootRoute,
    createRoute,
    createRouter,
    Outlet,
} from "@tanstack/react-router";
import MainLayout from "./MainLayout";
import { Products } from "./modules/Products/views";
import Home from "./modules/Home/views";
import ProductDetails from "./modules/Products/views/ProductDetails";
import NotFound from "./NotFound";

const rootRoute = createRootRoute({
    component: MainLayout,
    notFoundComponent: () => <NotFound />,
});

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Home,
});

// /products layout (ONLY outlet)
const productsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/products",
    component: () => <Outlet />,
});

// /products (index)
const productsIndexRoute = createRoute({
    getParentRoute: () => productsRoute,
    path: "/",
    component: Products,
});

// /products/$id (details)
export const productDetailRoute = createRoute({
    getParentRoute: () => productsRoute,
    path: "$id", // ✅ no leading slash
    component: ProductDetails,
});

const routeTree = rootRoute.addChildren([
    homeRoute,
    productsRoute.addChildren([productsIndexRoute, productDetailRoute]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
