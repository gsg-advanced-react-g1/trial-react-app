import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ProductsProvider } from './modules/Products';

function App() {

  return (
    <MantineProvider>
      <ProductsProvider value="Products">
        <h3> This is trial react app </h3>
      </ProductsProvider>
    </MantineProvider>
  )
}

export default App
