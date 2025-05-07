
import { AnimatePresence } from 'framer-motion';
import Lottie from 'react-lottie';
import animationData from "./assets/bg-animation.json";
import React, { useState, useMemo } from 'react';
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
      { label: 'God lvl dreamer', video: videoGod },
      { label: 'No dreams', video: videoNoDreams },
      { label: 'Sometimes I do dream', video: videoDreamSome },
    ],
  },
  {
    question: 'Hey man, do you sleep or are you a zombie? (just kidding)',
    options: [
      { label: "I'm Zombie", video: videoZombie },
      { label: "I'm Vampire", video: videoVampire },
      { label: "Nah I'm perfect human", video: videoHuman },
    ],
  },
  {
    question: 'How is your relationship with everyone going?',
    options: [
      { label: 'Rather not to say', video: videoRatherNot },
      { label: "Yeah I'm cooked", video: videoCooked },
      { label: 'People love me', video: videoLoved },
    ],
  },
  {
    question: 'Do you love sleep?',
    options: [
      { label: 'Infinity',      video: videoInfinity },
      { label: "Yeah it's good", video: videoYeahGood },
      { label: 'Waste of time',  video: videoWasteOfTime },
    ],
  },
  {
    question: 'Do you get angry when someone disturbs you while sleeping? (I will kill them 😂)',
    options: [
      { label: "Yeah I'm armed",      video: videoArmed },
      { label: "Nah it's fine",       video: videoFine   },
      { label: 'Sometimes I kill',    video: videoSometimesKill },
    ],
  },
  {
    question: 'Do you drink coffee or tea a lot?',
    options: [
      { label: 'Yeah it helps',           video: videoHelps    },
      { label: "I can't live without it", video: videoCantLive },
      { label: 'Not very often',          video: videoNotOften },
    ],
  },
  {
    question: 'Have you ever had the nickname "Sleepy head"? (I do got it often lol)',
    options: [
      { label: 'Yeah I swear',        video: videoSleepyHead  },
      { label: 'No but got other names', video: videoOtherNames },
      { label: 'No names',            video: videoNoNames     },
    ],
  },
  {
    question: 'Do you need to sleep now?',
    options: [
      { label: 'Yeah leave me bro!',  video: videoLeaveMeBro },
      { label: "No I'm owl",          video: videoOwl        },
      { label: 'No idea',             video: videoNoIdea     },
    ],
  },
  {
    question: 'Are you aware of the benefits of sleeping?',
    options: [
      { label: "I'm aware",           video: videoAware       },
      { label: 'Nope should I know', video: videoShouldIKnow },
      { label: 'Some of them',        video: videoSomeOfThem  },
    ],
  },
  {
    question: 'What are your working hours?',
    options: [
      { label: '9-5 regular stuff',   video: video9to5       },
      { label: 'Night shift',         video: videoNightShift },
      { label: 'Depends and flexible', video: videoFlexible   },
    ],
  },
  {
    question: 'Are you living your life to the fullest?',
    options: [
      { label: 'Yeah man',              video: videoLivingFullest },
      { label: 'No I wanna live and love', video: videoLiveAndLove },
      { label: 'Not every bit',         video: videoNotEveryBit },
    ],
  },
  {
    question: 'Do you need sleep?',
    options: [
      { label: "I don't waste my time", video: videoNoWasteTime },
      { label: 'Yeah pretty much',      video: videoPrettyMuch  },
      { label: 'I do love it',          video: videoDoLoveIt    },
    ],
  },
  {
    question: 'What is your longest sleep ever had? (like 5 days straight)',
    options: [
      { label: "I haven't done it",     video: videoNeverDoneIt },
      { label: 'Yup I do',              video: videoYupIDo      },
      { label: "That's waste of time",  video: videoWasteOfTimey },
    ],
  },
  {
    question: 'What is your average screen time?',
    options: [
      { label: "That's messed up",      video: videoMessedUp    },
      { label: "Yeah I'm normal surfer", video: videoNormalSurfer },
      { label: 'Less screen time',      video: videoLessScreenTime },
    ],
  },
  {
    question: 'Any physical activity every day?',
    options: [
      { label: "I'm fitness freak",     video: videoFitnessFreak },
      { label: 'Do some activity',      video: videoSomeActivity  },
      { label: 'Does walking count',    video: videoWalkingCount  },
    ],
  },
  {
    question: 'Do you need a break from daily routine?',
    options: [
      { label: "Yeah I'm burned out",   video: videoBurnedOut   },
      { label: "I wanna go on a trip somewhere", video: videoGoOnTrip },
      { label: "Nah I'm good buddy",    video: videoGoodBuddy   },
    ],
  },
  {
    question: 'Do you use sleeping pills?',
    options: [
      { label: 'Yeah I do take it',   video: videoSleepingPillsYes  },
      { label: 'Not much sometimes',  video: videoSleepingPillsSome },
      { label: "Nah I'm good",        video: videoSleepingPillsNo   },
    ],
  },
  {
    question: 'Are you a morning person or a night person?',
    options: [
      { label: 'Morning person',      video: videoMorningPerson },
      { label: 'Night owl',           video: videoNightOwl      },
      { label: 'Balanced one',        video: videoBalancedOne   },
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trueCount, setTrueCount]     = useState(0);

  // Shuffle once
  const shuffledQuestions = useMemo(() => shuffleArray(questions), []);
  const total             = shuffledQuestions.length;

  // On answer, track true/false and advance
  const handleAnswer = (value) => {
    if (value) setTrueCount(prev => prev + 1);
    setCurrentIndex(prev => prev + 1);
  };

  // Lottie config
  const lottieOptions = { loop: true, autoplay: true, animationData, rendererSettings: { preserveAspectRatio: 'xMidYMid slice' } };

  // Calculate final score (trueCount x 2)
  const finalScore = trueCount * 2;

  // Suggestion based on finalScore
  const suggestion = () => {
    if (finalScore >= total * 2 * 0.75) return 'Great job! Keep up these healthy sleep habits.';
    if (finalScore >= total * 2 * 0.4) return 'You’re doing okay—consider small improvements like a regular bedtime.';
    return 'You might need to adopt better sleep routines: try meditation or a sleep schedule.';
  };

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Lottie options={lottieOptions} height="100%" width="100%" />
      </div>
      <div className="relative z-10 flex items-center justify-center h-full p-4">
        <AnimatePresence mode="wait">
          {currentIndex < total ? (
            <motion.div key={currentIndex} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }} className="bg-white/40 backdrop-blur-lg rounded-2xl shadow-2xl max-w-2xl w-full p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{shuffledQuestions[currentIndex].question}</h2>
              <div className="space-y-4">
                {shuffledQuestions[currentIndex].options.map((opt, idx) => (
                  <motion.button key={idx} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAnswer(opt.value)} className="flex items-center justify-between w-full bg-white/80 backdrop-blur-sm rounded-xl px-5 py-4 text-left shadow-md hover:shadow-xl transition focus:outline-none focus:ring-2 focus:ring-indigo-400">
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
              <p className="text-lg text-gray-700 mb-2">You answered “true” {trueCount} out of {total} questions.</p>
              <p className="text-2xl font-semibold text-gray-900 mb-2">Your score: {finalScore}</p>
              <p className="text-xl text-indigo-700">{suggestion()}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
