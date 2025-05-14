/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from 'framer-motion';
import Lottie from 'react-lottie';
import animationData from "./assets/bg-animation.json";
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import videoAlways from "./assets/always.mp4";
import videoNever from "./assets/never.mp4";
import videoSometimes from "./assets/sometimes.mp4";
import videoGod from "./assets/godwings.mp4";
import videoNoDreams from "./assets/nodreams.mp4";
import videoDreamSome from "./assets/dreamsome.mp4";
import videoZombie from "./assets/zombie.mp4";
import videoVampire from "./assets/vampire.mp4";
import videoHuman from "./assets/human.mp4";
import videoRatherNot from "./assets/rathernot.mp4";
import videoCooked from "./assets/cooking.mp4";
import videoLoved from "./assets/love.mp4";
import videoInfinity from './assets/infinity.mp4';
import videoYeahGood from './assets/good.mp4';
import videoWasteOfTime from './assets/wasteoftime.mp4';
import videoArmed       from './assets/armed.mp4';
import videoFine        from './assets/fine.mp4';
import videoSometimesKill from './assets/sometimekil.mp4';
import videoHelps       from './assets/helps.mp4';
import videoCantLive    from './assets/cantlive.mp4';
import videoNotOften    from './assets/notoften.mp4';
import videoSleepyHead     from './assets/sleepyhead.mp4';
import videoOtherNames     from './assets/othername.mp4';
import videoNoNames        from './assets/noname.mp4';
import videoLeaveMeBro     from './assets/leavemebro.mp4';
import videoOwl            from './assets/owl.mp4';
import videoNoIdea         from './assets/noidea.mp4';
import videoAware          from './assets/aware.mp4';
import videoShouldIKnow    from './assets/shouldi.mp4';
import videoSomeOfThem     from './assets/someof.mp4';
import video9to5           from './assets/9to5.mp4';
import videoNightShift     from './assets/nightshift.mp4';
import videoFlexible       from './assets/flexible.mp4';
import videoLivingFullest   from './assets/fullest.mp4';
import videoLiveAndLove      from './assets/live.mp4';
import videoNotEveryBit      from './assets/notevery.mp4';
import videoNoWasteTime      from './assets/nowaste.mp4';
import videoPrettyMuch       from './assets/prettymuch.mp4';
import videoDoLoveIt         from './assets/doloveit.mp4';
import videoNeverDoneIt      from './assets/neverdone.mp4';
import videoYupIDo           from './assets/yupido.mp4';
import videoWasteOfTimey     from './assets/wasteoftimey.mp4';
import videoMessedUp         from './assets/messedup.mp4';
import videoNormalSurfer     from './assets/surfer.mp4';
import videoLessScreenTime   from './assets/screentime.mp4';
import videoFitnessFreak     from './assets/fitness.mp4';
import videoSomeActivity     from './assets/someactivity.mp4';
import videoWalkingCount     from './assets/walk.mp4';
import videoBurnedOut        from './assets/burntout.mp4';
import videoGoOnTrip         from './assets/trip.mp4';
import videoGoodBuddy        from './assets/home.mp4';
import videoSleepingPillsYes   from './assets/tabletyes.mp4';
import videoSleepingPillsSome  from './assets/tabletsome.mp4';
import videoSleepingPillsNo    from './assets/tabletno.mp4';
import videoMorningPerson      from './assets/mrngperson.mp4';
import videoNightOwl           from './assets/nightperson.mp4';
import videoBalancedOne        from './assets/balanced.mp4';

