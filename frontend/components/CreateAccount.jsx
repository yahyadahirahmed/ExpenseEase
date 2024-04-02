import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../output.css';

function CreatAccount() {
    const [employeeName, setEmployeeName] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeePassword, setEmployeePassword] = useState('');
    const [employeeType, setEmployeeType] = useState('');
    const navigate = useNavigate();

    const routeBack = () => {
        navigate('/admin');
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the form from submitting in the traditional way
    
        const employeeDetails = {
            employeeName,
            employeeEmail,
            employeePassword,
            employeeType,
        };
    
        try {
            const response = await axios.post('http://localhost:4000/create', employeeDetails);
            if (response.data.success) {
                console.log("Account created successfully:", response.data);
                // Optionally, redirect or clear the form here
            } else {
                console.error("Failed to create account:", response.data.message);
                // Handle failure (e.g., show error message to the user)
            }
        } catch (error) {
            console.error("Error creating account:", error);
            // Handle error (e.g., show error message to the user)
        }
    };
    

    return (
        <>
        <div className='bg-gray-900'>
        <div className="w-40">
            <button className="bg-gray-50 font-semibold hover:bg-blue-500 m-1 p-2 rounded" onClick={routeBack}> Back</button>
        </div>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-center text-3xl font-bold text-white mb-8">Create Employee Account</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Employee Name</label>
                <input
                  type="text"
                  id="name"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="mt-1 p-2 w-full text-black rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Employee Email</label>
                <input
                  type="email"
                  id="email"
                  value={employeeEmail}
                  onChange={(e) => setEmployeeEmail(e.target.value)}
                  className="mt-1 p-2 w-full text-black rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Employee Password</label>
                <input
                  type="password"
                  id="password"
                  value={employeePassword}
                  onChange={(e) => setEmployeePassword(e.target.value)}
                  className="mt-1 p-2 w-full text-black rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-300">Employee Type</label>
                <input
                  type="text"
                  id="type"
                  value={employeeType}
                  onChange={(e) => setEmployeeType(e.target.value)}
                  className="mt-1 p-2 w-full text-black rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="employee, LineManager, admin"
                  required
                />
              </div>
              <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Submit
              </button>
            </form>
          </div>
        </div>
        </div>
      </>
      
    );
}

export default CreatAccount;
