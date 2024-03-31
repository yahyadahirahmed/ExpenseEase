import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/claims.css'
import ClaimComponent from './ClaimComponent';

function Claims() {
    const [claims, setClaims] = useState([]);
    const navigate = useNavigate();
    const { auth } = useAuth();
    // async function fetchEmployeeDetails(email) {
    //     try {
    //         const response = await axios.get(`http://localhost:4000/find-employee?email=${email}`, { withCredentials: true });
    //         if (response.data.success) {
    //             return response.data.employee; // Return the employee object
    //         } else {
    //             console.error("Employee not found");
    //             return null; // Handle case where employee isn't found
    //         }
    //     } catch (error) {
    //         console.error("Error fetching employee details:", error);
    //         return null; // Return null or appropriate error handling
    //     }
    // }

    async function fetchClaims() {
        try {
            const response = await axios.get('http://localhost:4000/claims', { withCredentials: true });
            if (response.data.success) {
                console.log(response.data.claims);
                setClaims(response.data.claims);
            } else {
                console.error("Claims not found");
                return null; // Handle case where claims aren't found
            }
        } catch (error) {
            console.error("Error fetching claims:", error);
            return null; // Return null or appropriate error handling
        }
    }

    useEffect(() => {
        if (!auth) {
            navigate('/');
        }
        fetchClaims();
    }, []);

    return (
        <>
            <div className='top-section'>
                <h1 className='claimhead'><code>My Claims</code></h1>
            </div>
            <div className="claims-container">
                {claims.map((claim, index) => (
                    <ClaimComponent key={index} id={claim.id} description= {claim.description} amount={claim.amount} approved={claim.approved} rejected={claim.rejected}/>
                ))}
            </div>
        </>
    );

}
export default Claims;
