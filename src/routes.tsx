import {
    createRootRoute,
    createRoute,
    createRouter,
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

const productsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/products",
    component: Products,
    notFoundComponent: () => <NotFound msg="Product Not Found" path="/products" />,
});

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Home,
});

const productDetailRoute = createRoute({
    getParentRoute: () => productsRoute,
    path: "/$id",
    component: ProductDetails,
});

const routeTree = rootRoute.addChildren([homeRoute, productsRoute, productDetailRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
