import React, { useState } from 'react';


function Form() {
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
        window.location.href = "https://www.netflix.com/browse";
        // Redirect user to another page 
      } else {
        setLoginMessage('Login failed: Invalid email or password');
      }
    } catch (error) {
      // console.error('Error:', error);
      setLoginMessage('Login failed: Network error or server not responding');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          </label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        <label>
          Password:
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <button type="submit">Submit</button>
      </form>
      {loginMessage && <p>{loginMessage}</p>}
    </>
  );
}

export default Form;


// what we need is to be able to use the script.ts file database in the form.jsx file,
// or query the database and display the data in the form.jsx file (for practice)