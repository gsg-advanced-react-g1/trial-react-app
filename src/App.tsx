import './App.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { createProductsModule } from './modules/Products';
import Products from './modules/Products/views';

function App() {
  const { Provider: ProductsProvider } = createProductsModule();
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
