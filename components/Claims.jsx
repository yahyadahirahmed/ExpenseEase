import React, { useEffect, useState } from 'react';
import '../styles/claims.css'
function Claims() {
    const [claims, setClaims] = useState([]);

    

    return (
        <>
        <div className='top-section'>
            <h1 className='claimhead'>My Claims</h1>
            <button className='top-button'><code>+ Make Claim</code></button>
            </div>
        <div className="claims-container">
                <div className="claim-type">
                        <h2>Submitted</h2>
                    </div>
                    <div className="claim-sections">
                        <div className="claim1">
                            <div className='claim1left'>
                                <h3>Claim 1</h3>
                                <p>Description: Accomodation</p>
                            </div>
                            <div className='claim1right'>
                                <p>Amount: $100</p>
                                <p>Status: Pending</p>
                            </div>
                        </div>
                        <div className="claim2">
                            <div className='claim2left'>
                            <h3>Claim 2</h3>
                            <p>Description: Travel</p>
                            </div>
                            <div className='claim2right'>
                            <p>Amount: $200</p>
                            <p>Status: Pending</p>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
};

export default Claims;
