/* eslint-disable react-refresh/only-export-components */
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
import SpecialProducts from "./modules/Products/views/SpecialProducts";
import { Register } from "./modules/Auth/views/register";
import Login from "./modules/Auth/views/login";
import { requireGuest } from "./modules/Auth/utils/routeGuards";

const rootRoute = createRootRoute({
    component: MainLayout,
    notFoundComponent: () => <NotFound />,
});

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Home,
});

const registerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/register",
    component: Register,
    beforeLoad: requireGuest,
});

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: Login,
    beforeLoad: requireGuest,
});

const productsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/products",
    component: () => <Outlet />,
});

const productsIndexRoute = createRoute({
    getParentRoute: () => productsRoute,
    path: "/",
    component: Products,
});

export const productDetailRoute = createRoute({
    getParentRoute: () => productsRoute,
    path: "$id",
    component: ProductDetails,
});

export const SpecialProductsRoute = createRoute({
    getParentRoute: () => productsRoute,
    path: "special-products",
    component: SpecialProducts,
});

const routeTree = rootRoute.addChildren([
    homeRoute,
    registerRoute,
    loginRoute,
    productsRoute.addChildren([productsIndexRoute, SpecialProductsRoute, productDetailRoute]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
