/* eslint-disable no-unused-vars */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import Stress from './Stress.jsx';
import Home from './Home.jsx';
import Sleep from './Sleep.jsx';
import Mindfulness from './Mindfulness.jsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/sleep" element={<Sleep />} />
      <Route path="/stress" element={<Stress />}/>
      <Route path="/mindfulness" element={<Mindfulness />} />
    </Routes>
  );
}

export default App;
