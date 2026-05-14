/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flame, Calendar, ChevronRight, Droplet, Baby, Citrus, Apple, GlassWater, Sparkles, PartyPopper } from 'lucide-react';
import HydrationRing from '../components/HydrationRing';
import VictoryCelebration from '../components/VictoryCelebration';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { DrinkRecord } from '../types';
import { DRINK_OPTIONS, CHARACTERS } from '../constants';

const ICON_MAP: Record<string, any> = {
  Water: Droplet,
  Baby: Baby,
  Citrus: Citrus,
  Apple: Apple,
  GlassWater: GlassWater
};

interface DashboardProps {
  currentIntake: number;
  goal: number;
  streak: number;
  recentLogs: DrinkRecord[];
  onAddDrink: (name: string, amount: number, type: string, icon: string) => void;
  isAnimating?: boolean;
}

export default function Dashboard({ currentIntake, goal, streak, recentLogs, onAddDrink, isAnimating }: DashboardProps) {
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Trigger celebration when goal is reached during animation
  useEffect(() => {
    if (isAnimating && currentIntake >= goal) {
      setShowCelebration(true);
    }
  }, [isAnimating, currentIntake, goal]);

  // Use the first 4 kid-friendly options for quick log
  const quickLogItems = DRINK_OPTIONS.slice(0, 4);
  const activeCharacter = CHARACTERS[0]; // Default mascot
  
  const percentage = Math.min(100, Math.floor((currentIntake / goal) * 100));
  const isGoalMet = currentIntake >= goal;
  
  const getMotivationalMessage = () => {
    if (percentage >= 100) return "Goal Reached! You're a Hero!";
    if (percentage >= 75) return "Almost there! Keep it up!";
    if (percentage >= 50) return "Halfway done! Doing great!";
    if (percentage >= 25) return "Good start! Stay thirsty!";
    return "Time for some yummy water!";
  };

  const mascotAnimation = isAnimating && isGoalMet ? {
    y: [0, -60, 0, -60, 0],
    rotate: [0, 20, -20, 20, -20, 0],
    scale: [1, 1.3, 0.9, 1.3, 1],
  } : isAnimating ? {
    y: [0, -40, 0],
    scale: [1, 1.2, 1],
    rotate: [0, 10, -10, 0]
  } : isGoalMet ? {
    y: [0, -10, 0],
    rotate: [5, -5, 5],
    scale: [1, 1.05, 1],
  } : {
    y: [0, -5, 0]
  };

  const mascotTransition = { 
    duration: (isAnimating && isGoalMet) ? 0.8 : isAnimating ? 0.5 : isGoalMet ? 1.5 : 3, 
    repeat: Infinity,
    ease: "easeInOut"
  };

  return (
    <div className="space-y-12">
      {/* Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Hydration Ring */}
        <div className="col-span-1 md:col-span-8 bg-surface-container-lowest rounded-[3rem] shadow-cloud p-12 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden border-4 border-transparent transition-colors duration-500" style={{ borderColor: isGoalMet ? 'var(--md-sys-color-primary-container)' : 'transparent' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-transparent pointer-events-none"></div>
          
          <VictoryCelebration 
            isVisible={showCelebration} 
            onClose={() => setShowCelebration(false)} 
            characterImage={activeCharacter.image} 
          />

          <div className="flex flex-col items-center z-10 w-full relative">
            <h2 className="text-3xl font-bold text-on-surface mb-8 text-center">Today's Progress</h2>
            
            <div className="relative">
              <HydrationRing current={currentIntake} goal={goal} />
              
              {/* Mascot Reaction */}
              <motion.div 
                animate={mascotAnimation}
                transition={mascotTransition}
                className={`absolute -bottom-4 -right-4 w-32 h-32 rounded-full border-4 shadow-lg overflow-hidden z-20 transition-colors duration-500 ${
                  isGoalMet ? 'border-primary bg-primary-container' : 'border-white bg-primary-container'
                }`}
              >
                <img src={activeCharacter.image} alt={activeCharacter.name} className="w-full h-full object-cover" />
                
                {/* Sparkle effects during animation */}
                <AnimatePresence>
                  {isAnimating && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, x: 0, y: 0 }}
                          animate={{ 
                            scale: [0, 1, 0], 
                            x: (Math.random() - 0.5) * 100, 
                            y: (Math.random() - 0.5) * 100 
                          }}
                          className="absolute left-1/2 top-1/2 text-yellow-400"
                        >
                          <Sparkles size={24} className="fill-current" />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Goal Met Celebration */}
              <AnimatePresence>
                {isGoalMet && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-8 -left-8 bg-primary text-on-primary p-4 rounded-full shadow-lg z-30"
                  >
                    <PartyPopper size={32} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-12 text-center">
              <div className="text-4xl font-bold text-primary">{currentIntake} / {goal} ml</div>
              <motion.div 
                key={getMotivationalMessage()}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-xl font-bold mt-2 ${isGoalMet ? 'text-primary' : 'text-on-surface'}`}
              >
                {getMotivationalMessage()}
              </motion.div>
              <div className="text-sm text-on-surface-variant mt-1 font-medium">{percentage}% of your goal!</div>
            </div>
          </div>

          {/* Success Overlay Animation */}
          <AnimatePresence>
            {isAnimating && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-primary/10 flex items-center justify-center pointer-events-none z-0"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1], rotate: isGoalMet ? [0, 10, -10, 0] : 0 }}
                  className="text-primary text-9xl font-black opacity-20 flex flex-col items-center"
                >
                  <span>{isGoalMet ? "VICTORY!" : "YAY!"}</span>
                  {isGoalMet && <span className="text-4xl mt-4 tracking-[1em] translate-x-[0.5em]">GOAL MET</span>}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Actions & Stats */}
        <div className="col-span-1 md:col-span-4 flex flex-col gap-8">
          {/* Quick Log */}
          <div className="bg-surface-container-low rounded-[2rem] shadow-sm p-8 flex flex-col justify-center flex-1 border border-surface-variant/50">
            <h3 className="text-xl font-bold text-on-surface mb-6">Quick Log</h3>
            <div className="grid grid-cols-2 gap-4">
              {quickLogItems.map((item, idx) => {
                const Icon = ICON_MAP[item.icon] || Droplet;
                const colorClass = item.name === 'Water' ? 'text-primary' : (item.name === 'Milk' ? 'text-tertiary' : 'text-secondary');
                
                return (
                  <motion.button 
                    key={idx}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAddDrink(item.name, item.amount, item.name === 'Water' ? 'Water' : 'Other', item.icon)}
                    className="bg-surface-container-lowest hover:bg-primary-container/30 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Icon size={32} className={colorClass} />
                    <span className="text-xs font-bold text-on-surface">{item.name}</span>
                    <span className="text-[10px] font-medium text-on-surface-variant">{item.amount}ml</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Streak Card */}
          <div className="bg-secondary-fixed rounded-[2rem] shadow-sm p-8 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-on-secondary-fixed-variant mb-1 uppercase tracking-wider">Current Streak</div>
              <div className="text-3xl font-bold text-on-secondary-fixed flex items-center gap-2">
                {streak} Days <Flame size={24} className="text-tertiary fill-current" />
              </div>
            </div>
            <div className="w-16 h-16 rounded-full bg-secondary-fixed-dim flex items-center justify-center shadow-inner">
               <Calendar size={32} className="text-on-secondary-fixed" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Logs Section */}
      <section className="bg-surface-container-lowest rounded-[3rem] shadow-cloud p-12">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-on-surface">Recent Logs</h3>
          <button className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="space-y-4">
          {recentLogs.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-4 rounded-3xl bg-surface-container-low hover:bg-surface-variant/30 transition-all group">
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-sm ${
                  log.type === 'Water' ? 'bg-primary-container text-primary' : 'bg-secondary-container text-secondary'
                }`}>
                  <Droplet size={24} className="fill-current" />
                </div>
                <div>
                  <div className="font-bold text-on-surface text-lg">{log.name}</div>
                  <div className="text-sm font-medium text-on-surface-variant">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
              <div className={`text-xl font-bold ${log.type === 'Water' ? 'text-primary' : 'text-secondary'}`}>
                +{log.amount}ml
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
