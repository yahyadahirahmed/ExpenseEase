import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [empType, setEmpType] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000', { withCredentials: true })
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setEmail(res.data.email);
          setEmpType(res.data.employee);
        } else {
          setAuth(false);
          setMsg(res.data.Message);
        }
      })
      .catch(err => {
        console.log(err);
        setAuth(false);
      });
  }, []);

  const logout = () => {
    axios.get('http://localhost:4000/logout', { withCredentials: true })
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(false);
          setEmail('');
          setEmpType('');
          window.location.reload(); // potentially need to add useNavigate to redirect to log in page
        } else {
          alert("Error logging out");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <AuthContext.Provider value={{ auth, email, empType, msg, logout, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
