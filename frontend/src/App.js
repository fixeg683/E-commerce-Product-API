import React from 'react';
import ProductList from './ProductList';
import { Container, Navbar } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">E-Commerce Store</Navbar.Brand>
        </Container>
      </Navbar>

      <main>
        <ProductList />
      </main>
    </div>
  );
}

export default App;
