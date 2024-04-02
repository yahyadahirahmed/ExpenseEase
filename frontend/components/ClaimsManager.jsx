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
            <div>
            <div className='top-section'>
                <h1 className='claimhead font-bold p-4 text-3xl'>Claim Management</h1>
            </div>
            <div className="bg-gray-900 rounded p-1 ml-4 mt-3 overflow-y-auto grid grid-cols-2 gap-1"style={{ maxHeight: '700px' }}>
                {claims.map((claim, index) => (
                    <div className="claim w-70 bg-gray-300 rounded m-2" key={index}>
                        <div className="claim-details p-4 flex justify-between">
                        <h3 className='font-bold'>{employeeNames[claim.employeeId] || 'Loading...'}'s claim</h3>
                            <p>Employee ID: {claim.employeeId}</p>
                        </div>
                        <div className="claim-info flex justify-between">
                            <p className='p-2'>Amount: ${claim.amount}</p>
                                {(() => {
                                    const formattedDate = format(new Date(claim.created), 'yyyy-MM-dd');
                                    return <p className='p-2'>Date: {formattedDate}</p>;
                                })()}
                        </div>
                            <p className='w-80 overflow-hidden p-1.5'>Description:<br></br>{claim.description}</p>
                        <div className="button-container flex justify-between">
                            {/* <button>View Receipt</button> */}
                            <button className='m-1 px-2 py-1 rounded bg-gray-800 text-white hover:bg-red-700' onClick={() => acceptClaim(claim.id)}>Accept</button>
                            <button className='m-1 px-2 py-1 rounded bg-gray-800 text-white hover:bg-red-700' onClick={() => rejectClaim(claim.id)}>Reject</button>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </>
    );
};

export default ClaimsManager;

