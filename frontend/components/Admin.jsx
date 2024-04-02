// Admin.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Navbar from './Navbar';
import axios from 'axios';

function Admin() {
    const [values, setValues] = useState({email: ''});
    const [employeeDetails, setEmployeeDetails] = useState(null);
    const navigate = useNavigate();
    const { auth, loading } = useAuth();

  useEffect(() => {
    // Wait for the loading to complete before checking authentication status
    if (!loading && !auth) {
      console.log("Not authenticated");
      navigate('/'); // Adjust this path as needed
    }
  }, [auth, loading, navigate]);

  
  async function fetchEmployeeDetails(email) {
    try {
        const response = await axios.get(`http://localhost:4000/find-employee?email=${email}`, { withCredentials: true });
        if (response.data.success) {
            return response.data.employee; // Return the employee object
        } else {
            console.error("Employee not found");
            return null; // Handle case where employee isn't found
        }
    } catch (error) {
        console.error("Error fetching employee details:", error);
        return null; // Return null or appropriate error handling
    }
}

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Correctly access the input value
    const email = values.email; // Correctly access the email property
    const employeeDetails = await fetchEmployeeDetails(email);
    if (employeeDetails) {
        setEmployeeDetails(employeeDetails);
        console.log("Employee Details:", employeeDetails);
        // Handle success - maybe set state with employeeDetails or perform further actions
    } else {
        console.error("Failed to fetch employee details.");
        // Handle failure - maybe set error message in state or alert the user
    }
};

  return (
    <>
      {auth && (
        <>
          <Navbar />
          <div className="flex items-center justify-center">
            <h1 className='text-centre text-4xl mt-4'>User Management</h1>
          </div>
                    <div className="bg-gray-900 rounded p-2 m-10 mt-10">
                        <div className="">
                            <div className="search">
                                 <form className='flex justify-start m-4' onSubmit={handleSubmit}> {/* Use onSubmit here and refer to handleSubmit */}
                                    <label className = "pt-2 pr-1 text-white font-bold">Email:</label>
            	 	                    <div className='pl-4 pt-2 pr-1'>
            	                        	<input  
					                    		            autoComplete='on'
            	                                className=' px-2 font-bold rounded'
            	                                type="text"
            	                                name="email"
            	                                onChange={e => setValues({...values, email: e.target.value})}
            	                        	/>
            	 	                    </div>
                                        <div className='pl-4 pt-2 pr-1 '>
                                        <button type="submit" className="bg-gray-800 text-white px-1 font-bold rounded hover:bg-red-700">
                                            Search
                                        </button>
                                        </div>
                                </form>
                            </div>
                             
                            <div className="bg-gray-300 ml-4 mr-8 rounded">
                                <div className='flex justify-between'>
                                {/* Conditional rendering to ensure employeeDetails is not null */}
                                {employeeDetails ? (
                                    <>
                                    <div className='flex justify-start'>
                                      <div className="text-2xl p-3">EmployeeId: {employeeDetails.id}</div>
                                      <div className="text-2xl p-3 ml-5 text-green-700">Name: {employeeDetails.name}</div>
                                      <div className="text-2xl p-3 ml-5 text-blue-700">Email: {employeeDetails.email}</div>
                                      <div className="text-2xl p-3 ml-5 text-red-700">Password: {employeeDetails.password}</div>
                                    </div>
                                    </>
                                ) 
                                : 
                                (
                                    <div className="text-2xl font-bold pt-2 pl-1">Employee details not available</div>
                                )}
                                <div className="text-lg bg-gray-800 m-2 p-1 text-white font-bold rounded hover:bg-red-700"><button>Manage Account</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
        </>
      )}
    </>
  );
}

export default Admin;

                  