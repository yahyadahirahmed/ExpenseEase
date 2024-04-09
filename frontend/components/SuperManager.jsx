import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import '../styles/ClaimsManager.css'
import '../output.css';
import { format } from 'date-fns';
import ClaimsManagerLM from './ClaimsManagerLM';
import Navbar from './Navbar';

function SuperManager() {
    const navigate = useNavigate();
    const { auth, loading } = useAuth();

    useEffect(() => {
        // Wait for the loading to complete before checking authentication status
        if (!loading && !auth) {
          console.log("Not authenticated");
          navigate('/'); // Adjust this path as needed
        }
      }, [auth, loading, navigate]);

    return (
        <>
            {
                auth &&    
                        <>
                            <Navbar />
                            <ClaimsManagerLM/>
                        </>
            }
        </>
    );
};

export default SuperManager;

