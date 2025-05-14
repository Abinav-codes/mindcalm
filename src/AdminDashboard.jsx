/* eslint-disable no-unused-vars */
/* src/pages/AdminDashboard.jsx */

import React, { useContext, useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserGroupIcon,
  ChartBarIcon,
  DocumentTextIcon,
  MoonIcon,
  SunIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import { AppContext } from './AppContent';
import { toast, Toaster } from 'react-hot-toast';

function AdminDashboard() {
  const navigate = useNavigate();
  const { userRequests, userReports } = useContext(AppContext);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : [
      { id: 1, message: 'New weekly report submitted by Bob', time: 'Just now' },
      { id: 2, message: 'Profile updated successfully', time: '1 hour ago' }
    ];
  });
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode === 'dark');
    localStorage.setItem('theme', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const stats = useMemo(() => [
    { title: 'Total Users', value: userReports.length, icon: <UserGroupIcon className="h-8 w-8 text-blue-500 dark:text-blue-400" /> },
    { title: 'Active Requests', value: userRequests.filter(r => r.status === 'Waiting').length, icon: <ChartBarIcon className="h-8 w-8 text-yellow-500 dark:text-yellow-400" /> },
    { title: 'Reports Reviewed', value: userReports.filter(u => u.reports.length).length, icon: <DocumentTextIcon className="h-8 w-8 text-green-500 dark:text-green-400" /> }
  ], [userRequests, userReports]);

  const activities = useMemo(() => [
    { user: 'Alice', action: 'Report Reviewed', time: '5 minutes ago' },
    { user: 'Bob', action: 'Status Updated', time: '30 minutes ago' },
    { user: 'Charlie', action: 'Review Pending', time: '1 hour ago' }
  ], []);

  const handleThemeToggle = () => {
    setDarkMode(prev => (prev === 'dark' ? 'light' : 'dark'));
    toast.success(`Switched to ${darkMode === 'dark' ? 'light' : 'dark'} mode`);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${darkMode === 'dark' ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Toaster position="bottom-right" />
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{getGreeting()}, {localStorage.getItem('therapistUsername') || 'Dr. Smith'}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage all insights, requests, and reports from here.</p>
          </div>
          <div className="flex items-center space-x-4 relative">
            <button onClick={handleThemeToggle} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800" title="Toggle theme">
              {darkMode === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
            <div className="relative">
              <button onClick={() => setShowDropdown(prev => !prev)} className="relative">
                <BellIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">{notifications.length}</span>
                )}
              </button>
              <AnimatePresence>
                {showDropdown && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-xl text-sm z-50 overflow-hidden"
                  >
                    {notifications.map((note, idx) => (
                      <li key={idx} className="px-4 py-3 border-b dark:border-gray-700">
                        <p className="text-gray-800 dark:text-gray-100">{note.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{note.time}</p>
                      </li>
                    ))}
                    {notifications.length === 0 && (
                      <li className="px-4 py-3 text-center text-gray-500">No new notifications</li>
                    )}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
            <button onClick={() => navigate('/profile')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800" title="Profile">
              <img className="h-8 w-8 rounded-full" src={`https://api.dicebear.com/7.x/personas/svg?seed=Dr. Smith`} alt="avatar" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl w-full mx-auto px-6 py-10 space-y-12">
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Dashboard &gt; Overview
        </nav>

        <section className="text-center">
          <motion.h2 className="text-4xl font-bold" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Therapist Admin Overview
          </motion.h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Track all requests and reviews in one glance.</p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6">
            <motion.button
              onClick={() => navigate('/status')}
              whileHover={{ scale: 1.05 }}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:bg-blue-700"
            >
              Check Requests
            </motion.button>
            <motion.button
              onClick={() => navigate('/reports')}
              whileHover={{ scale: 1.05 }}
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:bg-green-700"
            >
              Review Reports
            </motion.button>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border dark:border-gray-700 hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
            >
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-gray-600 dark:text-gray-400">{stat.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">Latest Therapist Activity</h3>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow overflow-hidden">
            <ul>
              {activities.map((item, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start space-x-4 p-6 border-b dark:border-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <img className="h-10 w-10 rounded-full object-cover" src={`https://api.dicebear.com/7.x/personas/svg?seed=${item.user}`} alt="avatar" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {item.user} <span className="ml-2 text-sm bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">{item.action}</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.time}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="mt-auto py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © 2025 Mind and Soul. All rights reserved.
      </footer>
    </div>
  );
}

export default AdminDashboard;