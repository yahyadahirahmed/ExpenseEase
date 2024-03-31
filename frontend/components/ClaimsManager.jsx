import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ClaimsManager.css'

function ClaimsManager() {
    const [claims, setClaims] = useState([]);

    async function fetchClaimsForManagers() {
        try {
            const response = await axios.get('http://localhost:4000/ClaimsForManager', { withCredentials: true });
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
        fetchClaimsForManagers();

    }, []);


    return (
        <>
            <div className='top-section'>
                <h1 className='claimhead'>My Claims</h1>
            </div>
            <div className="claims-container">
                {claims.map((claim, index) => (
                    <div className="claim" key={index}>
                        <div className="claim-details">
                            <p>Amount: {claim.amount}</p>
                            <p>Date: {claim.id}</p>
                        </div>
                        <div className="claim-info">
                            <h3>{claim.name}</h3>
                            <p>{claim.employee}</p>
                            <p>Description:<br></br>{claim.description}</p>

                        </div>
                        <div className="button-container">
                            <button>View Receipt</button>
                            <button>Accept/Reject</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ClaimsManager;

