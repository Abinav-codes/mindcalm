/* eslint-disable no-unused-vars */
/* src/pages/ProfilePage.jsx */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(() => localStorage.getItem('therapistUsername') || 'Dr. Smith');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [notifications, setNotifications] = useState(() => {
    const prev = localStorage.getItem('notifications');
    return prev ? JSON.parse(prev) : [];
  });

  useEffect(() => {
    document.title = `${username}'s Profile`;
  }, [username]);

  const addNotification = (message) => {
    const timestamp = new Date().toLocaleString();
    const updated = [
      { id: Date.now(), message, time: timestamp },
      ...notifications.slice(0, 19)
    ];
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!username.trim()) return toast.error('Username is required');
    if (password && password !== newPassword) return toast.error('Passwords do not match');

    localStorage.setItem('therapistUsername', username);
    if (password) localStorage.setItem('therapistPassword', password);

    addNotification('📝 Therapist profile updated successfully');
    toast.success('Profile updated successfully');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 py-10 px-4">
      <Toaster />
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4">Therapist Profile</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Update your profile details below. Changes will be reflected immediately on the dashboard and in notifications.</p>
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-700"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
            type="submit"
          >
            Save Changes
          </motion.button>
        </form>
      </div>
    </div>
  );
}
