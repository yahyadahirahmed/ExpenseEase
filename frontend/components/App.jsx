import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import Login from './Login.jsx';
import LineManager from './LineManager.jsx';
import Shush from './shush.jsx';
import Admin from './Admin.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/line-manager" element={<LineManager />} />
        <Route path="/shush" element={<Shush />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
