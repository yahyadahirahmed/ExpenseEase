import React , { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../output.css';

function Admin () {
    const [values, setValues] = useState({email: ''});
    const [employeeDetails, setEmployeeDetails] = useState(null);
    const navigate = useNavigate();
    const { auth } = useAuth();

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


  useEffect(() => {
      // If the user is not authenticated, redirect to the login page
      if (!auth) {
          navigate('/');
      }
  }, [auth, navigate]);

  // The logout function and the rest of the component can stay outside useEffect
  // as they do not need to be executed conditionally based on component rendering.
  return (
      <>
          {
              auth &&
              <>
                  <Navbar />
                        <div className="user-innerdetails">
                            <div className="">
                                 <form onSubmit={handleSubmit} className = 'bg-indigo-400 py-3 px-4 flex justify-between centre'> {/* Use onSubmit here and refer to handleSubmit */}
                                    <div className='' >
                                        <label className = "username">Email:</label>
                                    </div>
            	 	                <div className = ' pd-4'>
            	                        <input  
					                    	autoComplete='on'
            	                            className='search-input'
            	                            type="text"
            	                            name="email"
            	                            onChange={e => setValues({...values, email: e.target.value})}
            	                        />
            	 	                </div>
                                    <div className = ' pd-4'>
                                        <button type="submit" className = "bg-gray-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            search
                                        </button>
                                    </div>
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
              </>
          }
      </>
  );
}
export default Admin;