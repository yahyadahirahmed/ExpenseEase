import React, { useEffect, useState } from 'react';

function Claims() {
    const [claims, setClaims] = useState([]);

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            const response = await fetch('http://localhost:4000/employee-details', {
                credentials: 'include', // To ensure cookies are sent
            });
            if (response.ok) {
                const data = await response.json();
                setClaims(data.claims || []);
            }
        };

        fetchEmployeeDetails();
    }, []);

    return (
        <div className="claims-container">
            {claims.map((claim, index) => (
                <div key={index} className="claim-box">
                    <div className="claim-header">
                        <span className="claim-title">{claim.description}</span>
                        <span className="employee-name">{data.name}</span> {/* Adjust according to your data structure */}
                        <span className="claim-amount">£{claim.amount}</span>
                        <span className="claim-date">{claim.created.toString()}</span>
                    </div>
                    <div className="claim-body">
                        <p>Description: {claim.notes}</p> {/* Adjust 'notes' based on your actual data */}
                        <div className="claim-actions">
                            <button className="view-receipt">VIEW RECEIPT</button>
                            <button className="accept-reject">ACCEPT/REJECT</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Claims;
