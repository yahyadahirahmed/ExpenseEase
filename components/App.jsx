import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import Login from './Login.jsx';
import LineManager from './LineManager.jsx';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/line-manager" element={<LineManager />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App
