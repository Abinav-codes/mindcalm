/* eslint-disable no-unused-vars */
// src/components/SleepTherapistCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';
import profile from './assets/user.png'; // Add this image to your assets
import podcastAudio from './assets/rain.ogg'; // Add this audio to your assets

export default function SleepTherapistCard() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => setPlaying(prev => !prev);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    playing ? audio.play().catch(() => {}) : audio.pause();
  }, [playing]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 dark:bg-black/20 backdrop-blur p-6 rounded-2xl max-w-3xl mx-auto"
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        <motion.img
          src={profile}
          alt="Therapist Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-indigo-400 shadow-lg animate-pulse"
        />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-indigo-200">Dr. Elise Morgan</h3>
          <p className="text-sm text-gray-300">Age: 45 | Country: Canada</p>
          <p className="mt-2 text-base text-gray-200">
            Dr. Elise Morgan is a certified sleep therapist with over 20 years of experience helping patients overcome chronic insomnia and stress-related sleep issues. She combines mindfulness, behavioral therapy, and neuroscience in her approach.
          </p>
          <p className="mt-3 text-sm text-indigo-100">
            <strong>Book Recommendation:</strong> "Say Good Night to Insomnia" by Gregg D. Jacobs
          </p>
          <p className="text-sm text-indigo-100">
            <strong>Favourite Tip:</strong> Dim lights 2 hours before bedtime to trigger natural melatonin release.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <button onClick={togglePlay} className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded-full">
              {playing ? <PauseIcon className="w-5 h-5 text-white" /> : <PlayIcon className="w-5 h-5 text-white" />}
            </button>
            <span className="text-sm text-gray-100">Podcast: The Science of Stillness</span>
            <audio ref={audioRef} src={podcastAudio} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
