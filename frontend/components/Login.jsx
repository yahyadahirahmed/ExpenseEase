import React , { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import '/styles/Login.css';
import { useAuth } from './AuthContext';
import '../output.css';

function Login() {
    const { auth, setAuth, setEmail } = useAuth();
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
			    setEmail(values.email);
				localStorage.setItem('userEmail', values.email);
				if (employee) {
					const empType = employee.type;
					setAuth(true);
					console.log("Login successful")
					if (empType === 'employee') {
						console.log("employee");
						navigate('/employee')
					} else if (empType === 'LineManager') {
						console.log("line manager");
						navigate('/lineManager')
					} else if (empType === 'admin') {
						console.log("admin");
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
		if (!auth) {
			navigate('/');
		}
	}, [auth, navigate]);

    return (
		<>
            	<div className='flex justify-center items-center min-h-screen bg-gray-900'>
            	    <div className='max-w-md w-full bg-white shadow-lg rounded-lg p-8'>
            	        <h2 className='font-bold text-xl text-center text-grey-300 mb-8'>Expense Ease</h2>
            	        <form onSubmit={handleSubmit}>
            	            <div className='mb-4'>
            	                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
            	                <input
            	                    autoComplete='on'
            	                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            	                    id="email"
            	                    type="text"
            	                    placeholder="Email"
            	                    name="email"
            	                    value={values.email}
            	                    onChange={e => setValues({ ...values, email: e.target.value })}
            	                />
            	            </div>
            	            <div className='mb-6'>
            	                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
            	                <input
            	                    autoComplete='on'
            	                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            	                    id="password"
            	                    type="password"
            	                    placeholder="Password"
            	                    name="password"
            	                    value={values.password}
            	                    onChange={e => setValues({ ...values, password: e.target.value })}
            	                />
            	            </div>
            	            <div className='flex items-center justify-between'>
            	                <a className='inline-block align-baseline font-bold text-sm text-gray-900 hover:text-blue-800' href="#">
            	                    Forgot Password?
            	                </a>
            	                <button className='bg-gray-800 hover:bg-green-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline' type="submit">
            	                    Submit
            	                </button>
            	            </div>
            	        </form>
            	    </div>
            	</div>	
        </>	
    )
}
export default Login;