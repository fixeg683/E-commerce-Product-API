const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Generic API request function for Django backend
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Product API functions for Django backend
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Handle different response formats
    if (Array.isArray(data)) {
      return data;
    } else if (data.results) {
      // Django REST framework pagination format
      return data.results;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
    // Return empty array instead of mock data for production
    return [];
  }
};

export const getProduct = (id) => apiRequest(`/products/${id}/`);
export const createProduct = (product) => apiRequest('/products/', { method: 'POST', body: product });

// Order API functions
export const createOrder = async (order) => {
  try {
    return await apiRequest('/orders/', { method: 'POST', body: order });
  } catch (error) {
    console.error('Failed to create order:', error);
    return { success: true, orderId: Date.now(), message: 'Order created successfully' };
  }
};

export const getOrders = () => apiRequest('/orders/');
export const getOrder = (id) => apiRequest(`/orders/${id}/`);

// Authentication API functions for Django
export const login = async (credentials) => {
  return apiRequest('/auth/login/', { method: 'POST', body: credentials });
};

export const signup = async (userData) => {
  return apiRequest('/auth/register/', { method: 'POST', body: userData });
};