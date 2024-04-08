import React, { useState, useEffect } from 'react';
import { useAuth} from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../output.css';
import { parse } from 'date-fns';

function MakeClaim() {
    const { auth, loading, email} = useAuth();
    const navigate = useNavigate();

    const [employeeId, setEmployeeId] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [thisid, setThisid] = useState('');

    const userEmail = localStorage.getItem('userEmail');
    // const [file, setFile] = useState(null); // For file input
    
  async function fetchEmployeeDetails(email) {
        try {
            console.log("Fetching employee details for");
            const response = await axios.get(`http://localhost:4000/find-employee?email=${email}`, { withCredentials: true });
            if (response.data.success) {
                console.log(response.data.employee);
                setThisid(response.data.employee.id);
                // console.log("This id is", thisid);
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
        e.preventDefault();
       
        const empid = parseInt(employeeId);

        if (empid === thisid) {
          console.log(thisid);
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
      }
        else {          
          alert("Employee ID does not match the employee's ID. Please check and try again.");
        }
    };

    const routeBack = () => {
      navigate('/lineManager');
    }
    useEffect(() => {

      // Wait for the loading to complete before checking authentication status
      if (!loading && !auth) {
        console.log("Not authenticated");
        navigate('/'); // Adjust this path as needed
      }
      if (userEmail) { // Add this check
        fetchEmployeeDetails(userEmail);
      }
      else {
        console.error("No email found");
      }
        }, [auth, loading, navigate]);
    return (
        <>
        <div className='bg-gray-900'>
        <div className="w-40">
        <button className="bg-gray-50 font-semibold hover:bg-blue-500 m-1 p-2 rounded" onClick={routeBack}> Back</button>
        </div>
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
          <div className="w-full max-w-xl bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-white text-3xl font-bold text-center mb-4">
              Make Claim
            </div>
      
            <form className="space-y-4">
              <div>
                <label className="block text-white text-sm font-bold mb-2">Employee ID</label>
                <input
                  className="w-full p-2 text-black rounded focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter your EmployeeID.."
                  onChange={(e) => setEmployeeId(e.target.value)}
                />
              </div>
      
              <div>
                <label className="block text-white text-sm font-bold mb-2">Employee Name</label>
                <input
                  className="w-full p-2 text-black rounded focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter Employee Name.."
                  onChange={(e) => setEmployeeName(e.target.value)}
                />
              </div>
      
              <div>
                <label className="block text-white text-sm font-bold mb-2">Claim Amount</label>
                <input
                  className="w-full p-2 text-black rounded focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter Amount.."
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
      
              <div className="flex items-center justify-between">
                <div className="w-full mr-2">
                  <label className="block text-white text-sm font-bold mb-2">Select a file</label>
                  <input type="file" id="file" name="file" accept=".pdf,.doc,.docx" className="w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600"/>
                </div>
              </div>
      
              <div>
                <label className="block text-white text-sm font-bold mb-2">Description</label>
                <textarea
                  className="w-full p-2 text-black rounded focus:outline-none focus:shadow-outline"
                  rows="4"
                  placeholder="Enter Claim Description.."
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
      
              <div className="flex items-center justify-between">
                <button type="reset" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Reset</button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSubmit}>Submit</button>
              </div>
            </form>
          </div>
        </div>
        </div>
        </>
    );
  }
  
  export default MakeClaim;