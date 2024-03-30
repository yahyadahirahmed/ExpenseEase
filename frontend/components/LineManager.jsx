import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClaimsManager from './ClaimsManager.jsx';
import { useAuth } from './AuthContext';
import Navbar from './Navbar.jsx';

function LineManager() {
    const navigate = useNavigate();
    const { auth } = useAuth();
    async function fetchEmployeeDetails(email) {
		try {
			const response = await axios.get(`http://localhost:4000/find-employee?email=${email}`, { withCredentials: true });
			if (response.data.success) {
                setType(response.data.employee.type);
				return response.data.employee; // Return the employee object
			} else {
				console.error("Employee not found");
				return null; // Handle case where employee isn't found
			}
		} catch (error) {
			console.error("Error fetching employee details:", error);
			return null; // Return null or appropriate error handling
		}
	}

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
                    <ClaimsManager />
                </>
            }
        </>
    );
}

export default LineManager;
