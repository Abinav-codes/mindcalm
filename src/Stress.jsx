/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';
import { LazyMotion, domAnimation, motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// Animation variants
const iconVariant = {
  float: { y: [0, -5, 0], transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } }
};
const hoverVariant = {
  hover: { scale: 1.05, boxShadow: '0 0 15px rgba(255,255,255,0.8)' }
};
const burstContainer = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1.5, transition: { duration: 1 } }
};
const burstItem = {
  hidden: { x: 0, y: 0, opacity: 1 },
  visible: custom => ({
    x: (Math.random() - 0.5) * 120,
    y: (Math.random() - 0.5) * 120,
    opacity: 0,
    transition: { duration: 1, ease: 'easeOut' }
  })
};

const QUESTIONS = [
  { question: "How often do you feel overwhelmed by tasks?", answers: [
      { icon: "🛋️", text: "Rarely" },
      { icon: "⏳", text: "Sometimes" },
      { icon: "📚", text: "Often" },
      { icon: "🏃‍♂️💨", text: "Always" },
    ] },
  { question: "How well are you sleeping at night?", answers: [
      { icon: "🛌😴", text: "Great, well-rested" },
      { icon: "🌙", text: "Moderate rest" },
      { icon: "😩🛏️", text: "Poor sleep" },
      { icon: "🦉", text: "Can't sleep at all" },
    ] },
  { question: "How often do you feel anxious or nervous?", answers: [
      { icon: "🕊️", text: "Hardly ever" },
      { icon: "🙂", text: "Sometimes" },
      { icon: "😯", text: "Frequently" },
      { icon: "😰", text: "Almost always" },
    ] },
  { question: "When my alarm goes off on Monday morning, I:", answers: [
      { icon: "🦸‍♂️", text: "Leap out of bed like a superhero" },
      { icon: "😴", text: "Hit snooze like a ninja" },
      { icon: "🤔", text: "Wonder who set the alarm" },
      { icon: "💤", text: "Stay put and hug the pillow" },
    ] },
  { question: "When a big deadline approaches, I tend to:", answers: [
      { icon: "📋", text: "Make a detailed plan and tackle it" },
      { icon: "⏰", text: "Procrastinate until the last second" },
      { icon: "🤯", text: "Panic a little, then conquer it" },
      { icon: "😎", text: "Play it cool and handle it effortlessly" },
    ] },
  { question: "Which emoji best captures your mood today?", answers: [
      { icon: "😃", text: "Feeling great!" },
      { icon: "🙂", text: "Pretty good (not too stressed)" },
      { icon: "😕", text: "A bit off" },
      { icon: "😫", text: "Totally overwhelmed" },
    ] },
  { question: "Stress is like a:", answers: [
      { icon: "🎉", text: "Party (lively chaos)" },
      { icon: "🔥", text: "Fire (intense heat)" },
      { icon: "🧩", text: "Puzzle (complex but solvable)" },
      { icon: "🎢", text: "Rollercoaster (wild ups and downs)" },
    ] },
  { question: "If you got a surprise day off tomorrow, you would:", answers: [
      { icon: "💃", text: "Throw a dance party at home" },
      { icon: "📺", text: "Stay in pajamas and binge watch" },
      { icon: "🧹", text: "Clean the whole house top to bottom" },
      { icon: "🌴", text: "Plan a spontaneous weekend trip" },
    ] },
  { question: "What snack do you reach for when you're feeling stressed?", answers: [
      { icon: "🍫", text: "Chocolate (sweet mood booster)" },
      { icon: "🍵", text: "Green tea (calming sip)" },
      { icon: "🥕", text: "Carrot sticks (healthy crunch)" },
      { icon: "🥨", text: "Chips & dip (comfort food)" },
    ] },
  { question: "When you're feeling down, which pet would cheer you up?", answers: [
      { icon: "🐶", text: "Puppy (unconditional love)" },
      { icon: "😺", text: "Kitten (soft purr therapy)" },
      { icon: "🦜", text: "Parrot (talk it out)" },
      { icon: "🐠", text: "Fish (peaceful tank gazing)" },
    ] },
  { question: "Which activity best helps you relax?", answers: [
      { icon: "🧘‍♀️", text: "Yoga (inner peace)" },
      { icon: "🎮", text: "Video games (fun escape)" },
      { icon: "🍪", text: "Baking cookies (sweet therapy)" },
      { icon: "📚", text: "Reading a book (world trip)" },
    ] },
  { question: "When work piles up, you feel like a:", answers: [
      { icon: "🍲", text: "Pressure cooker (ready to blow)" },
      { icon: "🐝", text: "Busy bee (buzzing everywhere)" },
      { icon: "🧘", text: "Zen monk (calm amidst chaos)" },
      { icon: "🦸‍♀️", text: "Superhero (on a rescue mission)" },
    ] },
  { question: "How often do you practice self-care?", answers: [
      { icon: "🏊‍♀️", text: "Daily (swimming in bliss)" },
      { icon: "🍨", text: "A few times a week (treat myself)" },
      { icon: "🤯", text: "Rarely (just surviving)" },
      { icon: "💼", text: "What is self-care? (hustle mode)" },
    ] },
  { question: "Pick a vacation spot to recharge:", answers: [
      { icon: "🏖️", text: "Beach (relax by the waves)" },
      { icon: "🏔️", text: "Mountain (peaceful peaks)" },
      { icon: "🌆", text: "City (exciting adventure)" },
      { icon: "🛋️", text: "Staycation (couch fortress)" },
    ] },
  { question: "If stress were an animal, it would be a:", answers: [
      { icon: "🦡", text: "Honey badger (fierce and fearless)" },
      { icon: "🦥", text: "Sloth (makes me sleepy)" },
      { icon: "🦁", text: "Lion (powerful and scary)" },
      { icon: "🦎", text: "Chameleon (unpredictable)" },
    ] },
  { question: "Choose a weather forecast for your mood:", answers: [
      { icon: "☀️", text: "Sunny (clear skies ahead)" },
      { icon: "⛅", text: "Partly Cloudy (mixed feelings)" },
      { icon: "🌩️", text: "Thunderstorms (feeling stormy)" },
      { icon: "🌈", text: "Rainbow (hope after rain)" },
    ] },
  { question: "Your go-to stress relief move is:", answers: [
      { icon: "💃", text: "Dance party (shake it off)" },
      { icon: "🛏️", text: "Pillow battle (soft warfare)" },
      { icon: "😤", text: "Scream into a pillow (vent out)" },
      { icon: "🌬️", text: "Deep breaths / meditation" },
    ] },
  { question: "You express your feelings best by:", answers: [
      { icon: "✍️", text: "Writing (journal it out)" },
      { icon: "👥", text: "Talking (venting to friends)" },
      { icon: "🎨", text: "Art (creative release)" },
      { icon: "🤐", text: "Keeping it inside (bottling it up)" },
    ] },
  { question: "Which of these do you avoid when you're stressed?", answers: [
      { icon: "☕", text: "Coffee (no more jitters)" },
      { icon: "👥", text: "Crowds (I need space)" },
      { icon: "💪", text: "Workouts (not motivated)" },
      { icon: "🧹", text: "Chores (would rather relax)" },
    ] },
  { question: "How have you been sleeping lately?", answers: [
      { icon: "😴", text: "Like a baby (deep & restful)" },
      { icon: "😱", text: "Nightmares keep me up" },
      { icon: "🥱", text: "Only a few hours here and there" },
      { icon: "🛌", text: "Tossing and turning all night" },
    ] }
];

