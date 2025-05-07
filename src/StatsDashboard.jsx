/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { motion } from 'framer-motion';

// Sample weekly metrics
const sleepByCountry = [
  { day: 'NZ', hours: 52.15 },
  { day: 'NL', hours: 51.80 },
  { day: 'FI', hours: 51.66 },
  { day: 'UK', hours: 51.52 },
  { day: 'JP', hours: 44.10 },
];
const sleepByAge = [
  { day: '18–25', hours: 56.0 },
  { day: '26–64', hours: 56.0 },
  { day: '65+',   hours: 52.5 },
];

export default function StatsDashboard() {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(true), []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.4 } }
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <div className="py-12 bg-transparent max-w-7xl mx-auto">
      <motion.h1
        className="text-3xl md:text-4xl text-white font-light text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Weekly Sleep Statistics
      </motion.h1>

      <motion.div
        className="grid gap-12 grid-cols-1 lg:grid-cols-2"
        initial="hidden"
        animate={visible ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {/* Country Sleep Chart */}
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-shadow duration-300"
          variants={cardVariants}
          whileHover={{ scale: 1.03 }}
        >
          <h2 className="text-2xl text-teal-300 mb-6 text-center">Average Weekly Sleep by Country</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sleepByCountry} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" />
              <XAxis dataKey="day" stroke="#fff" padding={{ left: 20, right: 20 }} />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none' }} />
              <Line type="monotone" dataKey="hours" stroke="#34d399" strokeWidth={4} dot={{ r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Age Group Sleep Chart */}
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-shadow duration-300"
          variants={cardVariants}
          whileHover={{ scale: 1.03 }}
        >
          <h2 className="text-2xl text-purple-300 mb-6 text-center">Average Weekly Sleep by Age Group</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sleepByAge} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" />
              <XAxis dataKey="day" stroke="#fff" padding={{ left: 20, right: 20 }} />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none' }} />
              <Bar dataKey="hours" fill="#a78bfa" barSize={28} radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </div>
  );
}
