import express from 'express';
import cors from 'cors'; // Import CORS package
import { getEmployeeDetails, authenticateEmployee } from './script.js';
import session from 'express-session';


const app = express();

const corsOptions = {
    origin: 'http://localhost:5174', // Specify the origin of your frontend app
    credentials: true, // Allow credentials
  };

app.use(express.json());
app.use(cors(corsOptions)); // Enable CORS for all routes

app.use(session({
    secret: 'my-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true } // Add httpOnly for added security
  }));
  
// Correct the route definition for login
app.post('/login', async (req, res) => {
  console.log(req.session); // DEBUGGING  
    const { email, password } = req.body;
    const isAuthenticated = await authenticateEmployee(email, password);

    if (isAuthenticated) {
        req.session.user = { email }; // Store user info in session
        console.log({email}); // DEBUGGING
        res.json({ success: true, message: "Authentication successful" });
    } else {
        res.status(401).json({ success: false, message: "Authentication failed" });
        console.log(req.session); // DEBUGGING  
    }
});

app.get('/employee-details', async (req, res) => {
  console.log("are you here"); // DEBUGGING  
  console.log('Session in employee-details:', req.session); // DEBUGGING  
  if (!req.session.user || !req.session.user.email) {
      return res.status(401).json({ message: "No user logged in" });
  }
  const email = req.session.user.email;
  const employee = await authenticateEmployee(email);
  if (employee) {
      const details = await getEmployeeDetails(employee.id);
      res.json(details);
  } else {
      res.status(404).json({ message: "Employee not found" });
  }
});

app.get('/employee/:id', async (req, res) => {
  const employeeId = parseInt(req.params.id);
  const details = await getEmployeeDetails(employeeId);

  if (details) {
      res.json(details);
  } else {
      res.status(404).json({ message: "Employee not found" });
  }
});
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Could not log out.');
      } else {
        res.send({ success: true, message: 'Logout successful' });
      }
    });
  });  


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