const questions = [
  {
    question: 'Do you sleep on a bus or train while moving? (forget your stop to land)',
    options: [
      { label: 'Frequently', video: videoAlways, value: true  },
      { label: 'Never', video: videoNever, value: true },
      { label: 'Sometimes', video: videoSometimes, value: false},
    ],
  },
  {
    question: 'Do you dream while sleeping?',
    options: [
      { label: 'God lvl dreamer', video: videoGod , value: true},
      { label: 'No dreams', video: videoNoDreams, value: false},
      { label: 'Sometimes I do dream', video: videoDreamSome, value: true },
    ],
  },
  {
    question: 'Hey man, do you sleep or are you a zombie? (just kidding)',
    options: [
      { label: "I'm Zombie", video: videoZombie, value: false },
      { label: "I'm Vampire", video: videoVampire, value: false},
      { label: "Nah I'm perfect human", video: videoHuman, value: true },
    ],
  },
  {
    question: 'How is your relationship with everyone going?',
    options: [
      { label: 'Rather not to say', video: videoRatherNot, value: false},
      { label: "Yeah I'm cooked", video: videoCooked, value: false},
      { label: 'People love me', video: videoLoved, value: true},
    ],
  },
  {
    question: 'Do you love sleep?',
    options: [
      { label: 'Infinity',      video: videoInfinity, value: true},
      { label: "Yeah it's good", video: videoYeahGood, value: true},
      { label: 'Waste of time',  video: videoWasteOfTime, value: false},
    ],
  },
  {
    question: 'Do you get angry when someone disturbs you while sleeping? (I will kill them 😂)',
    options: [
      { label: "Yeah I'm armed",      video: videoArmed, value: true},
      { label: "Nah it's fine",       video: videoFine, value: false},
      { label: 'Sometimes I kill',    video: videoSometimesKill, value: true},
    ],
  },
  {
    question: 'Do you drink coffee or tea a lot?',
    options: [
      { label: 'Yeah it helps',           video: videoHelps, value: true},
      { label: "I can't live without it", video: videoCantLive, value: false},
      { label: 'Not very often',          video: videoNotOften, value: true},
    ],
  },
  {
    question: 'Have you ever had the nickname "Sleepy head"? (I do got it often lol)',
    options: [
      { label: 'Yeah I swear',        video: videoSleepyHead, value: true},
      { label: 'No but got other names', video: videoOtherNames, value: true},
      { label: 'No names',            video: videoNoNames, value: false},
    ],
  },
  {
    question: 'Do you need to sleep now?',
    options: [
      { label: 'Yeah leave me bro!',  video: videoLeaveMeBro, value: true },
      { label: "No I'm owl",          video: videoOwl, value: false},
      { label: 'No idea',             video: videoNoIdea, value: true},
    ],
  },
  {
    question: 'Are you aware of the benefits of sleeping?',
    options: [
      { label: "I'm aware",           video: videoAware, value: true},
      { label: 'Nope should I know', video: videoShouldIKnow, value: false},
      { label: 'Some of them',        video: videoSomeOfThem, value: true},
    ],
  },
  {
    question: 'What are your working hours?',
    options: [
      { label: '9-5 regular stuff',   video: video9to5, value: true},
      { label: 'Night shift',         video: videoNightShift, value: false},
      { label: 'Depends and flexible', video: videoFlexible, value: true},
    ],
  },
  {
    question: 'Are you living your life to the fullest?',
    options: [
      { label: 'Yeah man',              video: videoLivingFullest, value: true},
      { label: 'No I wanna live and love', video: videoLiveAndLove, value: true},
      { label: 'Not every bit',         video: videoNotEveryBit, value: false},
    ],
  },
  {
    question: 'Do you need sleep?',
    options: [
      { label: "I don't waste my time", video: videoNoWasteTime, value: false},
      { label: 'Yeah pretty much',      video: videoPrettyMuch, value: true},
      { label: 'I do love it',          video: videoDoLoveIt, value: true},
    ],
  },
  {
    question: 'What is your longest sleep ever had? (like 5 days straight)',
    options: [
      { label: "I haven't done it",     video: videoNeverDoneIt, value: true},
      { label: 'Yup I do',              video: videoYupIDo, value: true},
      { label: "That's waste of time",  video: videoWasteOfTimey, value: false},
    ],
  },
  {
    question: 'What is your average screen time?',
    options: [
      { label: "That's messed up",      video: videoMessedUp, value: false},
      { label: "Yeah I'm normal surfer", video: videoNormalSurfer, value: true},
      { label: 'Less screen time',      video: videoLessScreenTime, value: true},
    ],
  },
  {
    question: 'Any physical activity every day?',
    options: [
      { label: "I'm fitness freak",     video: videoFitnessFreak, value: true},
      { label: 'Do some activity',      video: videoSomeActivity, value: true},
      { label: 'Does walking count',    video: videoWalkingCount, value: false},
    ],
  },
  {
    question: 'Do you need a break from daily routine?',
    options: [
      { label: "Yeah I'm burned out",   video: videoBurnedOut, value: true},
      { label: "I wanna go on a trip somewhere", video: videoGoOnTrip, value: true},
      { label: "Nah I'm good buddy",    video: videoGoodBuddy, value: false},
    ],
  },
  {
    question: 'Do you use sleeping pills?',
    options: [
      { label: 'Yeah I do take it',   video: videoSleepingPillsYes, value: false},
      { label: 'Not much sometimes',  video: videoSleepingPillsSome, value: false},
      { label: "Nah I'm good",        video: videoSleepingPillsNo, value: true},
    ],
  },
  {
    question: 'Are you a morning person or a night person?',
    options: [
      { label: 'Morning person',      video: videoMorningPerson, value: true},
      { label: 'Night owl',           video: videoNightOwl, value: false},
      { label: 'Balanced one',        video: videoBalancedOne, value: true},
    ],
  },
];

