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

     const CreatForm = () => {
        navigate('/createAccount');
     } 

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
        <div className="flex flex-col items-center justify-center my-10 w-full">
          <h1 className='text-center text-4xl font-bold text-gray-700 mb-8'>User Management</h1>
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg w-full max-w-4xl">
            <div className='ml-20'>
            <form className='flex items-end gap-4 ml-20' onSubmit={handleSubmit}>
              <label className="text-white font-bold p-2 ">Email:</label>
              <input  
                autoComplete='on'
                className='p-2 w-64 text-black font-bold rounded shadow'
                type="text"
                name="email"
                placeholder="Enter email..."
                onChange={e => setValues({...values, email: e.target.value})}
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 font-bold rounded hover:bg-blue-700 transition duration-300">
                Search
              </button>
            </form>
            </div>
            <div className="bg-gray-300 m-4 p-4 rounded shadow">
              {employeeDetails ? (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className="font-semibold text-xl">EmployeeId: <span className="font-normal">{employeeDetails.id}</span></div>
                  <div className="text-xl font-semibold ">Name: <span className="font-normal text-green-700">{employeeDetails.name}</span></div>
                  <div className="text-xl font-semibold">Email: <span className="font-normal text-blue-700">{employeeDetails.email}</span></div>
                  <div className="text-xl font-semibold">Password: <span className="font-normal text-red-700">{employeeDetails.password}</span></div>
                </div>
              ) : (
                <div className="text-xl font-bold">Employee details not available</div>
              )}
              <div className="flex justify-end mt-4">
                <button className="bg-gray-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">Manage Account</button>
              </div>
            </div>
          </div>
              <button className="bg-green-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 mt-5" onClick={CreatForm}>Create An Account</button>
        </div>
      </>
      
      )}
    </>
  );
}

export default Admin;

                  