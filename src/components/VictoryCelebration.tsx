/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy } from 'lucide-react';

interface VictoryCelebrationProps {
  isVisible: boolean;
  onClose: () => void;
  characterImage: string;
}

export default function VictoryCelebration({ isVisible, onClose, characterImage }: VictoryCelebrationProps) {
  // Firework particles
  const particles = Array.from({ length: 20 });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[50] flex items-center justify-center bg-primary/10 backdrop-blur-[2px] rounded-[3rem] pointer-events-auto"
          onClick={onClose}
        >
          {/* Fireworks Burst - Smaller and confined */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(4)].map((_, burstIdx) => (
              <div 
                key={burstIdx} 
                className="absolute"
                style={{ 
                  left: `${20 + Math.random() * 60}%`, 
                  top: `${20 + Math.random() * 60}%` 
                }}
              >
                {particles.map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                    animate={{ 
                      scale: [0, 1, 0], 
                      x: (Math.random() - 0.5) * 400, 
                      y: (Math.random() - 0.5) * 400,
                      opacity: [1, 1, 0]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      delay: burstIdx * 0.1,
                      ease: "easeOut" 
                    }}
                    className={`absolute w-2 h-2 rounded-full ${
                      ['bg-yellow-400', 'bg-primary', 'bg-secondary', 'bg-white'][i % 4]
                    } shadow-md`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Jumping Mascot - Scaled down */}
          <motion.div
            initial={{ y: 200, scale: 0 }}
            animate={{ 
              y: [200, -50, 0, -20, 0],
              scale: [0, 1.2, 1.5, 1.5, 1.5],
            }}
            transition={{ 
              duration: 1.2, 
              times: [0, 0.4, 0.6, 0.8, 1],
              ease: "easeOut"
            }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* The Dance Loop */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2
              }}
              className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white"
            >
              <img src={characterImage} alt="Happy Mascot" className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-center px-4"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy size={24} className="text-yellow-400 fill-current animate-bounce" />
                <h2 className="text-3xl font-black text-primary drop-shadow-sm uppercase tracking-wider">Victory!</h2>
                <Trophy size={24} className="text-yellow-400 fill-current animate-bounce" />
              </div>
              <p className="text-sm font-bold text-on-surface-variant max-w-[200px]">
                GOAL REACHED!
              </p>
              
              <button 
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="mt-4 bg-primary text-on-primary px-6 py-2 rounded-full text-xs font-black shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                GOT IT! 💧
              </button>
            </motion.div>
          </motion.div>

          {/* Floating Sparkles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  color: ['#FFD700', '#FFFFFF', '#64B5F6'][i % 3]
                }}
              >
                <Sparkles size={16} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
