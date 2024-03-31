import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClaimsManager from './ClaimsManager.jsx';
import { useAuth } from './AuthContext';
import Navbar from './Navbar.jsx';

function LineManager() {
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
                    <ClaimsManager />
                </>
            }
        </>
    );
}

export default LineManager;
