/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Stars, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { CHARACTERS } from '../constants';

export default function Characters() {
  return (
    <div className="space-y-12">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-on-background mb-4">Character Zoo</h1>
        <p className="text-lg text-on-surface-variant font-medium">
          Meet your hydration companions! Keep logging your daily water intake to unlock new friends and level up your current squad.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {CHARACTERS.map((char) => (
          <motion.article
            key={char.id}
            whileHover={{ y: -8 }}
            className={`rounded-[3rem] p-10 flex flex-col items-center relative overflow-hidden shadow-cloud border border-white/40 transition-all group ${
              char.isUnlocked ? char.color : 'bg-tertiary-container opacity-80 backdrop-blur-[2px]'
            }`}
          >
            {/* Status Chip */}
            {char.isUnlocked ? (
              <div className="absolute top-6 right-6 bg-surface/60 backdrop-blur-sm text-primary font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-1.5 shadow-sm">
                <Stars size={14} className="fill-current" /> Level {char.level}
              </div>
            ) : (
              <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center ${char.color}/30 backdrop-blur-[2px] rounded-[3rem]`}>
                <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center shadow-lg text-tertiary mb-4">
                  <Lock size={32} />
                </div>
                <span className="text-xs font-bold text-on-tertiary-container bg-surface/80 px-6 py-2 rounded-full shadow-sm">
                  {char.unlockCondition}
                </span>
              </div>
            )}

            {/* Circular Frame */}
            <div className={`w-48 h-48 rounded-full bg-surface-container-lowest p-1 shadow-cloud mb-8 group-hover:scale-105 transition-transform duration-700 ${!char.isUnlocked && 'blur-[2px] grayscale-[0.5]'}`}>
              <div className={`w-full h-full rounded-full overflow-hidden border-4 ${char.isUnlocked ? (char.color.replace('bg-', 'border-')) : 'border-tertiary-container'}`}>
                <img 
                  alt={char.name} 
                  className="w-full h-full object-cover" 
                  src={char.image} 
                />
              </div>
            </div>

            {/* Details */}
            <h3 className="text-3xl font-bold text-on-secondary-fixed mb-2">{char.name}</h3>
            <p className="text-sm font-medium text-on-secondary-fixed-variant text-center mb-10 leading-relaxed px-4">
              {char.description}
            </p>

            {/* Progress */}
            <div className="w-full bg-surface/50 rounded-2xl p-4 mt-auto shadow-inner">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-bold text-on-secondary-fixed-variant uppercase tracking-widest">
                  {char.isUnlocked ? 'Next Level' : 'Unlock Progress'}
                </span>
                <span className="text-sm font-bold text-secondary">{char.progress}%</span>
              </div>
              <div className="h-4 w-full bg-surface-container-highest rounded-full overflow-hidden border border-white/50 relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${char.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-full relative overflow-hidden ${char.isUnlocked ? 'bg-secondary' : 'bg-tertiary'}`}
                >
                  <div className="absolute inset-0 bg-white/20 w-1/2 rounded-full transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-2000"></div>
                </motion.div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
