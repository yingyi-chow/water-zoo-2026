/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Home, Coffee, Users, BarChart3, Plus } from 'lucide-react';
import { ViewType } from '../types';

interface BottomNavProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export default function BottomNav({ currentView, onViewChange }: BottomNavProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'drinks', label: 'Drinks', icon: Coffee },
    { id: 'characters', label: 'Pals', icon: Users },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-surface-container-lowest shadow-[0px_-10px_20px_rgba(214,207,255,0.1)] flex justify-around items-center h-20 z-50 px-2 rounded-t-3xl border-t border-surface-variant/30">
      {navItems.slice(0, 2).map((item) => {
        const isActive = currentView === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as ViewType)}
            className={`flex flex-col items-center gap-1 transition-all ${
              isActive ? 'text-primary scale-110' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <div className={`p-2 rounded-full ${isActive ? 'bg-primary-container' : ''}`}>
               <Icon size={22} className={isActive ? 'fill-current' : ''} />
            </div>
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        );
      })}

      <div className="relative -top-6">
        <button 
          onClick={() => onViewChange('drinks')}
          className="bg-primary text-on-primary rounded-full p-4 shadow-[0px_10px_20px_rgba(61,102,90,0.4)] flex items-center justify-center hover:scale-105 transition-transform border-4 border-surface-container-lowest"
        >
          <Plus size={28} />
        </button>
      </div>

      {navItems.slice(2).map((item) => {
        const isActive = currentView === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as ViewType)}
            className={`flex flex-col items-center gap-1 transition-all ${
              isActive ? 'text-primary scale-110' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <div className={`p-2 rounded-full ${isActive ? 'bg-primary-container' : ''}`}>
               <Icon size={22} className={isActive ? 'fill-current' : ''} />
            </div>
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
