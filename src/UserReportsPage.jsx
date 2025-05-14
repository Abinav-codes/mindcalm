/* eslint-disable no-unused-vars */
// src/pages/UserReportsReviewPage.jsx

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './AppContent';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PaperAirplaneIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/solid';

export default function UserReportsReviewPage() {
  const navigate = useNavigate();
  const { userReports } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [acceptedUsers, setAcceptedUsers] = useState([]);
  const [reviewedUsers, setReviewedUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [reviewDrafts, setReviewDrafts] = useState(() => {
    const stored = localStorage.getItem('reviewDrafts');
    return stored ? JSON.parse(stored) : {};
  });
  const [toast, setToast] = useState(null);

  const filteredRequests = userReports.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !reviewedUsers.includes(user.id)
  );

  const handleAccept = (id) => {
    setAcceptedUsers((prev) => [...prev, id]);
  };

  const handleReviewSend = (user) => {
    const reviewText = reviewDrafts[user.id]?.trim();
    if (!reviewText) return;
    setToast(`Review sent to ${user.username}`);
    setTimeout(() => setToast(null), 4000);
    setReviewedUsers((prev) => [...prev, user.id]);
    setAcceptedUsers((prev) => prev.filter((uid) => uid !== user.id));
    setSelectedUserId(null);
    setReviewDrafts((prev) => {
      const updated = { ...prev };
      delete updated[user.id];
      localStorage.setItem('reviewDrafts', JSON.stringify(updated));
      return updated;
    });
  };

  const calculateAverage = (reports) => {
    if (!reports?.length) return 0;
    const total = reports.reduce((sum, r) => sum + (r.score || 0), 0);
    return Math.round(total / reports.length);
  };

  const highlightText = (text) => {
    const stressWords = /(stress|anxiety|depressed|tired|panic|anxious)/gi;
    return text.replace(stressWords, (match) => `<mark class='bg-yellow-200 dark:bg-yellow-700 px-1 rounded'>${match}</mark>`);
  };

  const updateDraft = (userId, value) => {
    setReviewDrafts((prev) => {
      const updated = { ...prev, [userId]: value };
      localStorage.setItem('reviewDrafts', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mb-6 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
          onClick={() => navigate('/admin')}
        >
          <ArrowLeftIcon className="w-5 h-5" /> Back to Admin
        </motion.button>

        <header className="mb-8 text-center">
          <motion.h1 className="text-4xl font-bold mb-2" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>Weekly Report Reviews</motion.h1>
          <p className="text-gray-600 dark:text-gray-400">Review user-submitted weekly logs. Accept and send a tailored review based on data insights.</p>
        </header>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search user by name..."
            className="p-3 w-full md:w-1/2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 bg-white"
          />
        </div>

        {toast && (
          <div className="mb-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-4 py-2 rounded-lg shadow"
            >
              {toast}
            </motion.div>
          </div>
        )}

        <div className="grid gap-6">
          {filteredRequests.map((user) => (
            <motion.div
              key={user.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md border dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-xl font-semibold flex items-center gap-2">👤 {user.username}</p>
                  <motion.p className="text-sm text-gray-500 dark:text-gray-400 mt-1" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                    Avg Score: {calculateAverage(user.reports)}
                  </motion.p>
                  <p className="text-sm text-gray-500 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: highlightText(user.reports.at(-1)?.summary || 'No reports yet') }} />
                </div>

                {acceptedUsers.includes(user.id) ? (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white rounded-lg cursor-not-allowed"
                  >
                    <ClockIcon className="w-5 h-5" /> In Progress
                  </motion.button>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAccept(user.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <CheckCircleIcon className="w-5 h-5" /> Accept & Review
                  </motion.button>
                )}
              </div>

              <AnimatePresence>
                {acceptedUsers.includes(user.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6 pt-2 bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-700"
                  >
                    <h3 className="text-lg font-semibold mb-2">Weekly Reports</h3>
                    <div className="grid gap-4">
                      {user.reports.map((rep, idx) => (
                        <div key={idx} className={`p-4 rounded-lg border dark:border-gray-700 ${rep.score < 60 ? 'bg-red-50 dark:bg-red-900' : 'bg-white dark:bg-gray-800'}`}>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Week: {rep.week}</p>
                          <p className="mt-1 font-medium" dangerouslySetInnerHTML={{ __html: highlightText(rep.summary) }} />
                          <p className="text-sm text-gray-500 dark:text-gray-400">Score: {rep.score}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <textarea
                        value={reviewDrafts[user.id] || ''}
                        onChange={(e) => updateDraft(user.id, e.target.value)}
                        placeholder="Write your review here..."
                        className="w-full p-3 rounded-lg border dark:border-gray-700 dark:bg-gray-800 bg-white"
                        rows={4}
                        maxLength={500}
                      />
                      <div className="text-right text-xs mt-1 text-gray-500 dark:text-gray-400">
                        {reviewDrafts[user.id]?.length || 0}/500 characters
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleReviewSend(user)}
                        disabled={!reviewDrafts[user.id]?.trim()}
                        className={`mt-4 flex items-center gap-2 px-5 py-3 rounded-lg text-white ${reviewDrafts[user.id]?.trim() ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
                      >
                        <PaperAirplaneIcon className="w-5 h-5" /> Send Review
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
