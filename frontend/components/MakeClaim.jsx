import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../output.css';

function MakeClaim() {
    const { auth, loading } = useAuth();
    const navigate = useNavigate();

    const [employeeId, setEmployeeId] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    // const [file, setFile] = useState(null); // For file input
    
    const handleSubmit = async (e) => {
        e.preventDefault();
       
       
        try {
            // Update URL to your server endpoint
            const response = await axios.post('http://localhost:4000/makeClaim', 
            {
                employeeId: employeeId,
                employeeName: employeeName,
                amount: amount,
                description: description
            }, 
            {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json', // Set the Content-Type header to application/json
                    },
                });

            
            if (response.data.success) {
                console.log("Claim submitted", response.data);
                alert("Claim submitted successfully");
                navigate('/employee');
            } else {
                console.error("Failed to submit claim");
                // Handle failure (e.g., show error message to the user)
            }
        } catch (error) {
            alert("Failed to submit claim, check your details and try again.");
            console.error("Error submitting claim", error);
            // Handle error (e.g., show error message to the user)
        }
    };

    const routeBack = () => {
      navigate('/employee');
    }
    useEffect(() => {
        // Wait for the loading to complete before checking authentication status
        if (!loading && !auth) {
            console.log("Not authenticated");
            navigate('/'); // Adjust this path as needed
        }
        }, [auth, loading, navigate]);
    return (
      <div className="form_box p-4 w-1/2 bg-gray-800 rounded">
      <div className="from_containter">
          <div className="form_header p-5 ">
                {/* Might have to make this separate to the actual form  */}
              <button className="text-white" onClick={routeBack}>Back</button> 
              <h2 className="text-white font-inter text-4xl font-600"> Make Claim</h2>
          </div>
  
          <form className="rounded-lg shadow-md form-main mt-3">
              <div className="form-head p-5 flex justify-between items-center">
                  <div className="">
                      <h2 className="text-white font-inter text-2xl font-600">CLAIM APPLICATION : EMPLOYEE NAME</h2>
                  </div>
              </div>
              <div className="p-5">
                  <div className="flex justify-between items-center flex-warp">
                      <div className="w-50 form-group mb-4 mr-2 p-5">
                          <label className="text-shadow-md text-white">Employee ID</label>
                          <input
                           className="rounded" 
                           type="text" name="" 
                           placeholder="Enter your EmployeeID.." 
                           onChange={(e) => setEmployeeId(e.target.value)}
                          />
                      </div>
                      <div className="w-50 form-group mb-4 mr-2 p-5">
                          <label className="text-shadow-md text-white">Employee name</label>
                          <input
                           className="rounded" 
                           type="text" name="" 
                           placeholder="Enter your EmployeeID.." 
                           onChange={(e) => setEmployeeName(e.target.value)}
                          />
                      </div>

                  </div>
                  <div className="">
                  <div className="flex justify-start items-center flex-warp">
                  </div>
                  <div className="">
                      <div className="mb-4 pl-0">
                      <div className="flex gap-2">
                          <label className="text-shadow-md text-white">Claim Amount : </label>
                          <input 
                          className="rounded" 
                          type="text" 
                          name=""  
                          placeholder="Enter Amount.." 
                          onChange={(e) => setAmount(e.target.value)}
                          />
                      </div>
                          <label className="text-shadow-md text-white">Select a file</label>
                          <div className="flex gap-4">
                              <input type="text" className="mt-2 rounded" placeholder="Choose file..." readOnly />
                              <label htmlFor="file" className="text-white font-bold px-2 bg-gray-700 rounded">Browse</label>
                              <input type="file" id="file" name="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} />
                          </div>
                          <div className="flex gap-20 mt-2">
                              <button type="reset" className="text-white">Reset</button>
                              <button type="submit" className="text-white">Upload</button>
                          </div>
                      </div>
                  </div>
                    </div>
                  <div className="flex justify-between items-center flex-warp">
                      <div className="w-100 form-group">
                          <label className="text-shadow-md text-white"> Description</label>
                          <textarea 
                          rows="4" 
                          placeholder="Enter Claim Description.."
                          onChange={(e) => setDescription(e.target.value)}
                          />
                      </div>
                  <div>
                      <button type="submit" className="btn-submit text-white" onClick={handleSubmit}> SUBMIT</button>
                  </div>
                  </div>
              </div>
          </form>
      </div>
  </div>
    );
  }
  
  export default MakeClaim;