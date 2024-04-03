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
                {/* Placeholder for any content you might want in the top section */}
            </div>
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 mt-6 overflow-y-auto" style={{ maxHeight: '80vh' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {claims.map((claim, index) => (
                        <div key={index} className="bg-gray-100 divide-y divide-gray-200 rounded-lg shadow overflow-hidden">
                            <div className='p-4'>
                                <h3 className='text-xl font-semibold mb-2'>Claim {claim.id}</h3>
                                <p>Status: <span className={`font-semibold ${claim.approved ? 'text-green-500' : claim.rejected ? 'text-red-500' : 'text-yellow-500'}`}>
                                    {claim.approved ? "Approved" : claim.rejected ? "Rejected" : "Pending"}
                                </span></p>
                            </div>
                            <div className='p-6 pt-4'>
                                <p className='font-medium'>Amount: <span className='font-normal'>${claim.amount}</span></p>
                                <p className='font-medium'>Description: <span className='font-normal'>{claim.description}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

}
export default Claims;
