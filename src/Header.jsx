import React from 'react';
import { Link } from 'react-router-dom';
import logo         from './assets/Mindcalm.png';
import sleepImg     from './assets/sleep.png';
import stressImg    from './assets/stress.png';
import mindImg      from './assets/mindfulness.png';
import cbtImg       from './assets/cbt.png';
import profileIcon  from './assets/user.png';
import settingsIcon from './assets/settings.png';

export function Header() {
  const navItems = [
    { to: '/sleep',       label: 'Sleep',       icon: sleepImg,     color: 'teal-200' },
    { to: '/stress',      label: 'Stress',      icon: stressImg,    color: 'blue-200' },
    { to: '/mindfulness', label: 'Mindfulness', icon: mindImg,      color: 'green-200' },
    { to: '/cbt',         label: 'CBT',         icon: cbtImg,       color: 'purple-200' },
    { to: '/user',        label: 'Profile',     icon: profileIcon,  color: 'yellow-200' },
    { to: '/settings',    label: 'Settings',    icon: settingsIcon, color: 'gray-200' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-md border-b border-white/10 shadow-sm z-30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="MindCalm logo" className="h-10 w-10 rounded-full shadow-md" />
          <span className="text-white text-2xl font-light tracking-wide drop-shadow">MindCalm</span>
        </Link>

        <nav className="flex items-center space-x-6">
          {navItems.map(({ to, label, icon, color }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center space-x-1 text-sm font-light hover:opacity-80 transition"
            >
              <img src={icon} alt={label} className="h-6 w-6 object-contain" />
              <span className={`text-${color} hover:text-white`}>{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
