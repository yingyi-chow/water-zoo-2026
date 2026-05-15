/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Home, Coffee, Users, BarChart3, Settings, Droplets, Trophy } from 'lucide-react';
import { ViewType } from '../types';
import { MASCOTS } from '../constants';
import { motion } from 'motion/react';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  glassesRemaining: number;
  isAnimating?: boolean;
}

export default function Sidebar({ currentView, onViewChange, glassesRemaining, isAnimating }: SidebarProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'drinks', label: 'Drinks', icon: Coffee },
    { id: 'characters', label: 'Characters', icon: Users },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="hidden md:flex flex-col py-8 z-50 bg-surface-container-low shadow-[20px_0px_40px_rgba(214,207,255,0.08)] fixed left-0 top-0 h-full w-64 rounded-r-3xl">
      <div className="px-6 mb-12 flex flex-col items-center text-center">
        <motion.div 
          animate={isAnimating ? {
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          } : {}}
          transition={{ duration: 0.5, repeat: isAnimating ? Infinity : 0 }}
          className="w-24 h-24 rounded-full bg-primary-container overflow-hidden mb-4 shadow-[10px_10px_30px_rgba(214,207,255,0.2)]"
        >
          <img 
            alt="Water droplet character" 
            className="w-full h-full object-cover" 
            src={MASCOTS.WATER_DROP} 
          />
        </motion.div>
        <h1 className="text-2xl font-bold text-primary mb-1">Thirsty Creatures</h1>
        <p className="text-sm text-on-surface-variant font-medium">
          {glassesRemaining} glasses to go
        </p>
      </div>

      <div className="flex-1 space-y-2 px-3">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as ViewType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-all group ${
                isActive 
                ? 'bg-primary-container text-on-primary-container scale-95' 
                : 'text-on-surface-variant hover:bg-surface-variant/50 hover:scale-105'
              }`}
            >
              <Icon size={20} className={isActive ? 'fill-current' : ''} />
              <span className="text-sm font-semibold tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="px-6 mt-auto">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onViewChange('drinks')}
          className="w-full bg-primary text-on-primary rounded-full py-3.5 font-bold text-sm shadow-[0px_10px_20px_rgba(214,207,255,0.4)] border-2 border-primary-fixed/30 flex items-center justify-center gap-2"
        >
          <Droplets size={16} />
          Log Drink
        </motion.button>
      </div>
    </nav>
  );
}
