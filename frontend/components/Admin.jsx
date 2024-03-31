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
          <h1>User Management</h1>
                    <div className="user-details">
                        <div className="user-innerdetails">
                            <div className="search">
                                 <form onSubmit={handleSubmit}> {/* Use onSubmit here and refer to handleSubmit */}
                                    <label className = "username">Email:</label>
            	 	                    <div className='username-field12'>
            	                        	<input  
					                    		autoComplete='on'
            	                                className='search-input'
            	                                type="text"
            	                                name="email"
            	                                onChange={e => setValues({...values, email: e.target.value})}
            	                        	/>
            	 	                    </div>
                                        <button type="submit" className="search-button">
                                            search
                                        </button>
                                </form>
                            </div>
                             
                            <div className="container">
                                <div className="employeeid">Employee Id</div>
                                {/* Conditional rendering to ensure employeeDetails is not null */}
                                {employeeDetails ? (
                                    <>
                                    <div className="employeename">ID: {employeeDetails.id}</div>
                                    <div className="employeename">Name: {employeeDetails.name}</div>
                                    </>
                                ) 
                                : 
                                (
                                    <div className="employeename">Employee details not available</div>
                                )}
                                <div className="b"><button>Manage Account</button></div>
                            </div>
                        </div>
                    </div>
        </>
      )}
    </>
  );
}

export default Admin;

                  