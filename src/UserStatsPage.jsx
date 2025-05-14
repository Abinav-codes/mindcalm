/* eslint-disable no-unused-vars */
/* UserStatusPage polished with sticky back button and tooltip */
import React, { useContext, useState, useEffect, useMemo } from 'react';
import { AppContext } from './AppContent';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function UserStatusPage() {
  const navigate = useNavigate();
  const { userRequests, updateRequestStatus } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [groupBy, setGroupBy] = useState('none');
  const [openGroups, setOpenGroups] = useState({});
  const [toast, setToast] = useState(null);
  const [showBack, setShowBack] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    let lastScroll = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      setShowBack(current < lastScroll);
      lastScroll = current;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filteredRequests = useMemo(() => {
    let requests = [...userRequests];
    if (filter !== 'All') {
      requests = requests.filter(req => req.status === filter);
    }
    return requests;
  }, [filter, userRequests]);

  const groupedRequests = useMemo(() => {
    if (groupBy === 'none') return { All: filteredRequests };
    return filteredRequests.reduce((acc, req) => {
      const key = req[groupBy];
      acc[key] = acc[key] || [];
      acc[key].push(req);
      return acc;
    }, {});
  }, [filteredRequests, groupBy]);

  const toggleGroup = (group) => {
    setOpenGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const handleStatusChange = (id, status) => {
    updateRequestStatus(id, status);
    setToast({ message: `Request marked as ${status}`, type: status });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen px-4 py-10 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-10"
      >
        <source src="https://www.videvo.net/videvo_files/converted/2017_08/preview/170717_07_Waves_4k_001.mp452243.webm" type="video/webm" />
        <source src="https://www.videvo.net/videvo_files/converted/2017_08/preview/170717_07_Waves_4k_001.mp452243.mp4" type="video/mp4" />
      </video>

      {toast && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 text-white px-4 py-2 rounded shadow-lg ${toast.type === 'Approved' ? 'bg-green-600' : toast.type === 'Rejected' ? 'bg-red-600' : 'bg-blue-600'}`}
        >
          {toast.message}
        </motion.div>
      )}

      <AnimatePresence>
        {showBack && (
          <motion.button
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate('/admin')}
            title="Go to Admin Dashboard"
            className="fixed top-4 left-4 z-50 text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow"
          >
            ← Back to Admin
          </motion.button>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">User Requests Status</h1>

        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="status-filter" className="text-sm font-medium">Filter:</label>
            <select
              id="status-filter"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md text-sm"
            >
              <option>All</option>
              <option>Approved</option>
              <option>Rejected</option>
              <option>Pending</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="group-by" className="text-sm font-medium">Group By:</label>
            <select
              id="group-by"
              value={groupBy}
              onChange={e => setGroupBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md text-sm"
            >
              <option value="none">None</option>
              <option value="requestType">Request Type</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>

        {Object.entries(groupedRequests).map(([group, requests]) => (
          <div key={group} className="space-y-4">
            {groupBy !== 'none' && (
              <button
                onClick={() => toggleGroup(group)}
                className="w-full text-left text-xl font-semibold border-b pb-1 border-gray-300 dark:border-gray-700 mt-6 focus:outline-none"
              >
                {group} {openGroups[group] ? '▼' : '▶'}
              </button>
            )}

            <AnimatePresence>
              {(groupBy === 'none' || openGroups[group]) && requests.map((req, idx) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl shadow px-6 py-4 mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-lg font-semibold">{req.username}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Request Type: {req.requestType}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Status: <span className={`font-semibold ${req.status === 'Approved' ? 'text-green-500' : req.status === 'Rejected' ? 'text-red-500' : 'text-yellow-500'}`}>{req.status}</span></p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleStatusChange(req.id, 'Approved')}
                        disabled={req.status === 'Approved'}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-40"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(req.id, 'Rejected')}
                        disabled={req.status === 'Rejected'}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-40"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
