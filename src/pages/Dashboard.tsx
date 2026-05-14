/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flame, Calendar, ChevronRight, Droplet, Coffee, Beer } from 'lucide-react';
import HydrationRing from '../components/HydrationRing';
import { motion } from 'motion/react';
import { DrinkRecord } from '../types';

interface DashboardProps {
  currentIntake: number;
  goal: number;
  streak: number;
  recentLogs: DrinkRecord[];
}

export default function Dashboard({ currentIntake, goal, streak, recentLogs }: DashboardProps) {
  return (
    <div className="space-y-12">
      {/* Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Hydration Ring */}
        <div className="col-span-1 md:col-span-8 bg-surface-container-lowest rounded-[3rem] shadow-cloud p-12 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-transparent pointer-events-none"></div>
          <h2 className="text-3xl font-bold text-on-surface mb-8 text-center z-10">Today's Progress</h2>
          
          <HydrationRing current={currentIntake} goal={goal} />

          <div className="mt-8 text-center z-10">
            <div className="text-4xl font-bold text-primary">{currentIntake} / {goal} ml</div>
            <div className="text-lg text-on-surface-variant mt-1 font-medium">You're doing great!</div>
          </div>
        </div>

        {/* Quick Actions & Stats */}
        <div className="col-span-1 md:col-span-4 flex flex-col gap-8">
          {/* Quick Log */}
          <div className="bg-surface-container-low rounded-[2rem] shadow-sm p-8 flex flex-col justify-center flex-1 border border-surface-variant/50">
            <h3 className="text-xl font-bold text-on-surface mb-6">Quick Log</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: '250ml Glass', icon: Droplet, amount: 250, color: 'text-primary' },
                { label: 'Coffee', icon: Coffee, amount: 200, color: 'text-secondary' },
                { label: '500ml Bottle', icon: Beer, amount: 500, color: 'text-primary' },
                { label: 'Tea', icon: Coffee, amount: 200, color: 'text-tertiary' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.button 
                    key={idx}
                    whileHover={{ y: -4 }}
                    className="bg-surface-container-lowest hover:bg-primary-container/30 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Icon size={32} className={item.color} />
                    <span className="text-xs font-bold text-on-surface">{item.label}</span>
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
