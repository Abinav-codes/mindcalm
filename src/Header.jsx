/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '/Mindcalm.png';
import sleepImg from './assets/sleep.png';
import stressImg from './assets/stress.png';
import mindImg from './assets/mindfulness.png';

const navItems = [
  { to: '/sleep', label: 'Sleep', icon: sleepImg },
  { to: '/stress', label: 'Stress', icon: stressImg },
  { to: '/mindfulness', label: 'Mindfulness', icon: mindImg }
];

export function Header() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.add('transition-colors', 'duration-500');
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#0d1b2a]/50 dark:bg-[#415a77]/50 backdrop-blur-md border-b border-black/20 dark:border-white/20 shadow-sm z-30 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="MindCalm logo" className="h-10 w-10 rounded-full shadow-md" />
          <span className="text-white text-2xl font-light tracking-wide drop-shadow-lg">MindCalm</span>
        </Link>

        <nav className="flex items-center space-x-6">
          {navItems.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center space-x-1 text-sm font-light hover:opacity-80 transition"
            >
              <img src={icon} alt={label} className="h-6 w-6 object-contain" />
              <span className="text-white hover:text-teal-400">{label}</span>
            </Link>
          ))}

          <button
            onClick={toggleTheme}
            className="ml-4 px-3 py-1 border border-black/20 dark:border-white/20 rounded-lg text-white text-xs hover:bg-black/20 dark:hover:bg-white/20 transition-colors duration-300"
            aria-label="Toggle color theme"
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'} Mode
          </button>
        </nav>
      </div>
    </header>
  );
}