// Score mapping
const SCORE_MAP = {
  0: [1,2,2,3], 1: [1,2,2,3], 2: [1,2,2,3], 3: [1,2,2,3],
  4: [1,3,2,1], 5: [1,2,2,3], 6: [2,3,1,3], 7: [1,1,3,2],
  8: [1,1,2,3], 9: [1,2,3,1],10: [1,3,2,1],11:[3,2,1,1],
  12:[1,2,3,1],13:[1,1,3,1],14:[1,1,1,3],15:[2,2,3,2],
  16:[1,3,2,3],17:[1,3,1,2],18:[1,1,2,1],19:[1,1,1,2]
};
export default function StressQuiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [burstIdx, setBurstIdx] = useState(null);
  const reduceMotion = useReducedMotion();

  // Shuffle questions & answers once
  const quiz = useMemo(
    () => QUESTIONS.map(q => ({
      ...q,
      answers: [...q.answers].sort(() => Math.random() - 0.5)
    })).sort(() => Math.random() - 0.5),
    []
  );

  const handleAnswer = idx => {
    setBurstIdx(idx);
    setScore(s => s + SCORE_MAP[current][idx]);
    setTimeout(() => {
      setBurstIdx(null);
      if (current === quiz.length - 1) setFinished(true);
      else setCurrent(c => c + 1);
    }, reduceMotion ? 400 : 800);
  };

  let resultMessage = '';
  if (score <= 15) resultMessage = '🌟 Low stress—you’re breezing through life!';
  else if (score <= 35) resultMessage = '🙂 Moderate stress—a few breathers can help.';
  else resultMessage = '⚠️ High stress—time to pause and recharge.';

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative flex items-center justify-center min-h-screen bg-gray-800 overflow-hidden">
        {/* Background video with poster fallback */}
        <video
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
          src="./stressbg.mp4"
          poster="./stressbg.jpg"
          preload="metadata"
          autoPlay
          loop
          muted
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        <div
          role="region"
          aria-labelledby="quiz-heading"
          aria-live="polite"
          className="relative w-full max-w-xl p-8 m-4 bg-white/20 backdrop-blur-md rounded-2xl"
        >
          {/* Progress Bar */}
          <div className="w-full h-2 mb-4 overflow-hidden bg-gray-300 rounded-full">
            <motion.div
              className="h-2 bg-blue-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((current + 1) / quiz.length) * 100}%` }}
              transition={{ type: 'spring', stiffness: 80, damping: 12 }}
            />
          </div>
          <p className="text-right mb-4 text-sm text-white">
            Question {finished ? quiz.length : current + 1} of {quiz.length}
          </p>

          {!finished ? (
            <>
              <h2 id="quiz-heading" className="mb-6 text-center text-2xl font-semibold text-white">
                {quiz[current].question}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {quiz[current].answers.map((ans, i) => (
                  <div key={i} className="relative">
                    <motion.button
                      onClick={() => handleAnswer(i)}
                      className="flex flex-col items-center justify-center w-full p-6 text-center bg-white/30 rounded-xl backdrop-blur-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                      whileTap={{ scale: reduceMotion ? 1 : 0.95 }}
                      {...(!reduceMotion && { variants: hoverVariant, whileHover: 'hover' })}
                    >
                      <motion.span
                        className="mb-2 text-4xl"
                        variants={iconVariant}
                        animate={reduceMotion ? undefined : 'float'}
                      >
                        {ans.icon}
                      </motion.span>
                      <span className="font-medium text-white">{ans.text}</span>
                    </motion.button>

                    {/* Snow Burst Effect */}
                    <AnimatePresence>
                      {burstIdx === i && !reduceMotion && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={burstContainer}
                        >
                          {Array.from({ length: 8 }).map((_, idx) => (
                            <motion.span
                              key={idx}
                              className="absolute text-2xl"
                              custom={idx}
                              variants={burstItem}
                            >
                              ❄️
                            </motion.span>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mb-4 text-3xl font-semibold text-white">Quiz Complete!</h2>
              <p className="mb-4 text-xl text-white">{resultMessage}</p>
              <motion.span
                className="block text-4xl"
                animate={{ scale: [0.8, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: reduceMotion ? 2 : 1.5, ease: 'easeInOut' }}
              >
                ❄️
              </motion.span>
            </motion.div>
          )}
        </div>
      </div>
    </LazyMotion>
  );
}