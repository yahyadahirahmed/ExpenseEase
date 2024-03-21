import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LineManager.css';
import Claims from './Claims.jsx';


function LineManager() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('Logging out...');
    await fetch('http://localhost:4000/logout', {
      method: 'POST', // Match the method used in your server route
      credentials: 'include' // Needed to include cookies
    });
    console.log('Logged out');
    navigate('/'); // Redirect to login page after logout
  };

  return (
    <>
    <div className="navbar"> {/* Corrected from class to className */}
      <div>
        <a href="#">ExpenseEase</a>
        <a href="#">Claims</a>
        <a href="#">Line Manager</a>
        <a href="#">User management</a>
      </div>
      <button className="employee-logout" onClick={handleLogout}>Log out</button>
    </div>
    
    <Claims />
    </>
  );
}


export default LineManager;