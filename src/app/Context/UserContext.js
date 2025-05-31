/*still doesn't understand much, using some help but might need teaching */
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing token on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        // Verify token and get user profile
        await fetchUserProfile(token);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout(); // Clear invalid token
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Step 1: Login and get tokens
      const loginResponse = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!loginResponse.ok) {
        throw new Error('Invalid credentials');
      }

      const loginData = await loginResponse.json();
      
      // Step 2: Store tokens
      localStorage.setItem('access_token', loginData.access_token);
      if (loginData.refresh_token) {
        localStorage.setItem('refresh_token', loginData.refresh_token);
      }

      // Step 3: Fetch user profile
      await fetchUserProfile(loginData.access_token);

      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message };
    }
  };

  const fetchUserProfile = async (token) => {
    const profileResponse = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!profileResponse.ok) {
      throw new Error('Cant get user profile');
    }

    const userData = await profileResponse.json();
    
    // Set user data
    setUser({
      id: userData.id,
      email: userData.email,
      name: userData.name,
      role: userData.role,
      avatar: userData.avatar,
    });
    
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Clear tokens from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    // Reset user state
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshToken = async () => {
    try {
      const refreshTokenValue = localStorage.getItem('refresh_token');
      if (!refreshTokenValue) {
        throw new Error('No refresh token available');
      }

      const response = await fetch('https://api.escuelajs.co/api/v1/auth/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: refreshTokenValue }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      
      // Update tokens
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      return data.access_token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout(); // Force logout on refresh failure
      throw error;
    }
  };

  const updateUserProfile = (updates) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updates
    }));
  };

  const getAccessToken = () => {
    return localStorage.getItem('access_token');
  };

  // Context value
  const value = {
    // User state
    user,
    isAuthenticated,
    isLoading,
    
    // Auth methods
    login,
    logout,
    refreshToken,
    
    // User methods
    updateUserProfile,
    getAccessToken,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}