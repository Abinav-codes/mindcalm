/* eslint-disable no-unused-vars */
// src/components/BreathingModal.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BreathingModal({ open, onClose }) {
  const [phase, setPhase] = useState('Inhale');
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!open) return;
    setPhase('Inhale');
    setCounter(0);

    const interval = setInterval(() => {
      setPhase(prev => (prev === 'Inhale' ? 'Exhale' : 'Inhale'));
      setCounter(c => c + 1);
    }, 4000);

    const timeout = setTimeout(onClose, 60000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="bg-white dark:bg-black rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
            <div className="text-2xl font-semibold text-teal-500 mb-4 animate-pulse">{phase}</div>
            <motion.div
              className="mx-auto w-40 h-40 rounded-full border-4 border-teal-400"
              animate={{ scale: phase === 'Inhale' ? 1.1 : 0.9 }}
              transition={{ duration: 4 }}
            />
            <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
              Close your eyes and follow your breath. We'll close this after one minute.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-4 py-2 rounded bg-teal-600 hover:bg-teal-700 text-white text-sm"
            >
              Skip / Exit Early
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
