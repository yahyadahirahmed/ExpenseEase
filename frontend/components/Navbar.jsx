import React from "react";
import '../styles/Navbar.css';
import { useAuth } from './AuthContext';

function Navbar() {
    const { auth } = useAuth();
    const { logout } = useAuth();
    return (    
        <>
            <div className="navbar">
                <div>
                    <a href="#">ExpenseEase</a>
                    <a href="#">Claims</a>
                    <a href="#">Line Manager</a>
                    <a href="#">User management</a>
                </div>
                <button className="employee-logout" onClick={logout}>Log out</button>
            </div>
        </>
    );
}

export default Navbar;
