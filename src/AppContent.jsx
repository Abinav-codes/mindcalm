/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userRequests, setUserRequests] = useState([
    { id: 1, username: 'Alice', requestType: 'Sleep', status: 'Waiting' },
    { id: 2, username: 'Bob', requestType: 'Stress', status: 'Approved' },
    { id: 3, username: 'Charlie', requestType: 'Anxiety', status: 'Rejected' },
  ]);

  const [userReports, setUserReports] = useState([
    {
      id: 1,
      username: 'Alice',
      reports: [
        {
          week: '2025-01-01 - 2025-01-07',
          summary: 'Improving steadily, maintained daily logs and followed relaxation exercises.',
          score: 85,
        },
        {
          week: '2025-01-08 - 2025-01-14',
          summary: 'Mood remained stable, slight improvement in sleep quality.',
          score: 88,
        },
      ],
    },
    {
      id: 2,
      username: 'Bob',
      reports: [
        {
          week: '2025-01-01 - 2025-01-07',
          summary: 'Stress levels are high due to work, suggested breathing exercises.',
          score: 70,
        },
        {
          week: '2025-01-08 - 2025-01-14',
          summary: 'Better stress management, practiced meditation regularly.',
          score: 78,
        },
      ],
    },
    {
      id: 3,
      username: 'Charlie',
      reports: [
        {
          week: '2025-01-01 - 2025-01-07',
          summary: 'Anxiety managed well, adherence to therapy recommendations.',
          score: 90,
        },
        {
          week: '2025-01-08 - 2025-01-14',
          summary: 'Continued improvements, participated in group therapy.',
          score: 92,
        },
      ],
    },
  ]);

  const updateRequestStatus = (id, newStatus) => {
    setUserRequests(prev =>
      prev.map(req => (req.id === id ? { ...req, status: newStatus } : req))
    );
  };

  const filterReportsByName = name => {
    if (!name) return userReports;
    return userReports.filter(report =>
      report.username.toLowerCase().includes(name.toLowerCase())
    );
  };

  return (
    <AppContext.Provider
      value={{ userRequests, updateRequestStatus, userReports, filterReportsByName }}
    >
      {children}
    </AppContext.Provider>
  );
};
