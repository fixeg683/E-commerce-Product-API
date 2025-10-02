import React, { useState, useEffect, useCallback } from 'react';
import apiClient from './api';
import ProductCard from './ProductCard';
import { Container, Row, Col, Form, Spinner, Alert, InputGroup } from 'react-bootstrap';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [nextUrl, setNextUrl] = useState(null);

  const fetchProducts = useCallback(async (pageNumber = 1) => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm; // DRF SearchFilter uses 'search'
      if (category) params.category = category;
      params.page = pageNumber;

      const response = await apiClient.get('/products/', { params });
      // DRF's default pagination wraps in results
      setProducts(response.data.results || response.data);
      setNextUrl(response.data.next || null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch products. Ensure the backend is running at http://127.0.0.1:8000');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, category]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(1);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm, category, fetchProducts]);

  // initial load
  useEffect(() => {
    fetchProducts(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrev = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      fetchProducts(newPage);
    }
  };

  const handleNext = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchProducts(newPage);
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Our Products</h1>

      <Row className="mb-3">
        <Col md={6} className="mb-2">
          <InputGroup>
            <Form.Control
              placeholder="Search by product name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4} className="mb-2">
          <Form.Control
            placeholder="Filter by category (e.g., Electronics)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Col>
        <Col md={2} className="mb-2 d-flex justify-content-end">
          <div className="align-self-center text-muted">Page {page}</div>
        </Col>
      </Row>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <>
          <Row>
            {products.length > 0 ? (
              products.map((p) => (
                <Col key={p.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <ProductCard product={p} />
                </Col>
              ))
            ) : (
              <Col>
                <Alert variant="info">No products found.</Alert>
              </Col>
            )}
          </Row>

          <Row className="mb-4">
            <Col className="d-flex justify-content-between">
              <button className="btn btn-outline-primary" onClick={handlePrev} disabled={page <= 1}>
                Prev
              </button>
              <button className="btn btn-outline-primary" onClick={handleNext} disabled={!nextUrl}>
                Next
              </button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ProductList;
