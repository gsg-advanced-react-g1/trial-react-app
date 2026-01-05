import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ProductsProvider } from './modules/Products';

function App() {

  return (
    <MantineProvider>
      <ProductsProvider value="Products">
        <h1> This is trial react app </h1>
      </ProductsProvider>
    </MantineProvider>
  )
}

export default App
