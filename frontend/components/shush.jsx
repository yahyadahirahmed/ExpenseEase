import Navbar from "./Navbar";
import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import Claims from "./Claims";

function shush() {
    const navigate = useNavigate();
    const { auth, loading } = useAuth();

    useEffect(() => {
        // Wait for the loading to complete before checking authentication status
        if (!loading && !auth) {
          console.log("Not authenticated");
          navigate('/'); // Adjust this path as needed
        }
      }, [auth, loading, navigate]);

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