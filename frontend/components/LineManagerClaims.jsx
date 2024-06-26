import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../output.css';
import Claims from './Claims.jsx';

function LineManagerClaims() {
    const navigate = useNavigate();
    
    const route = () => {
        navigate('/makeClaimLM');
    }

    return (
        <>
            <div >
                <div className=" my-8">
                    <div className="flex">
                    <h1 className="text-3xl ml-4 text-center font-bold text-gray-800 mr-8">Line Manager Claims</h1>
                    <button className= "bg-gray-800 text-white font-bold rounded px-2 hover:bg-red-700" onClick={route}> + Click here to make claim</button>
                    </div>
                    <div className="">
                        <Claims />
                    </div>
                </div>
            </div>
        </>
    )
}
export default LineManagerClaims;