import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { createProductsModule } from "./modules/Products/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { router } from "./routes.tsx";
import { RouterProvider } from "@tanstack/react-router";

const { Provider: ProductsProvider } = createProductsModule();

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <MantineProvider>
        <ProductsProvider>
          <RouterProvider router={router} />
        </ProductsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
