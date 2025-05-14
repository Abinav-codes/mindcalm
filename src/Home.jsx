/* eslint-disable no-unused-vars */
// src/pages/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Header } from './Header';
import StatsDashboard from './StatsDashboard.jsx';
import AnimatedCard from './AnimatedCard.jsx';
import Card from './Card.jsx';

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
    <motion.div
      className="max-w-2xl text-sky-200 italic mt-4 mb-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 1 }}
    >
      “{quote}”
    </motion.div>
  );
}

function CrisisHelpButton() {
  return (
    <a
      href="https://www.who.int/campaigns/world-mental-health-day"

      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-lg transition-all"
      aria-label="Get crisis help"
    >
      Crisis Help
    </a>
  );
}

function DailyAffirmation() {
  const affirmations = [
    "You are enough.",
    "Every breath is a new beginning.",
    "Healing takes time and you're doing great.",
    "You deserve rest and peace.",
  ];
  const [affirmation, setAffirmation] = React.useState('');

  React.useEffect(() => {
    setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-4 text-center text-emerald-300 text-lg italic">
      {affirmation}
    </div>
  );
}

function AboutUsCard() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white/10 text-white p-6 rounded-xl mt-12 text-center shadow-xl">
      <h2 className="text-3xl font-semibold mb-4 text-cyan-300">About MindCalm</h2>
      <p className="text-lg">
        MindCalm is a digital sanctuary designed to help you manage stress, sleep better, and build emotional resilience. Our mission is to provide practical, evidence-based tools and guidance to help users cultivate mindfulness and maintain mental well-being every day.
      </p>
    </div>
  );
}

function FeedbackSection() {
  const feedbacks = [
    "MindCalm has changed how I start my mornings. I feel more grounded.",
    "The mindfulness exercises are truly helpful during anxious moments.",
    "This site is a gem—beautiful design and calming experience.",
    "Love the sleep improvement tracker! It made real difference.",
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 mt-16">
      <h3 className="text-2xl text-center text-sky-300 mb-8">What Users Say</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {feedbacks.map((msg, idx) => (
          <div key={idx} className="bg-white/10 p-4 rounded-lg shadow-md text-white">
            <p className="italic">“{msg}”</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const cards = [
    { to: '/sleep', title: 'Sleep', imgSrc: './sleep.png', description: 'Improve your sleep habits' },
    { to: '/stress', title: 'Stress', imgSrc: './stress.png', description: 'Assess and reduce stress' },
    { to: '/mindfulness', title: 'Mindfulness', imgSrc: './mindfulness.png', description: 'Practice daily mindfulness' },
  ];

  return (
    <div
      className="relative min-h-screen flex flex-col items-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white overflow-x-hidden"
    >
      <Header />
      <CrisisHelpButton />

      <main className="relative z-10 flex flex-col items-center justify-center flex-grow text-center px-4 pt-20 pb-16 space-y-6 w-full">
        <motion.div
          className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-light drop-shadow-lg text-cyan-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Welcome to MindCalm
          </motion.h1>

          <motion.video
            className="w-24 h-24 rounded-xl shadow-xl mix-blend-screen opacity-90 filter brightness-90 contrast-125"
            src="./smallanii.mp4"
            autoPlay
            loop
            muted
            playsInline
            initial={{ opacity: 0.7 }}
            whileHover={{ scale: 1.1, opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        </motion.div>

        <RandomQuote />
        <DailyAffirmation />

        <div className="flex flex-wrap justify-center gap-8 w-full px-8">
          {cards.map(({ to, title, imgSrc, description }) => (
            <motion.div
              key={to}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex-1 min-w-[280px] max-w-[400px] opacity-60 hover:opacity-100 transition-opacity duration-300"
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
      </main>

      <AboutUsCard />
      <FeedbackSection />

      <section className="w-full max-w-7xl mx-auto mt-16 bg-white/10 backdrop-blur-md rounded-2xl p-8">
        <StatsDashboard />
      </section>

      <footer className="w-full max-w-7xl mx-auto mt-12 px-8 flex justify-center pb-12">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="opacity-60 hover:opacity-100 transition-opacity duration-300"
        >
          <Card />
        </motion.div>
      </footer>
    </div>
  );
}
