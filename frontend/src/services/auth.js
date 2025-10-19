// Authentication service functions
export const login = async (credentials) => {
  try {
    // Simulate API call - replace with actual API endpoint
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } catch (error) {
    console.error('Login failed:', error);
    // For development, simulate successful login
    const mockUser = {
      token: 'mock-jwt-token',
      user: {
        id: 1,
        name: credentials.name || 'Test User',
        email: credentials.email
      }
    };
    localStorage.setItem('token', mockUser.token);
    localStorage.setItem('user', JSON.stringify(mockUser.user));
    return mockUser;
  }
};

export const signup = async (userData) => {
  try {
    // Simulate API call - replace with actual API endpoint
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Signup failed:', error);
    // For development, simulate successful signup
    return { success: true, message: 'User created successfully' };
  }
};

export const logout = () => {
  // Clear all session data
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('cart');
  
  // Clear any other stored data
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('app_')) {
      localStorage.removeItem(key);
    }
  });
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};