import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import '../styles/ClaimsManager.css'
import '../output.css';
import { format } from 'date-fns';

function ClaimsManager() {
    const [claims, setClaims] = useState([]);
    const [employeeNames, setEmployeeNames] = useState({});

    async function fetchClaimsForManagers() {
        try {
            const response = await axios.get('http://localhost:4000/ClaimsForManager', { withCredentials: true });
            if (response.data.success) {
                console.log(response.data.claims);
                setClaims(response.data.claims);
                const uniqueEmployeeIds = [...new Set(response.data.claims.map(claim => claim.employeeId))];
                uniqueEmployeeIds.forEach(fetchEmployeeName);
            } else {
                console.error("Claims not found");
                return null; // Handle case where claims aren't found
            }
        } catch (error) {
            console.error("Error fetching claims:", error);
            return null; // Return null or appropriate error handling
        }
    }
    const fetchEmployeeName = async (employeeId) => {
        try {
            const response = await axios.get(`http://localhost:4000/get-employee-details/${employeeId}`, { withCredentials: true });
            if (response.data.success && response.data.employee) {
                // Update the employeeNames state without overwriting existing data
                setEmployeeNames(prevNames => ({
                    ...prevNames,
                    [employeeId]: response.data.employee.name
                }));
            } else {
                console.error("Employee not found");
            }
        } catch (error) {
            console.error("Error fetching employee name:", error);
        }
    };
    async function acceptClaim(claimId) {
        try {
            const response = await axios.post(`http://localhost:4000/claims/accept/${claimId}`, {}, { withCredentials: true });
            if (response.data.success) {
                console.log("Claim accepted");
                // Optionally, fetch the updated list of claims here or remove the claim from the UI
                fetchClaimsForManagers();
            } else {
                console.error("Error accepting claim");
            }
        } catch (error) {
            console.error("Error accepting claim:", error);
        }
    }
    
    async function rejectClaim(claimId) {
        try {
            const response = await axios.post(`http://localhost:4000/claims/reject/${claimId}`, {}, { withCredentials: true });
            if (response.data.success) {
                console.log("Claim rejected ");
                // Optionally, fetch the updated list of claims here or remove the claim from the UI
                fetchClaimsForManagers();
            } else {
                console.error("Error rejecting claim");
            }
        } catch (error) {
            console.error("Error rejecting claim:", error);
        }
    }
    

    useEffect(() => {
        fetchClaimsForManagers();

    }, []);


    return (
        <>
    <div className='flex flex-col items-center mt-8'>
        <h1 className='text-3xl font-bold text-black mb-7'>Claim Management</h1>
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-4 ml-3 bg-gray-900 overflow-auto rounded" style={{ maxHeight: '600px' }}>
            {claims.map((claim, index) => (
                <div key={index} className="bg-gray-700 m-2 p-4 rounded-lg shadow">
                    <div className='flex justify-between items-center text-white'>
                        <h3 className='font-bold'>{employeeNames[claim.employeeId] || 'Loading...'}'s Claim</h3>
                        <p>Employee ID: {claim.employeeId}</p>
                    </div>
                    <div className="flex justify-between mt-2 text-gray-400">
                        <p className='p-1'>Amount: ${claim.amount}</p>
                        <p className='p-1'>Date: {format(new Date(claim.created), 'yyyy-MM-dd')}</p>
                    </div>
                    <p className='mt-2 text-gray-200'>Description: {claim.description}</p>
                    <div className="flex justify-end mt-4">
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'>View</button>
                        <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2' onClick={() => acceptClaim(claim.id)}>Accept</button>
                        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => rejectClaim(claim.id)}>Reject</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
</>
    );
};

export default ClaimsManager;

