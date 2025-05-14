/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();

  if (username === 'admin' && password === '1234') {
    localStorage.setItem('therapistUsername', 'Dr. Smith');
    localStorage.setItem('therapistPassword', '1234');
    navigate('/admin');
  } else if (username === 'user' && password === 'user123') {
    navigate('/home');
  } else {
    setError('Invalid username or password');
  }
};

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      {/* Floating bubble */}
      <div className="absolute top-12 w-24 h-24 rounded-full bg-blue-200 opacity-30 animate-pulse-slow z-0" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/70 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in"
      >
        <div className="flex justify-center mb-6">
          <img
            src="/Mindcalm.png"
            alt="MindCalm logo"
            className="h-16 w-16 rounded-full shadow-md"
          />
        </div>
        <h2 className="text-3xl font-light text-gray-800 text-center mb-6">Log into your account</h2>
        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}

        <div className="mb-4">
          <label className="block mb-2 text-gray-700 text-sm">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg 
                       focus:ring-2 focus:ring-blue-200 focus:outline-none transition duration-300"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-gray-700 text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg 
                       focus:ring-2 focus:ring-blue-200 focus:outline-none transition duration-300"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-300 hover:bg-blue-400 text-gray-900 font-medium 
                     py-3 rounded-lg transition duration-300 shadow-md"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
