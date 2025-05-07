/* eslint-disable no-unused-vars */
// src/Stress.jsx
import { Player } from '@lottiefiles/react-lottie-player';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/outline';

// List of 20 stress-related questions
const questionsList = [
  "How overwhelmed have you felt by daily tasks this week?",
  "On a scale of 1–10, how much control do you feel you have over your life right now?",
  "How frequently have you felt nervous or stressed recently?",
  "How often have you struggled to cope with everything on your plate?",
  "How supported do you feel by friends and family when you’re pressured?",
  "Rate how much physical tension (e.g. headaches, muscle tightness) you’ve experienced.",
  "How often has your sleep been disrupted by stress?",
  "How much has work or study demand affected your well‑being?",
  "Rate your current ability to relax and unwind on a 1–10 scale.",
  "How often have you felt irritability or anger due to stress?",
  "How much has stress impacted your appetite or eating habits?",
  "Rate how well you balance personal time versus obligations.",
  "How frequently have you felt mentally exhausted or fatigued?",
  "How confident are you in handling unexpected challenges?",
  "How often have you used coping strategies (e.g., meditation) effectively?",
  "Rate the overall impact of stress on your daily mood.",
  "How much has screen time added to your stress levels?",
  "How well do you maintain physical activity to manage stress?",
  "Rate your satisfaction with your current work‑life balance.",
  "How likely are you to seek support when feeling stressed?"
];

export default function Stress({ backgroundVideo }) {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // Shuffle questions on mount
    setQuestions(
      questionsList
        .map(q => ({ q, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ q }) => q)
    );
  }, []);

  const handleAnswer = rating => {
    setAnswers(prev => [...prev, rating]);
    setCurrentIdx(prev => prev + 1);
  };

  const transition = { type: 'tween', ease: [0.43, 0.13, 0.23, 0.96], duration: 0.6 };

  // Completed quiz
  if (currentIdx >= questions.length) {
    return (
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 object-cover w-full h-full"
          autoPlay
          loop
          muted
          src={backgroundVideo || '/stressbg.mp4'}
          type="video/mp4"
        />

        <motion.div
          className="flex items-center justify-center h-full text-white relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="text-center">
            <motion.h1
              className="text-4xl font-light mb-4 drop-shadow"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              ✨ Thank You!
            </motion.h1>
            <p className="text-lg mb-8 text-white/80">
              You’ve completed the stress assessment.
            </p>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center shadow-lg backdrop-blur-lg mx-auto"
            >
              <SparklesIcon className="h-8 w-8 text-yellow-300" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Quiz in progress
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 object-cover w-full h-full"
        autoPlay
        loop
        muted
        src={backgroundVideo || '/stressbg.mp4'}
        type="video/mp4"
      />

      {/* Lottie stars animation */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Player autoplay loop src="/animations/stars.json" className="w-full h-full" />
      </div>

      <div className="relative z-10 flex items-center justify-center h-full p-4">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIdx}
            className="bg-black/40 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg max-w-md w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={transition}
          >
            <h2 className="text-2xl font-light mb-4 drop-shadow">
              {questions[currentIdx]}
            </h2>

            {/* 1–10 scale buttons */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                <motion.button
                  key={num}
                  className="py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md text-white font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(num)}
                  transition={transition}
                >
                  {num}
                </motion.button>
              ))}
            </div>

            {/* Skip option */}
            <motion.button
              onClick={() => setCurrentIdx(idx => idx + 1)}
              className="text-sm text-white/70 underline hover:text-white mt-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ...transition, delay: 0.4 }}
            >
              Skip question
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
