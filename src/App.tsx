import './App.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import { createProductsModule } from './modules/Products/index.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ProductRouter } from './modules/Products/index.tsx';
import { BrowserRouter } from 'react-router-dom';

const { Provider: ProductsProvider } = createProductsModule();

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <ProductsProvider>
          <BrowserRouter>
            <ReactQueryDevtools />
            <ProductRouter />
          </BrowserRouter>
        </ProductsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
