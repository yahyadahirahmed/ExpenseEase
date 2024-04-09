import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import Login from './Login.jsx';
import LineManager from './LineManager.jsx';
// import Shush from './shush.jsx';
import Admin from './Admin.jsx';
import Employee from './Employee.jsx';
import MakeClaim from './MakeClaim.jsx';
import MakeClaimLM from './MakeClaimLM.jsx';
import LineManagerClaims from './LineManagerClaims.jsx';
import CreatAccount from './CreateAccount.jsx';
import SuperManager from './SuperManager.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/lineManager" element={<LineManager />} />
        <Route path="/lineManagerClaims" element={<LineManagerClaims />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/makeClaim" element={<MakeClaim />} />
        <Route path="/makeClaimLM" element={<MakeClaimLM />} />
        <Route path="/superManager" element={<SuperManager/>}/>
        <Route path="/createAccount" element={<CreatAccount/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
