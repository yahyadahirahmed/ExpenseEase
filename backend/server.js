import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { authenticateEmployee, findEmployee, findEmployeeClaims, findClaims } from './script.cjs'

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {
      origin: 'http://localhost:5173',
      methods: ["POST", "GET"],
      credentials: true
  }
));

const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Message: "Need to login first"});
    } else {
        jwt.verify(token, "secret-key-lol", (err, decoded) => {
            if(err) {
                return res.json({Message: "Auth error"});
            } else {
                next();
            }
        })
    }
}

app.get('/',authenticate, (req, res) => {
    return res.json({Status: "Success", email: req.email});
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const isAuthenticated = await authenticateEmployee(email, password);

    if (isAuthenticated) {
        console.log("login successful");
        const data = await findEmployee(email); // Store user info in data
        const tokenPayload = {
            name: data.name,
            id: data.id
        };
        
        const token = jwt.sign(
            tokenPayload,
            "secret-key-lol",
            { expiresIn: '1d' },
            );
            // console.log(id),
        res.cookie('token', token);
        return res.json({Status: "Success"});
        // return res.json({ success: true, message: "Authentication successful" });
        
    } else {
        return res.json({Message: "NO RECORD exists"});   // return
    }
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({Status: "Success"});
})

app.get('/find-employee', async (req, res) => {
    const email = req.query.email; // Accessing email passed as query parameter

    if (email) {
        try {
            const employee = await findEmployee(email);
            if (employee) {
                res.json({ success: true, employee });
            } else {
                res.status(404).json({ success: false, message: 'Employee not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'An error occurred' });
        }
    } else {
        res.status(400).json({ success: false, message: 'Email is required' });
    }
});


app.get('/claims', authenticate, async (req, res) => {
    try {
        // Decoding the token to get the employee ID.
        const token = req.cookies.token;
        const decoded = jwt.verify(token, "secret-key-lol");
        const employeeId = decoded.id;

        if (!employeeId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        // Using the employee ID to find the claims.
        const claims = await findEmployeeClaims(employeeId);
        
        if (claims) {
            res.json({ success: true, claims });
        } else {
            res.status(404).json({ success: false, message: 'No claims found for the employee' });
        }
    } catch (error) {
        console.error("Error fetching claims:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.get('/ClaimsForManager', authenticate, async (req, res) => {
    try {
        const claims = await findClaims();
        res.json({ success: true, claims });
    } catch (error) {
        console.error("Error fetching claims for manager:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
