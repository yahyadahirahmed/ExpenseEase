import Navbar from "./Navbar";
import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import Claims from "./Claims";

function shush() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
      // If the user is not authenticated, redirect to the login page
      if (!auth) {
          navigate('/');
      }
  }, [auth, navigate]);

  // The logout function and the rest of the component can stay outside useEffect
  // as they do not need to be executed conditionally based on component rendering.
  return (
      <>
          {
              auth &&
              <>
                  <Navbar />
                  <Claims />
              </>
          }
      </>
  );}   
export default shush;