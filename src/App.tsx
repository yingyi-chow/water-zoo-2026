/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ViewType, DrinkRecord } from './types';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import TopNav from './components/TopNav';
import Dashboard from './pages/Dashboard';
import Drinks from './pages/Drinks';
import Characters from './pages/Characters';
import Stats from './pages/Stats';
import Leaderboard from './pages/Leaderboard';
import DisqusForum from './components/DisqusForum';
import VictoryCelebration from './components/VictoryCelebration';
import { motion, AnimatePresence } from 'motion/react';
import { AGE_BANDS, CHARACTERS } from './constants';
import { Check } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [currentIntake, setCurrentIntake] = useState(1200);
  const [selectedAgeBandId, setSelectedAgeBandId] = useState(AGE_BANDS[2].id); // Default to 9-13
  const [goal, setGoal] = useState(AGE_BANDS[2].target);
  const [streak, setStreak] = useState(7);
  const [points, setPoints] = useState(4280);
  const [isAnimating, setIsAnimating] = useState(false);
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
      name: 'Breakfast Milk',
      amount: 200,
      icon: 'Baby',
      timestamp: new Date(Date.now() - 3 * 3600000),
      type: 'Other'
    },
    {
      id: '3',
      name: 'Fruit Juice',
      amount: 200,
      icon: 'Citrus',
      timestamp: new Date(Date.now() - 5 * 3600000),
      type: 'Other'
    }
  ]);

  useEffect(() => {
    const band = AGE_BANDS.find(b => b.id === selectedAgeBandId);
    if (band) {
      setGoal(band.target);
    }
  }, [selectedAgeBandId]);
  
  const addDrink = (name: string, amount: number, type: string, icon: string) => {
    const newIntake = currentIntake + amount;
    const newLog: DrinkRecord = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      amount,
      icon,
      timestamp: new Date(),
      type
    };

    setRecentLogs(prev => [newLog, ...prev].slice(0, 10)); // Keep last 10 logs
    
    // Streak-based point reward
    // Base: 10 points per drink
    // Streak multiplier: 1 + (streak * 0.2)
    const multiplier = 1 + (streak * 0.2);
    let earnedPoints = Math.round(10 * multiplier);
    
    // Daily Goal Bonus: 100 points scaled by streak
    if (currentIntake < goal && newIntake >= goal) {
      const bonus = Math.round(100 * multiplier);
      earnedPoints += bonus;
    }
    
    setPoints(prev => prev + earnedPoints);
    setCurrentIntake(newIntake);
    
    // Trigger standard animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
  };

  const glassesRemaining = Math.max(0, Math.ceil((goal - currentIntake) / 250));

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <Dashboard 
            currentIntake={currentIntake} 
            goal={goal} 
            streak={streak} 
            points={points}
            recentLogs={recentLogs} 
            onAddDrink={addDrink} 
            isAnimating={isAnimating}
          />
        );
      case 'drinks':
        return <Drinks onAddDrink={addDrink} />;
      case 'characters':
        return <Characters />;
      case 'stats':
        return <Stats streak={streak} points={points} />;
      case 'leaderboard':
        return <Leaderboard streak={streak} points={points} setPoints={setPoints} />;
      case 'settings':
        return (
          <div className="flex flex-col gap-12 bg-surface-container-lowest rounded-[3rem] shadow-cloud p-8 md:p-12">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold text-on-surface">Settings</h2>
              <p className="text-on-surface-variant">Personalize your hydration journey</p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-on-surface flex items-center gap-2">
                Age Band
              </h3>
              <p className="text-sm text-on-surface-variant -mt-4 mb-4">Select your age to set your daily hydration goal</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {AGE_BANDS.map((band) => (
                  <button
                    key={band.id}
                    onClick={() => setSelectedAgeBandId(band.id)}
                    className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all ${
                      selectedAgeBandId === band.id
                        ? 'border-primary bg-primary-container text-on-primary-container'
                        : 'border-surface-variant bg-surface-container-low hover:border-primary/50 text-on-surface'
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-bold text-lg">{band.label}</div>
                      <div className={`text-sm ${selectedAgeBandId === band.id ? 'text-on-primary-container/80' : 'text-on-surface-variant'}`}>
                        {band.description}
                      </div>
                    </div>
                    {selectedAgeBandId === band.id && (
                      <div className="bg-primary text-on-primary rounded-full p-1">
                        <Check size={20} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-primary-container/30 rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-6 border border-primary/10">
              <div className="text-4xl">💧</div>
              <div className="text-center md:text-left flex-1">
                <h4 className="font-bold text-on-primary-container text-xl">Your Daily Goal: {goal}ml</h4>
                <p className="text-on-primary-container/70 text-sm mt-1">
                  Based on your selection, we recommend drinking at least {goal}ml of water daily.
                </p>
              </div>
              <button 
                onClick={() => setCurrentView('home')}
                className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold shadow-md hover:bg-primary/90 transition-all"
              >
                Let's Go!
              </button>
            </div>
          </div>
        );
      default:
        return (
          <Dashboard 
            currentIntake={currentIntake} 
            goal={goal} 
            streak={streak} 
            points={points}
            recentLogs={recentLogs} 
            onAddDrink={addDrink} 
            isAnimating={isAnimating}
          />
        );
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex selection:bg-primary-container selection:text-on-primary-container">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        glassesRemaining={glassesRemaining} 
        isAnimating={isAnimating}
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

          <DisqusForum />
        </div>
      </main>

      <BottomNav currentView={currentView} onViewChange={setCurrentView} />
    </div>
  );
}
