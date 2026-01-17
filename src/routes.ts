// routes.ts
import {
    createRootRoute,
    createRoute,
    createRouter,
    Outlet,
} from "@tanstack/react-router";
import MainLayout from "./MainLayout";
import { Products } from "./modules/Products/views";
import Home from "./modules/Home/views";

const rootRoute = createRootRoute({
    component: MainLayout,
});

const productsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/products",
    component: Products,
});

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Home,
});

const routeTree = rootRoute.addChildren([homeRoute, productsRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
