/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MASCOTS } from '../constants';
import { motion } from 'motion/react';

interface HydrationRingProps {
  current: number;
  goal: number;
}

export default function HydrationRing({ current, goal }: HydrationRingProps) {
  const percentage = Math.min(100, (current / goal) * 100);
  const strokeDashoffset = 283 - (283 * percentage) / 100;

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center z-10 group cursor-pointer">
      {/* Background Ring */}
      <svg className="w-full h-full transform -rotate-90 absolute inset-0" viewBox="0 0 100 100">
        <circle
          className="text-surface-container-high"
          cx="50"
          cy="50"
          fill="none"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
        />
        <motion.circle
          initial={{ strokeDashoffset: 283 }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-primary drop-shadow-[0_4px_8px_rgba(61,102,90,0.3)] transition-all"
          cx="50"
          cy="50"
          fill="none"
          r="45"
          stroke="currentColor"
          strokeDasharray="283"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
      
      {/* Mascot Center */}
      <div className="w-48 h-48 md:w-60 md:h-60 rounded-full bg-tertiary-container/30 flex items-center justify-center overflow-hidden shadow-[inset_0_4px_10px_rgba(255,255,255,0.5)] group-hover:scale-105 transition-transform duration-500">
        <img 
          alt="Cute llama mascot" 
          className="w-full h-full object-cover p-2" 
          src={MASCOTS.LLAMA} 
        />
      </div>
    </div>
  );
}
