import React , { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '/styles/Login.css';
import { useAuth } from './AuthContext';

function Login() {
    const { auth, setAuth, empType } = useAuth();
    const [values, setValues] = useState({email: '', password: ''});
    const navigate = useNavigate();
    
    axios.defaults.withCredentials = true;	
	
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
	
    // Handle form submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		 axios.post('http://localhost:4000/login', values)
		.then(async res => { // Wrap the callback in an async function
			if(res.data.Status === "Success") {
				const employee = await fetchEmployeeDetails(values.email);
				if (employee) {
					const empType = employee.type;
					setAuth(true);
					console.log("Login successful")
					if (empType === 'employee') {
						console.log(empType);
						console.log("hello employee");
						navigate('/shush')
					} else if (empType === 'LineManager') {
						console.log("hello");
						navigate('/line-manager')
					} else if (empType === 'admin') {
						console.log("hello admin");
						navigate('/admin')
					} else {
						navigate('/')
					}
				} else {
					alert("Failed to fetch employee details.");
				}
				
			} else {
				alert(res.data.Message)
			}
		})
		.catch(err => console.log(err));
	};
	
	// Redirect if already logged in
	useEffect(() => {
		if (auth) {
			navigate('/line-manager');
		}
	}, [auth, navigate]);

    return (
		<>
            <h1 className='header'><code>Expense Ease</code></h1>
            <div className= "block"></div>
            <form className="form-container" onSubmit={handleSubmit}>
            	<div className='details'>
            	 	<div className='login-head'>
            	    	<h2>Login</h2>
            	 	</div>
            		<div>
            	    	<label className = "username">Email:</label>
            	 	</div>
            	 	<div className='username-field12'>
            	    	<input  
							autoComplete='on'
            	            className='username-field'
            	            type="text"
            	            name="email"
            	            onChange={e => setValues({...values, email: e.target.value})}
            	    	/>
            	 	</div>

            	 	<div>
            	 	    <label className='password'>Password:</label>
            	 	</div>
            	 	<div>
            	 	    <input 
							autoComplete='on'
            	 	    	className='password-field'
            	 	    	type="password"
            	 	    	name="password"
            	 	    	onChange={e => setValues({...values, password: e.target.value})}
            	 	    />
            	 	</div>
            	 	<div className='linkandsubmit'>
            	 		<div className='forgot-password'>
            	 		    <a href="">Forgot Password?</a>
            	 		</div>
            	 		<div className='submit-button'>
            	 		    <button className = "submit" type="submit">Submit</button>
            	 		</div>
            	 	</div>
				</div>
            </form>
				<button className='submit' onClick={() => navigate('/line-manager')}></button>
    	</>
    )
}
export default Login;