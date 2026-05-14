/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ViewType, DrinkRecord } from './types';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import TopNav from './components/TopNav';
import Dashboard from './pages/Dashboard';
import Drinks from './pages/Drinks';
import Characters from './pages/Characters';
import Stats from './pages/Stats';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [currentIntake, setCurrentIntake] = useState(1200);
  const [goal, setGoal] = useState(2000);
  const [streak, setStreak] = useState(5);
  const [recentLogs, setRecentLogs] = useState<DrinkRecord[]>([
    {
      id: '1',
      name: 'Water Glass',
      amount: 250,
      icon: 'Water',
      timestamp: new Date(Date.now() - 2 * 60000),
      type: 'Water'
    },
    {
      id: '2',
      name: 'Morning Coffee',
      amount: 200,
      icon: 'Coffee',
      timestamp: new Date(Date.now() - 3 * 3600000),
      type: 'Other'
    },
    {
      id: '3',
      name: 'Sports Bottle',
      amount: 500,
      icon: 'Water',
      timestamp: new Date(Date.now() - 5 * 3600000),
      type: 'Water'
    }
  ]);
  
  const addDrink = (name: string, amount: number, type: string) => {
    const newLog: DrinkRecord = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      amount,
      icon: type === 'Water' ? 'Water' : 'Coffee',
      timestamp: new Date(),
      type
    };
    setRecentLogs(prev => [newLog, ...prev].slice(0, 10)); // Keep last 10 logs
    setCurrentIntake(prev => prev + amount);
  };

  const glassesRemaining = Math.max(0, Math.ceil((goal - currentIntake) / 250));

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Dashboard currentIntake={currentIntake} goal={goal} streak={streak} recentLogs={recentLogs} onAddDrink={addDrink} />;
      case 'drinks':
        return <Drinks onAddDrink={addDrink} />;
      case 'characters':
        return <Characters />;
      case 'stats':
        return <Stats />;
      case 'settings':
        return (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-12 bg-surface-container-low rounded-[3rem] shadow-cloud">
             <div className="text-6xl mb-6">⚙️</div>
             <h2 className="text-3xl font-bold text-on-surface mb-4">Settings</h2>
             <p className="text-on-surface-variant max-w-md">Configuration options for your AquaPals experience would go here!</p>
          </div>
        );
      default:
        return <Dashboard currentIntake={currentIntake} goal={goal} streak={streak} recentLogs={recentLogs} onAddDrink={addDrink} />;
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex selection:bg-primary-container selection:text-on-primary-container">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        glassesRemaining={glassesRemaining} 
      />

      <main className="flex-1 flex flex-col md:ml-64 pb-24 md:pb-12">
        <TopNav />
        
        <div className="p-6 md:p-12 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <BottomNav currentView={currentView} onViewChange={setCurrentView} />
    </div>
  );
}

