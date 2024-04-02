import React from "react";
import { useAuth } from './AuthContext';
import '../output.css';


function Navbar() {
    const { auth } = useAuth();
    const { logout } = useAuth();
    return (    
        <>
            <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
                <div className="flex gap-4">
                    <a href="#" className="hover:text-gray-300">ExpenseEase</a>
                    {/* <a href="#" className="hover:text-gray-300">Claims</a>
                    <a href="#" className="hover:text-gray-300">Line Manager</a>
                    <a href="#" className="hover:text-gray-300">User management</a> */}
                </div>
                <button className="bg-black-900 text-white px-4 py-2 font-bold rounded hover:bg-red-700" onClick={logout}>Log out</button>
            </div>
        </>
    );
}

export default Navbar;
