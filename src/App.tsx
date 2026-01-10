import './App.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Products from './modules/Products/views';

import { createProductsModule } from './modules/Products/index.tsx';

const { Provider: ProductsProvider } = createProductsModule();

function App() {
  return (
    <MantineProvider>
      <ProductsProvider>
        <h3> This is trial react app </h3>
        <Products />
      </ProductsProvider>
    </MantineProvider>
  );
}

export default App;
