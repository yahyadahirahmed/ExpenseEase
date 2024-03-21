import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/styles/Login.css';

function Login() {
  const navigate = useNavigate();
    // State hooks for username and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
  
    // Handle form submit
    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent default form submission behavior
  
      // Make an HTTP POST request to the login endpoint
      try {
        const response = await fetch('http://localhost:4000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
        // console.log(data);
  
        // Update login message based on server response
        if (data.success) {
          navigate('/line-manager');
          // Redirect user to another page 
        } else {
          setLoginMessage('Login failed: Invalid email or password, please try again');
        }
      } catch (error) {
        // console.error('Error:', error);
        setLoginMessage('Login failed: Network error or server not responding');
      }
    };
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
                        className='username-field'
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            
            <div>
                <label className='password'>Password:</label>
            </div>
            <div>
                <input 
                className='password-field'
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
        {loginMessage && <p>{loginMessage}</p>}
        </>
    )
}
export default Login;