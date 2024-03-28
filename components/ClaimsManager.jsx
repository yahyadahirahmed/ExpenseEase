import React, { useEffect, useState } from 'react';
import '../styles/ClaimsManager.css'

function ClaimsManager() {
    const [claims, setClaims] = useState([

        {
            name: 'Name of Claim',
            employee: 'John',
            description: 'Travel',
            amount: '£100',
            date: '25/03/2024',
        }, {
            name: 'Name of Claim',
            employee: 'John',
            description: 'Travel',
            amount: '£100',
            date: '25/03/2024',
        }, {
            name: 'Name of Claim',
            employee: 'John',
            description: 'Travel',
            amount: '£100',
            date: '25/03/2024',
        }, {
            name: 'Name of Claim',
            employee: 'John',
            description: 'Travel',
            amount: '£100',
            date: '25/03/2024',
        }, {
            name: 'Name of Claim',
            employee: 'John',
            description: 'Travel',
            amount: '£100',
            date: '25/03/2024',
        }, {
            name: 'Name of Claim',
            employee: 'John',
            description: 'Travel',
            amount: '£100',
            date: '25/03/2024',
        }, {
            name: 'Name of Claim',
            employee: 'John',
            description: 'Travel',
            amount: '£100',
            date: '25/03/2024',
        }, {
            name: 'Name of Claim',
            employee: 'John',
            description: 'Travel',
            amount: '£100',
            date: '25/03/2024',
        },
    ]);

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
                            <p>Date: {claim.date}</p>
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

