// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true); // Add a loading state

  // Function to check authentication status
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('http://localhost:4000', { withCredentials: true });
      if (response.data.Status === "Success") {
        setAuth(true);
        // setEmail(response.data.email);
        // console.log("Email is", response.data.email);
      } else {
        setAuth(false);
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      setAuth(false);
    } finally {
      setLoading(false); // Ensure loading is set to false after the check
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const logout = async () => {
    try {
      await axios.get('http://localhost:4000/logout', { withCredentials: true });
      setAuth(false);
      setEmail('');
      localStorage.removeItem('userEmail')
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, setEmail ,email, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
