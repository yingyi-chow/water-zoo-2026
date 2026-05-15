/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flame, Star, Waves, Trophy, Lock, Verified, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { BADGES } from '../constants';

const ICON_MAP: Record<string, any> = {
  Star: Star,
  Waves: Waves,
  Trophy: Trophy,
  Lock: Lock
};

const BADGE_COLOR_MAP: Record<string, string> = {
  'secondary-fixed': 'bg-secondary-fixed',
  'primary-container': 'bg-primary-container',
  'tertiary-container': 'bg-tertiary-container',
  'surface-container-high': 'bg-surface-container-high',
};

interface StatsProps {
  streak?: number;
  points?: number;
}

export default function Stats({ streak = 14, points = 4280 }: StatsProps) {
  const weeklyData = [
    { day: 'Mon', level: 60, amount: '1.8L' },
    { day: 'Tue', level: 80, amount: '2.4L' },
    { day: 'Wed', level: 95, amount: '2.9L', active: true, goalMet: true },
    { day: 'Thu', level: 40, amount: '1.2L' },
    { day: 'Fri', level: 10, amount: '0.3L' },
    { day: 'Sat', level: 10, amount: '0.2L' },
    { day: 'Sun', level: 10, amount: '0.1L' },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-on-background">Your Hydration Journey</h1>
        <p className="text-lg text-on-surface-variant font-medium">You're doing great! Keep up the splashy work.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weekly Chart */}
        <section className="lg:col-span-8 bg-surface-container-lowest rounded-[3rem] p-10 shadow-cloud flex flex-col gap-8 transition-all hover:shadow-cloud-hover">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-on-background">Weekly Flow</h2>
              <p className="text-sm font-medium text-on-surface-variant mt-1">Average 2.4L / day</p>
            </div>
            <button className="bg-surface-container-low text-on-surface-variant px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-surface-variant transition-colors border border-surface-variant/50">
              This Week <ChevronDown size={18} />
            </button>
          </div>

          <div className="flex-1 flex items-end justify-between gap-4 mt-8 h-64 pt-8 border-b-2 border-surface-container-high pb-4 w-full">
            {weeklyData.map((data, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4 flex-1 group relative">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${data.level}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className={`w-full max-w-[48px] rounded-t-full transition-all relative ${
                    data.active ? 'bg-primary shadow-lg' : 'bg-primary-container/60 group-hover:bg-primary-container'
                  }`}
                >
                  {data.active && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-secondary rounded-full shadow-[0_0_8px_rgba(94,89,131,0.6)]" />
                  )}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-inverse-surface text-on-secondary text-[10px] font-bold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-lg">
                    {data.amount} {data.goalMet && '(Goal Met!)'}
                  </div>
                </motion.div>
                <span className={`text-xs font-bold ${data.active ? 'text-primary uppercase tracking-widest' : 'text-on-surface-variant'}`}>
                  {data.day}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Streak Badge */}
        <section className="lg:col-span-4 bg-tertiary-container rounded-[3rem] p-10 shadow-cloud flex flex-col items-center justify-center gap-6 text-center transition-all hover:shadow-cloud-hover relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
          <div className="w-28 h-28 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-md z-10 transition-transform duration-500 group-hover:rotate-12">
            <Flame size={56} className="text-tertiary fill-current" />
          </div>
          <div className="z-10">
            <h3 className="text-5xl font-bold text-on-tertiary-container">{streak} Days</h3>
            <p className="text-xl font-medium text-on-tertiary-container mt-2">Current Streak</p>
          </div>
          <div className="bg-surface-container-lowest/60 backdrop-blur-sm px-6 py-2.5 rounded-full text-xs font-bold text-on-tertiary-container mt-4 flex items-center gap-2 z-10 shadow-sm">
            <Verified size={18} /> You're on fire!
          </div>
        </section>
      </div>

      {/* Achievements Grid */}
      <section className="flex flex-col gap-6">
        <div className="flex justify-between items-center px-4">
          <h2 className="text-2xl font-bold text-on-background">Recent Badges</h2>
          <button className="text-primary font-bold text-sm hover:text-primary-container transition-colors">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {BADGES.map((badge) => {
            const Icon = ICON_MAP[badge.icon] || Star;
            const bgClass = BADGE_COLOR_MAP[badge.color] || 'bg-surface-container-high';
            return (
              <motion.div
                key={badge.id}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`${bgClass} rounded-[2rem] p-8 flex flex-col items-center text-center gap-4 shadow-cloud transition-all border-4 border-surface-container-lowest/50 group ${
                  badge.isUnlocked ? '' : 'opacity-70 grayscale-[0.3]'
                }`}
              >
                <div className="w-20 h-20 bg-surface-container-lowest rounded-full flex items-center justify-center text-current mb-2 shadow-sm transition-transform group-hover:rotate-12">
                  <Icon size={40} className={badge.isUnlocked ? 'fill-current' : ''} />
                </div>
                <h4 className="text-lg font-bold text-on-surface">{badge.name}</h4>
                <p className="text-xs font-medium text-on-surface-variant leading-relaxed">
                  {badge.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
