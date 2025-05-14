/* eslint-disable no-unused-vars */
/* SelfImprovement.jsx - Final Polished Version with Audio, Books, Tasks */
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon, PauseIcon, PlayIcon, ForwardIcon, BackwardIcon, SpeakerWaveIcon, StarIcon } from '@heroicons/react/24/outline';
import backgroundVideo from './assets/northern-lights.mp4';
import rain from './assets/rain.ogg';
import space from './assets/space.ogg';
import piano from './assets/panio.ogg';
import confetti from 'canvas-confetti';

const tracks = [
  { title: 'Rain Sounds', src: rain },
  { title: 'Lo-fi Soft Beat', src: space },
  { title: 'Piano Calm', src: piano },
];

const quotes = [
  "Sleep is the best meditation. — Dalai Lama",
  "A good laugh and a long sleep are the best cures in the doctor’s book.",
  "Your future depends on your dreams, so go to sleep.",
  "Let her sleep, for when she wakes she will move mountains."
];

const defaultTasks = [
  'Maintain consistent sleep schedule',
  'Avoid screens 30 minutes before bed',
  'Practice deep breathing before sleep',
];

const sleepBooks = [
  {
    title: "Why We Sleep by Matthew Walker",
    overview: "A deep dive into the science of sleep and how it affects everything from learning to longevity.",
    summary: "Dr. Walker presents decades of research on the transformative power of sleep and how our modern lifestyle is sabotaging it.",
    benefits: "Improves awareness about sleep hygiene, motivates prioritizing rest, and empowers daily habit changes.",
    link: "https://www.amazon.com/Why-We-Sleep-Unlocking-Dreams/dp/1501144316"
  },
  {
    title: "The Sleep Solution by W. Chris Winter",
    overview: "Practical and humorous advice from a sleep specialist.",
    summary: "This book helps identify sleep problems and gives solutions using neuroscience-backed tools.",
    benefits: "Offers actionable tips for insomnia and restless sleep, especially effective for beginners.",
    link: "https://www.amazon.com/Sleep-Solution-Why-Your-Broken/dp/0399583602"
  },
  {
    title: "Sleep Smarter by Shawn Stevenson",
    overview: "A lifestyle-focused approach to improving sleep naturally.",
    summary: "21 strategies supported by science to enhance sleep through diet, movement, and environment.",
    benefits: "Highly actionable, focuses on holistic well-being and energy levels.",
    link: "https://www.amazon.com/Sleep-Smarter-Strategies-Sleep-Naturally/dp/1623367395"
  },
  {
    title: "The Nocturnal Brain by Dr. Guy Leschziner",
    overview: "Fascinating true stories from a sleep neurologist.",
    summary: "Explores bizarre and mysterious sleep disorders from patients across the globe.",
    benefits: "Raises empathy for complex sleep issues, insight into how the brain processes rest.",
    link: "https://www.amazon.com/Nocturnal-Brain-Nightmares-Neuroscientist-Sleepless/dp/1250202720"
  },
  {
    title: "Say Good Night to Insomnia by Gregg D. Jacobs",
    overview: "Harvard-backed behavioral therapy techniques to beat insomnia.",
    summary: "A six-week drug-free program shown to be effective in clinical trials.",
    benefits: "Best for chronic insomniacs seeking long-term, non-medicated solutions.",
    link: "https://www.amazon.com/Say-Good-Night-Insomnia-Drug-Free/dp/0805089586"
  },
];

