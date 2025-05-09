/* eslint-disable no-unused-vars */
/* File: Mindfulness.jsx */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define bucket categories with tags matching question options
const bucketCategories = [
  {
    title: 'Iconic Travel Destinations',
    tag: 'Nature & Scenery',
    items: [
      'See the Northern Lights',
      'Snorkel the Great Barrier Reef',
      'Cruise Norway’s fjords',
      'Explore Machu Picchu in Peru',
    ],
  },
  {
    title: 'Urban & Culture Hotspots',
    tag: 'Urban & Culture',
    items: [
      'See the Mona Lisa in Paris',
      'Visit the Louvre and Eiffel Tower',
      'Experience Holi festival in India',
      'See a Broadway show in New York City',
    ],
  },
  {
    title: 'Adventure & Extreme Activities',
    tag: 'Adventure & Extreme',
    items: [
      'Skydive or parachute jump',
      'Bungee-jump off a famous bridge',
      'Climb a famous peak (e.g., Kilimanjaro)',
      'White-water raft on a major river',
    ],
  },
];

export default function Mindfulness() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 'travel',
      text: 'What type of destinations excite you most?',
      options: ['Nature & Scenery', 'Urban & Culture', 'Adventure & Extreme'],
    },
    // Other questions kept but filtering only on 'travel'
    {
      id: 'growth',
      text: 'Which personal growth goal appeals most?',
      options: ['Health & Fitness', 'Learning & Skill', 'Financial'],
    },
    {
      id: 'experience',
      text: 'What kind of experiences do you value?',
      options: ['Events & Festivals', 'Milestones & Life', 'Volunteer & Giving'],
    },
  ];

  const handleStart = () => setStep(1);
  const handleOption = (qId, option) => {
    setAnswers(prev => ({ ...prev, [qId]: option }));
    setStep(prev => prev + 1);
  };

  // Only filter by travel answer
  const filterCategories = () => {
    if (!answers.travel) return [];
    return bucketCategories.filter(cat => cat.tag === answers.travel);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Fullscreen background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover brightness-75"
        src="/mindfulness.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <AnimatePresence exitBeforeEnter>
          {/* Intro */}
          {step === 0 && (
            <motion.div
              key="intro"
              className="bg-white bg-opacity-40 backdrop-blur-sm rounded-3xl shadow-2xl p-12 cursor-pointer text-center max-w-md mx-auto"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 120 }}
              onClick={handleStart}
            >
              <h1 className="text-5xl font-bold text-green-900">Wanna Check Bucket List?</h1>
              <p className="mt-4 text-green-800 text-lg">Click to begin</p>
            </motion.div>
          )}

          {/* Question */}
          {step > 0 && step <= questions.length && (
            <motion.div
              key={`q-${step}`}
              className="bg-white bg-opacity-40 backdrop-blur-sm rounded-3xl shadow-2xl p-10 max-w-lg w-full mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-semibold text-green-900 mb-6 text-center">
                {questions[step - 1].text}
              </h2>
              <div className="space-y-4">
                {questions[step - 1].options.map(opt => (
                  <motion.button
                    key={opt}
                    className="w-full text-center text-xl px-6 py-3 border-2 border-green-900 rounded-full"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleOption(questions[step - 1].id, opt)}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Results - simple fade and scale on hover */}
          {step > questions.length && (
            <motion.div
              key="results"
              className="w-full flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-6xl font-bold text-green-900 mb-8 text-center">
                Your Dream Bucket List
              </h1>
              <div className="w-full flex justify-center overflow-x-auto px-6 space-x-8">
                {filterCategories().length > 0 ? (
                  filterCategories().map((cat, idx) => (
                    <motion.div
                      key={idx}
                      className="min-w-[400px] max-w-[500px] bg-white bg-opacity-40 backdrop-blur-sm rounded-3xl shadow-2xl p-8 cursor-pointer flex-shrink-0"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 100 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <h2 className="text-3xl font-semibold text-green-800 mb-6 text-center">{cat.title}</h2>
                      <ul className="list-disc list-inside space-y-3 text-green-700 text-lg">
                        {cat.items.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-green-800 text-2xl">No matching categories.</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}