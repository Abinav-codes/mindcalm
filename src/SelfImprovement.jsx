/* eslint-disable no-unused-vars */
// src/pages/SelfImprovement.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon, PauseIcon, PlayIcon, ForwardIcon, BackwardIcon, SpeakerWaveIcon, StarIcon, TrophyIcon } from '@heroicons/react/24/outline';
import BreathingModal from './BreathingModal.jsx';
import backgroundVideo from './assets/northern-lights.mp4';
import rain from './assets/rain.ogg';
import space from './assets/space.ogg';
import piano from './assets/panio.ogg';
import confetti from 'canvas-confetti';
import './card-animate.css';
import SleepTherapistCard from './SleepTherapistCard.jsx';
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
  const [filter, setFilter] = useState('all');
  const [showBreathing, setShowBreathing] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState([]);
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
    const completedNow = copy[i].week.every(v => v);
    const completedBefore = tasks[i].week.every(v => v);
    if (!completedBefore && completedNow) {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.4 } });
      const badge = `🏆 ${copy[i].text}`;
      setEarnedBadges(prev => [...prev, badge]);
    }
    setTasks(copy);
  };

  const deleteTask = i => setTasks(prev => prev.filter((_, idx) => idx !== i));
  const togglePlay = () => setPlaying(p => !p);
  const nextTrack = () => setCurrentTrack((currentTrack + 1) % tracks.length);
  const prevTrack = () => setCurrentTrack((currentTrack - 1 + tracks.length) % tracks.length);
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    const completed = task.week.every(day => day);
    return filter === 'completed' ? completed : !completed;
  });

  return (
    <div className="relative min-h-screen text-gray-900 dark:text-white bg-white dark:bg-black overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 z-0">
        <video className="w-full h-full object-cover" autoPlay loop muted>
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/50 dark:bg-black/50 transition-colors duration-500" />
      </div>
      <audio ref={audioRef} src={tracks[currentTrack].src} loop autoPlay onTimeUpdate={updateProgress} />
      <div className="relative z-20 flex flex-col lg:flex-row gap-10 px-6 pt-32 max-w-7xl mx-auto">
        {/* Music Panel */}
        <div className="w-full lg:w-1/4 space-y-4 sticky top-6 self-start">
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-center">Now Playing</h3>
            <p className="font-bold text-center truncate animate-pulse">{tracks[currentTrack].title}</p>
            <div className="flex justify-center items-center gap-4">
              <button onClick={prevTrack}><BackwardIcon className="w-5 h-5" /></button>
              <button onClick={togglePlay}>{playing ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}</button>
              <button onClick={nextTrack}><ForwardIcon className="w-5 h-5" /></button>
            </div>
            <input type="range" min={0} max={100} value={progress} onChange={handleSeek} className="w-full accent-indigo-500" />
            <div className="flex items-center gap-2">
              <SpeakerWaveIcon className="w-5 h-5" />
              <input type="range" min={0} max={1} step={0.01} value={volume} onChange={e => setVolume(+e.target.value)} className="w-full accent-indigo-400" />
            </div>
          </div>

          {/* Badge Rewards */}
          {earnedBadges.length > 0 && (
            <div className="mt-4 bg-yellow-100 dark:bg-yellow-900/40 p-4 rounded-xl">
              <h4 className="font-bold text-center mb-2">🎖️ Badges Earned</h4>
              <ul className="space-y-1 text-sm">
                {earnedBadges.map((badge, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <TrophyIcon className="w-4 h-4 text-yellow-600 dark:text-yellow-400" /> {badge}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Main Panel */}
        <div className="w-full lg:w-3/4">
          <motion.p key={quoteIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl text-center italic text-indigo-200 mb-6">
            {quotes[quoteIndex]}
          </motion.p>

          <div className="mb-4">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Add a calming sleep task..."
              className="w-full px-4 py-2 rounded-lg text-black dark:text-white dark:bg-white/10"
            />
            <button onClick={handleAddTask} className="mt-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium w-full">Add Task</button>
          </div>

          {/* Task List */}
          {filteredTasks.map((task, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 dark:bg-black/20 backdrop-blur p-4 rounded-xl mb-4">
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
                    className={`rounded-full p-2 flex items-center justify-center transition-all duration-200 transform ${task.week[d] ? 'bg-green-500 scale-110' : 'bg-red-500 scale-100'}`}
                  >
                    {task.week[d] ? <CheckCircleIcon className="w-5 h-5" /> : <XCircleIcon className="w-5 h-5" />}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}

          <h2 className="text-3xl font-bold mt-16 mb-6 text-center text-indigo-300">Top 5 Books for Better Sleep</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {sleepBooks.map((book, idx) => (
              <div key={idx} className="card">
                <div className="content">
                  <p className="heading">{book.title}</p>
                  <p className="para">{book.overview}</p>
                  <p className="para text-sm">{book.summary}</p>
                  <p className="para text-sm">Benefits: {book.benefits}</p>
                  <a href={book.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-indigo-400 underline hover:text-indigo-200 text-sm">Purchase Book ↗</a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-16">
            <button onClick={() => setShowBreathing(true)} className="inline-block px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white text-sm rounded-full shadow-md transition">
              🧘 Cool down with 60s Breathing
            </button>
          </div>
          <SleepTherapistCard />
        </div>
      </div>
      <BreathingModal open={showBreathing} onClose={() => setShowBreathing(false)} />
    </div>
  );
}