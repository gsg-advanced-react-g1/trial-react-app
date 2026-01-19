
import "./App.css";
import "@mantine/core/styles.css";
import "lenis/dist/lenis.css";
import { MantineProvider } from "@mantine/core";
import { ReactLenis } from "lenis/react";
import { createProductsModule } from "./modules/Products/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { router } from "./router";
import { RouterProvider } from "@tanstack/react-router";

const { Provider: ProductsProvider } = createProductsModule();

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <MantineProvider>
        <ReactLenis root options={{ autoRaf: true, lerp: 0.08, duration: 1.4 }}>
          <ProductsProvider>
            <ReactQueryDevtools />
            <RouterProvider router={router} />
          </ProductsProvider>
        </ReactLenis>
      </MantineProvider >
    </QueryClientProvider >
  );
}

export default App;
