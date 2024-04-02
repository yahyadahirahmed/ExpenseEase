import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
// import '../styles/claims.css'
import '../output.css';

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
            </div>
            <div className="bg-gray-900 rounded p-1 ml-4 mt-3 overflow-y-auto grid grid-cols-2 gap-1">
                {claims.map((claim, index) => (
                    <div key={index} className="claim">
                        <div className='claim-details bg-gray-300 m-2 rounded'>
                            <div className='flex justify-between'>
                                <h3 className='m-2'><code>Claim {claim.id}</code></h3>
                                <p className='m-2'><code>Status: {claim.approved ? "Approved" : claim.rejected ? "Rejected" : "Pending"}</code></p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='m-2'><code>Amount: ${claim.amount}</code></p>
                                <p className='m-2'><code>Description: {claim.description}</code></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );

}
export default Claims;
