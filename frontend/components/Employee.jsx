import Navbar from "./Navbar";
import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import Claims from "./Claims";
import '../output.css';

function Employee() {
    const navigate = useNavigate();
    const { auth, loading } = useAuth();

    const route = () => {  
    navigate('/makeClaim');
    }
    useEffect(() => {
        // Wait for the loading to complete before checking authentication status
        if (!loading && !auth) {
          console.log("Not authenticated");
          navigate('/'); // Adjust this path as needed
        }
      }, [auth, loading, navigate]);

  // The logout function and the rest of the component can stay outside useEffect
  // as they do not need to be executed conditionally based on component rendering.
  return (
      <>
          {
              auth &&
              <>
                  <Navbar />
                  <div className="flex justify-between my-8">
                    <h1 className="text-4xl text-center font-bold text-gray-800 ml-8">Employee Dashboard</h1>
                    <button className= "bg-gray-800 text-white px-4 py-2 font-bold rounded hover:bg-red-700 mr-8" onClick={route}> + Click here to make claim</button>
                  </div>
                  <div className="">
                    <Claims />
                  </div>
                  
              </>
          }
      </>
  );}   
export default Employee;