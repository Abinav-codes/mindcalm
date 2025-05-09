/* eslint-disable no-unused-vars */
/* File: Mindfulness.jsx */
import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const bucketCategories = [ 
   {
    title: 'Iconic Travel Destinations',
    items: [
      'See the Northern Lights',
      'Go on an African safari (e.g., Serengeti)',
      'Snorkel the Great Barrier Reef',
      'Take a classic American road trip (Route 66, Pacific Coast Highway)',
      'Visit the Maldives',
      'See the Mona Lisa in Paris',
      'Cruise Norway’s fjords',
      'Explore Machu Picchu in Peru',
    ],
  },
  {
    title: 'Personal‐Growth & Lifestyle Goals',
    items: [
      'Improve health or lose weight',
      'Buy your own home',
      'Learn a new language',
      'Write and publish a book',
      'Run a marathon or complete a triathlon',
      'Achieve financial independence/retire early',
    ],
  },
  {
    title: 'Adventure & Extreme Activities',
    items: [
      'Skydive or parachute jump',
      'Bungee-jump off a famous bridge',
      'Scuba-dive in a shipwreck',
      'Climb a famous peak (e.g., Kilimanjaro, Everest Base Camp)',
      'White-water raft on a major river',
    ],
  },
  {
    title: 'Cultural & Bucket-List Events',
    items: [
      'Attend La Tomatina in Spain',
      'Celebrate Carnival in Rio de Janeiro',
      'Watch a major sporting event (Olympics, World Cup)',
      'Experience Holi festival in India',
      'See a Broadway show in New York City',
    ],
  },
  {
    title: 'Life‐Milestone Experiences',
    items: [
      'Get married in a dream location',
      'Have children or adopt a child',
      'Reconnect with an old friend or relative',
      'Volunteer for a cause abroad',
      'Learn to cook a regional cuisine (e.g., sushi, pasta)',
    ],
  },
 ];

export default function Mindfulness() {
  return (
    <div className="relative h-screen w-screen overflow-auto">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/mindfulness.mp4"
        autoPlay loop muted playsInline
      />

      <div className="relative z-10 bg-green-100 bg-opacity-40 backdrop-blur-lg min-h-screen p-8">
        <h1 className="text-5xl font-bold text-green-800 mb-8 text-center">
          Your Dream Bucket List
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bucketCategories.map((cat, idx) => (
            <TiltCard key={idx} title={cat.title} items={cat.items} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Reusable TiltCard component
function TiltCard({ title, items, delay }) {
  // Framer Motion tilt logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [50, -50], [-10, 10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  function handleMouse(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  return (
    <motion.div
      className="bg-white bg-opacity-30 backdrop-blur-md rounded-3xl shadow-2xl p-6 cursor-pointer"
      style={{ rotateX, rotateY, x, y }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(34,197,94,0.5)' }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      <h2 className="text-2xl font-semibold text-green-700 mb-4">{title}</h2>
      <ul className="list-disc list-inside space-y-2 text-green-600">
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
      <div className="mt-6 text-right">
        <button className="px-4 py-2 border border-green-700 text-green-700 rounded-full hover:bg-green-700 hover:text-white transition">
          Add to My List
        </button>
      </div>
    </motion.div>
  );
}
