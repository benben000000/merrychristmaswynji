import { useState } from 'react';
import { Background } from './components/Background';
import { RunawayButton } from './components/RunawayButton';
import { HeartButton } from './components/HeartButton';
import { LoveLetter } from './components/LoveLetter';
import { MusicPlayer } from './components/MusicPlayer';
import { ChristmasTree } from './components/ChristmasTree';
import { DancingSurprise } from './components/DancingSurprise';
import { Snow } from './components/Snow';
import { Decorations } from './components/Decorations';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [celebrating, setCelebrating] = useState(false);
  const [started, setStarted] = useState(false); // Interaction started
  const [surprises, setSurprises] = useState<{ id: number, x: number, y: number }[]>([]);

  const handleStart = () => {
    if (!started) setStarted(true);
  };

  const handleOrnamentClick = (x: number, y: number) => {
    handleStart(); // Start music if first interaction
    const id = Date.now();
    setSurprises(prev => [...prev, { id, x, y }]);
    // Auto remove after animation
    setTimeout(() => {
      setSurprises(prev => prev.filter(s => s.id !== id));
    }, 2000);
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden font-body"
      onClick={handleStart} // Global click starts music context if needed
    >
      <Background />
      <MusicPlayer start={started} />

      {/* Decorations Layer */}
      <Decorations />

      {/* Snow Effect */}
      <Snow piling={celebrating} />

      {/* Background Tree */}
      <ChristmasTree onOrnamentClick={handleOrnamentClick} />

      {/* Dancing Surprises Layer */}
      {surprises.map(s => (
        <DancingSurprise key={s.id} x={s.x} y={s.y} />
      ))}

      {/* Main Content Area */}
      <div className="z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 min-h-[60vh]">
        <AnimatePresence mode="wait">
          {!celebrating ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="text-center space-y-12"
            >
              <h1 className="font-christmas text-5xl md:text-7xl text-white text-glow mb-12">
                Merry Christmas, Wynji!
              </h1>

              <div className="glass-card p-10 flex flex-col items-center gap-8">
                <h2 className="text-3xl font-semibold text-white">Do you love me? ❤️</h2>

                <div className="flex items-center gap-12 h-20 justify-center relative w-full">
                  {/* Yes Button (Stable) */}
                  <HeartButton onClick={() => {
                    setCelebrating(true);
                    setStarted(true);
                  }} />

                  {/* No Button (Runaway) */}
                  <div className="relative w-32 h-12 flex items-center justify-center">
                    <RunawayButton onAttemptClick={handleStart} />
                  </div>
                </div>

                <p className="text-gray-300 text-sm mt-8 animate-pulse font-bold tracking-wide">
                  (Tip: 🎵 Sound on! Try tapping the tree ornaments!)
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="celebration"
              className="w-full flex justify-center"
            >
              <LoveLetter />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
