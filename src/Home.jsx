/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Header } from './Header';
import StatsDashboard from './StatsDashboard.jsx';
import AnimatedCard from './AnimatedCard.jsx';
import Card from './Card.jsx';

// Quotes array
const quotes = [
  "Peace comes from within. Do not seek it without.",
  "In the silence of the mind, the healing of the soul.",
  "Humble minds are grateful minds; gratitude brings calm.",
  "A calm mind is the ultimate weapon against life's challenges.",
  "Positivity is a choice. Choose peace today.",
  "Stillness is where creativity and solutions emerge.",
];

function RandomQuote() {
  const [quote, setQuote] = React.useState('');
  React.useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);
  return (
    <motion.p
      className="max-w-2xl text-teal-100 italic mt-4 mb-12 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 1 }}
    >
      “{quote}”
    </motion.p>
  );
}

export default function Home() {
  const cards = [
    { to: '/sleep',       title: 'Sleep',             imgSrc: "./sleep.png",   description: 'Improve your sleep habits' },
    { to: '/stress',      title: 'Stress',            imgSrc: "./stress.png",  description: 'Assess and reduce stress' },
    { to: '/mindfulness', title: 'Mindfulness',       imgSrc: "./mindfulness.png", description: 'Practice daily mindfulness' },
    { to: '/cbt',         title: 'Cognitive Therapy',  imgSrc: "./cbt.png",     description: 'Learn CBT techniques' },
  ];

  return (
    <div
      className="relative min-h-screen bg-fixed bg-cover bg-center flex flex-col items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <Header />

      <div className="relative z-10 flex flex-col items-center justify-center flex-grow text-center px-4 pt-20 pb-16 space-y-6 w-full">
        {/* Title and WebM container */}
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-6xl font-light drop-shadow-lg text-teal-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Welcome to MindCalm
          </motion.h1>
          {/* Interactive WebM with glow on hover/tap */}
          <motion.video
            className="w-24 h-24 rounded-lg shadow-lg bg-transparent mix-blend-multiply opacity-70 filter brightness-70 contrast-110 transition-all"
            src="./smallanii.mp4"
            autoPlay
            loop
            muted
            initial={{ opacity: 0.7 }}
            whileHover={{ scale: 1.1, opacity: 1, boxShadow: '0 0 20px rgba(16,185,129,0.8)' }}
            whileTap={{ scale: 0.95, boxShadow: '0 0 15px rgba(16,185,129,0.6)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        </motion.div>

        <RandomQuote />

        <div className="flex flex-row flex-wrap justify-center items-center w-full px-8">
          {cards.map(({ to, title, imgSrc, description }) => (
            <motion.div
              key={to}
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(16,185,129,0.7)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex-1 min-w-[300px] max-w-[400px] opacity-60 hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
            >
              <AnimatedCard
                to={to}
                imgSrc={imgSrc}
                title={title}
                description={description}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Dashboard Section */}
      <section className="w-full max-w-7xl mx-auto mt-16 bg-black/20 backdrop-blur-md rounded-2xl p-8">
        <StatsDashboard />
      </section>

      {/* Footer Card Section */}
      <section className="w-full max-w-7xl mx-auto mt-12 px-8 flex justify-center">
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(16,185,129,0.7)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="opacity-60 hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
        >
          <Card />
        </motion.div>
      </section>
    </div>
  );
}