// Fisher–Yates shuffle
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function SleepQuiz() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trueCount, setTrueCount] = useState(0);

  const shuffledQuestions = useMemo(() => shuffleArray(questions), []);
  const total = shuffledQuestions.length;
  const progress = Math.round((currentIndex / total) * 100);
  const finalScore = trueCount * 2;

  const suggestionList = () => {
    if (finalScore >= total * 2 * 0.75) return [
      'Maintain your consistent sleep schedule.',
      'Reduce blue light exposure before bedtime.',
      'Continue regular physical activity.'
    ];
    if (finalScore >= total * 2 * 0.4) return [
      'Aim for 7-8 hours of sleep each night.',
      'Try a wind-down routine like reading.',
      'Limit caffeine in the evening.'
    ];
    return [
      'Establish a fixed sleep-wake time.',
      'Practice relaxation methods before bed.',
      'Avoid naps after 3 p.m.',
      'Consider talking to a sleep specialist.'
    ];
  };

  const sleepBar = Math.min(100, finalScore * 2);
  const anxietyBar = 100 - sleepBar;

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Lottie options={{ loop: true, autoplay: true, animationData, rendererSettings: { preserveAspectRatio: 'xMidYMid slice' } }} height="100%" width="100%" />
      </div>

      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="w-full h-3 bg-white/20 rounded-full">
          <div className="h-full bg-green-400 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-sm text-white mt-1 text-right">{progress}% Complete</p>
      </div>

      <div className="relative z-10 flex items-center justify-center h-full p-4">
        <AnimatePresence mode="wait">
          {currentIndex < total ? (
            <motion.div key={currentIndex} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }} className="bg-white/40 backdrop-blur-lg rounded-2xl shadow-2xl max-w-2xl w-full p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{shuffledQuestions[currentIndex].question}</h2>
              <div className="space-y-4">
                {shuffledQuestions[currentIndex].options.map((opt, idx) => (
                  <motion.button key={idx} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => {
                    if (opt.value) setTrueCount(prev => prev + 1);
                    setCurrentIndex(prev => prev + 1);
                  }} className="flex items-center justify-between w-full bg-white/80 backdrop-blur-sm rounded-xl px-5 py-4 text-left shadow-md hover:shadow-xl transition focus:outline-none focus:ring-2 focus:ring-indigo-400">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 overflow-hidden rounded-full border border-gray-300 shadow-sm">
                        <video src={opt.video} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                      </div>
                      <span className="text-xl font-medium text-gray-800">{opt.label}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="thank-you" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl p-10 text-center max-w-md mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
              <p className="text-2xl font-semibold text-gray-900 mb-2">Your score: {finalScore}</p>

              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-1">Sleep Quality</p>
                <div className="h-3 bg-gray-300 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${sleepBar}%` }}></div>
                </div>
                <p className="text-sm text-gray-700 mt-2 mb-1">Anxiety Level</p>
                <div className="h-3 bg-gray-300 rounded-full overflow-hidden">
                  <div className="h-full bg-red-400" style={{ width: `${anxietyBar}%` }}></div>
                </div>
              </div>

              <div className="text-left mb-4">
                <p className="font-semibold text-gray-800 mb-2">Suggestions:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {suggestionList().map((tip, i) => <li key={i}>{tip}</li>)}
                </ul>
              </div>

              <button onClick={() => navigate('/self-improvement')} className="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Go to Self Improvement</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
