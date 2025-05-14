/* eslint-disable no-unused-vars */
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Core pages
import Login           from './Login.jsx';
import Home            from './Home.jsx';
import Sleep           from './Sleep.jsx';
import Stress          from './Stress.jsx';
import Mindfulness     from './Mindfulness.jsx';

// Admin flow pages
import AdminPage       from './AdminPage.jsx';        // /admin
import UserStatsPage   from './UserStatsPage.jsx';    // /admin/status
import UserReportsPage from './UserReportsPage.jsx';  // /admin/reports
import ProfilePage     from './ProfilePage.jsx';      // /admin/profile
import SelfImprovement from './SelfImprovement.jsx';

export default function App() {
  return (
    <Routes>
      {/* Public / User */}
      <Route path="/"            element={<Login />} />
      <Route path="/home"        element={<Home />} />
      <Route path="/sleep"       element={<Sleep />} />
      <Route path="/stress"      element={<Stress />} />
      <Route path="/mindfulness" element={<Mindfulness />} />

      {/* Admin / Therapist */}
      <Route path="/admin"         element={<AdminPage />} />
      <Route path="/status" element={<UserStatsPage />} />
          <Route path="/reports" element={<UserReportsPage />} />
           <Route path="/profile" element={<ProfilePage />} />
           <Route path="/self-improvement" element={<SelfImprovement />} />
          <Route path="*" element={<UserStatsPage />} />
    </Routes>
  );
}
