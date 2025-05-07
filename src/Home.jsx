/* eslint-disable no-unused-vars */
// src/Home.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import StatsDashboard from './StatsDashboard';

const quotes = [
  "Peace comes from within. Do not seek it without.",
  "In the silence of the mind, the healing of the soul.",
  "Humble minds are grateful minds; gratitude brings calm.",
  "A calm mind is the ultimate weapon against life's challenges.",
  "Positivity is a choice. Choose peace today.",
  "Stillness is where creativity and solutions emerge.",
];

function RandomQuote() {
  const [quote, setQuote] = useState('');
  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);
  return (
    <motion.p
      className="max-w-lg text-md md:text-lg text-white/70 italic mt-4 mb-12 cursor-default"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 1 }}
    >
      "{quote}"
    </motion.p>
  );
}

export default function Home() {
  const cards = [
    { to: '/sleep', title: 'Sleep', imgSrc: '/sleep.png', color: 'teal' },
    { to: '/stress', title: 'Stress', imgSrc: 'src/assets/stress.png', color: 'blue' },
    { to: '/mindfulness', title: 'Mindfulness', imgSrc: 'src/assets/mindfulness.png', color: 'green' },
    { to: '/cbt', title: 'CBT', imgSrc: 'src/assets/cbt.png', color: 'purple' },
  ];

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-fixed flex flex-col cursor-default"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <Header />

      <div className="relative z-10 flex flex-col items-center justify-center flex-grow text-center px-4 pt-20 pb-10">
        {/* Title */}
        <motion.h1
          className="text-5xl md:text-6xl font-light tracking-wide text-white drop-shadow-lg mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to MindCalm
        </motion.h1>

        {/* Quote */}
        <RandomQuote />

        {/* Feature Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-6xl"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {cards.map(({ to, title, imgSrc, color }) => (
            <motion.div
              key={to}
              className="group bg-black/30 border border-white/20 rounded-2xl p-6 flex flex-col items-center backdrop-blur-md shadow-lg transition duration-300 cursor-pointer"
              whileHover={{ y: -6, scale: 1.04, rotate: 1 }}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <Link to={to} className="flex flex-col items-center">
                <motion.img
                  src={imgSrc}
                  alt={title}
                  className="h-16 w-16 object-contain"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                />
                <motion.h3
                  className={`mt-4 text-lg font-light text-${color}-200 hover:text-${color}-100 transition-colors`}
                >
                  {title}
                </motion.h3>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Stats Dashboard Section */}
      <section className="w-full max-w-7xl mx-auto mt-16 bg-black/20 backdrop-blur-md rounded-2xl p-8 shadow-lg">
        <StatsDashboard />
      </section>
    </div>
  );
}
