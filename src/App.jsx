import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import Stress from './Stress.jsx';
import Home from './Home.jsx';
import Sleep from './Sleep.jsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/sleep" element={<Sleep />} />
      <Route path="/stress" element={<Stress />}/>
    </Routes>
  );
}

export default App;