export default function SelfImprovement() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [currentTrack, setCurrentTrack] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.4);
  const [progress, setProgress] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('sleep-tasks')) || defaultTasks.map(text => ({ text, week: Array(7).fill(false) }));
    setTasks(stored);
    const timer = setInterval(() => setQuoteIndex(i => (i + 1) % quotes.length), 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('sleep-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      playing ? audio.play().catch(() => {}) : audio.pause();
      audio.volume = volume;
    }
  }, [playing, currentTrack, volume]);

  const handleSeek = e => {
    const audio = audioRef.current;
    const pct = Number(e.target.value);
    if (audio && !isNaN(audio.duration)) {
      audio.currentTime = (pct / 100) * audio.duration;
    }
  };

  const updateProgress = () => {
    const audio = audioRef.current;
    if (audio) {
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(isNaN(percent) ? 0 : percent);
    }
  };

  const handleAddTask = () => {
    if (input.trim()) {
      setTasks(prev => [...prev, { text: input.trim(), week: Array(7).fill(false) }]);
      setInput('');
    }
  };

  const toggleDay = (i, d) => {
    const copy = [...tasks];
    copy[i].week[d] = !copy[i].week[d];
    if (!tasks[i].week.every(v => v) && copy[i].week.every(v => v)) {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.4 } });
    }
    setTasks(copy);
  };

  const deleteTask = i => setTasks(prev => prev.filter((_, idx) => idx !== i));
  const togglePlay = () => setPlaying(p => !p);
  const nextTrack = () => setCurrentTrack((currentTrack + 1) % tracks.length);
  const prevTrack = () => setCurrentTrack((currentTrack - 1 + tracks.length) % tracks.length);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <video className="absolute inset-0 w-full h-full object-cover opacity-20 z-0" autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <audio ref={audioRef} src={tracks[currentTrack].src} loop autoPlay onTimeUpdate={updateProgress} />

      {/* Music Player UI */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg px-8 py-4 max-w-md w-full flex flex-col items-center space-y-3">
        <span className="text-sm font-semibold">Now Playing</span>
        <p className="font-bold truncate w-full animate-pulse">{tracks[currentTrack].title}</p>
        <div className="flex gap-4 items-center">
          <button onClick={prevTrack}><BackwardIcon className="w-5 h-5" /></button>
          <button onClick={togglePlay}>{playing ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}</button>
          <button onClick={nextTrack}><ForwardIcon className="w-5 h-5" /></button>
        </div>
        <input type="range" min={0} max={100} value={progress} onChange={handleSeek} className="w-full accent-indigo-500" />
        <div className="flex items-center gap-2 w-full">
          <SpeakerWaveIcon className="w-5 h-5" />
          <input type="range" min={0} max={1} step={0.01} value={volume} onChange={e => setVolume(+e.target.value)} className="w-full accent-indigo-400" />
        </div>
      </div>

      <div className="relative z-20 max-w-4xl mx-auto px-4 pt-64 pb-24">
        <motion.p key={quoteIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xl text-center italic text-indigo-200 mb-6">
          {quotes[quoteIndex]}
        </motion.p>

        {/* Book Recs */}
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-300">Top 5 Books for Better Sleep</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {sleepBooks.map((book, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 backdrop-blur p-4 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-1">{book.title}</h3>
              <p className="text-indigo-100 text-sm italic mb-2">{book.overview}</p>
              <p className="text-gray-200 text-sm mb-1"><strong>Summary:</strong> {book.summary}</p>
              <p className="text-gray-200 text-sm mb-1"><strong>Benefits:</strong> {book.benefits}</p>
              <a href={book.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-indigo-400 underline hover:text-indigo-200 text-sm">
                Purchase Book ↗
              </a>
            </motion.div>
          ))}
        </div>

        {/* Task Input */}
        <div className="mb-6 flex gap-2 flex-wrap items-center">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Add a calming sleep task..."
            className="flex-1 px-4 py-2 rounded-lg text-black"
          />
          <button onClick={handleAddTask} className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium">Add</button>
        </div>

        {/* Task List */}
        {tasks.map((task, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 backdrop-blur p-4 rounded-xl mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold">{task.text}</p>
                {task.week.every(v => v) && <StarIcon className="w-5 h-5 text-yellow-400 animate-bounce" />}
              </div>
              <button onClick={() => deleteTask(i)} className="text-red-400 hover:text-red-600">Remove</button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {[...Array(7)].map((_, d) => (
                <button
                  key={d}
                  onClick={() => toggleDay(i, d)}
                  className={`rounded-full p-2 flex items-center justify-center ${task.week[d] ? 'bg-green-500' : 'bg-red-500'}`}
                >
                  {task.week[d] ? <CheckCircleIcon className="w-5 h-5" /> : <XCircleIcon className="w-5 h-5" />}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
