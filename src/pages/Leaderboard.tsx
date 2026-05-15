/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplets, 
  Star, 
  Rocket, 
  Flame, 
  UserPlus, 
  Trophy, 
  Edit2, 
  QrCode, 
  Lock,
  Crown,
  Award,
  Gift,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useState } from 'react';
import { MASCOTS } from '../constants';

interface LeaderboardProps {
  streak: number;
  points: number;
  setPoints: (points: number | ((prev: number) => number)) => void;
}

export default function Leaderboard({ streak: currentStreak, points, setPoints }: LeaderboardProps) {
  const [showRedeemSuccess, setShowRedeemSuccess] = useState(false);
  const [redeemedVoucher, setRedeemedVoucher] = useState<string | null>(null);

  const friends = [
    {
      rank: 1,
      name: 'Hungry Hippo',
      streak: 12,
      points: 8450,
      image: MASCOTS.HIPPO,
      badges: ['Award', 'Crown']
    },
    {
      rank: 2,
      name: 'Ellie Trunk',
      streak: 8,
      points: 7120,
      image: MASCOTS.ELEPHANT,
      badges: ['Award']
    }
  ];

  const vouchers = [
    { id: 'ntuc-5', name: '$5 NTUC Voucher', cost: 2000, description: 'Good for snacks and drinks!' },
    { id: 'ntuc-10', name: '$10 NTUC Voucher', cost: 3800, description: 'Get a big treat at FairPrice!' },
    { id: 'ntuc-20', name: '$20 NTUC Voucher', cost: 7000, description: 'The ultimate hydration reward!' },
  ];

  const handleRedeem = (voucher: typeof vouchers[0]) => {
    if (points >= voucher.cost) {
      setPoints(prev => prev - voucher.cost);
      setRedeemedVoucher(voucher.name);
      setShowRedeemSuccess(true);
      setTimeout(() => setShowRedeemSuccess(false), 5000);
    }
  };

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface">Friend Leaderboard</h2>
          <p className="text-on-surface-variant">See how your pals are doing this week!</p>
        </div>
        <button className="bg-primary text-on-primary font-bold px-8 py-3 rounded-full flex items-center gap-2 hover:opacity-90 transition-transform active:scale-95 shadow-lg">
          <UserPlus size={20} />
          Add Friend
        </button>
      </div>

      <AnimatePresence>
        {showRedeemSuccess && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-primary-container text-on-primary-container p-6 rounded-[2rem] flex items-center gap-4 shadow-lg border-2 border-primary"
          >
            <CheckCircle2 className="text-primary shrink-0" size={32} />
            <div>
              <h4 className="font-bold text-xl">Success!</h4>
              <p>You've redeemed your points for a <strong>{redeemedVoucher}</strong>. Check your email for the code!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Gamification & Stats */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          {/* Water Points Display */}
          <section className="bg-surface-container-lowest p-8 rounded-[2.5rem] shadow-cloud text-center border border-surface-variant/20">
            <span className="text-xs font-bold text-primary tracking-[0.2em] uppercase">My Total Balance</span>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="bg-primary-container p-3 rounded-3xl">
                <Droplets className="text-primary fill-current" size={40} />
              </div>
              <h1 className="text-5xl font-bold text-on-surface">{points.toLocaleString()}</h1>
            </div>
            <p className="text-on-surface-variant font-medium mt-2">Water Points</p>
          </section>

          {/* Rewards Center */}
          <section className="bg-surface-container-lowest p-8 rounded-[2.5rem] shadow-cloud border border-primary/10">
            <div className="flex items-center gap-2 mb-6">
              <Gift className="text-primary" size={24} />
              <h3 className="text-xl font-bold text-on-surface">Rewards Center</h3>
            </div>
            
            <div className="space-y-4">
              {vouchers.map((voucher) => (
                <div key={voucher.id} className="p-4 rounded-3xl bg-surface-container-low border border-surface-variant/30 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-on-surface">{voucher.name}</h4>
                      <p className="text-[10px] text-on-surface-variant font-medium">{voucher.description}</p>
                    </div>
                    <div className="bg-primary-container text-primary text-xs font-black px-2 py-1 rounded-lg">
                      {voucher.cost} pts
                    </div>
                  </div>
                  <button 
                    disabled={points < voucher.cost}
                    onClick={() => handleRedeem(voucher)}
                    className={`w-full py-2.5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                      points >= voucher.cost 
                        ? 'bg-primary text-on-primary hover:opacity-90 active:scale-95 shadow-md' 
                        : 'bg-surface-variant text-on-surface-variant/40 cursor-not-allowed'
                    }`}
                  >
                    {points >= voucher.cost ? 'Redeem Now' : `Need ${voucher.cost - points} more`}
                    {points >= voucher.cost && <ExternalLink size={14} />}
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 rounded-2xl bg-secondary-container/20 border border-secondary/10">
              <p className="text-[10px] text-on-secondary-container leading-relaxed font-medium">
                *NTUC FairPrice vouchers are sent digitally via SMS to your parent's registered mobile number.
              </p>
            </div>
          </section>

          {/* Daily Race Widget */}
          <section className="bg-tertiary-container/40 p-8 rounded-[2.5rem] shadow-cloud relative overflow-hidden border border-tertiary/10">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                <h2 className="text-xl font-bold text-on-tertiary-container">Daily Race</h2>
              </div>
              <p className="text-on-tertiary-container/80 mb-6 leading-relaxed">
                First to reach 100% goal today gets a Golden Droplet badge!
              </p>
              <div className="w-full h-4 bg-white/50 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '72%' }}
                  className="h-full bg-primary"
                />
              </div>
              <p className="text-xs font-bold mt-3 text-on-tertiary-container/70">
                You are 72% hydrated today!
              </p>
            </div>
            <Rocket 
              className="absolute -bottom-6 -right-6 text-on-tertiary-container/10 rotate-[-15deg]" 
              size={140} 
            />
          </section>

          {/* Multiplier Status */}
          <section className="bg-secondary-container/30 p-8 rounded-[2.5rem] shadow-cloud border border-secondary/10">
            <h3 className="text-xl font-bold text-on-secondary-container mb-6">Streak Rewards</h3>
            <div className="space-y-3">
              {[
                { days: 2, multiplier: '1.4x' },
                { days: 5, multiplier: '2.0x' },
                { days: 7, multiplier: '2.4x', active: true }
              ].map((s, i) => (
                <div 
                  key={i}
                  className={`flex justify-between items-center p-4 rounded-3xl ${
                    currentStreak >= s.days 
                      ? 'bg-white border-2 border-primary shadow-sm' 
                      : 'bg-white/40 border border-surface-variant/30 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Flame className={currentStreak >= s.days ? 'text-primary fill-current' : 'text-on-surface-variant'} size={20} />
                    <span className="font-bold text-sm">{s.days} Days</span>
                  </div>
                  <span className={`font-black ${currentStreak >= s.days ? 'text-primary' : 'text-on-surface-variant/60'}`}>
                    {s.multiplier} Multiplier
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-center mt-6 text-on-secondary-container/60 font-medium leading-relaxed">
              Current streak: <strong>{currentStreak} days</strong><br/>
              The more days you hit your goal, the more points you get!
            </p>
          </section>
        </div>

        {/* Center/Right Side: Leaderboard */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Ranking Entries */}
          <div className="flex flex-col gap-4">
            {friends.map((friend) => (
              <motion.div 
                key={friend.rank}
                whileHover={{ scale: 1.01 }}
                className="bg-surface-container-lowest p-6 rounded-[2rem] flex items-center gap-6 shadow-cloud border border-surface-variant/20"
              >
                <div className="w-8 flex justify-center">
                  <span className="text-2xl font-black text-primary/30">#{friend.rank}</span>
                </div>
                <div className="relative w-16 h-16 rounded-3xl overflow-hidden border-4 border-primary-container shrink-0">
                  <img alt={friend.name} className="w-full h-full object-cover" src={friend.image} />
                </div>
                <div className="flex-grow">
                  <h4 className="text-xl font-bold text-on-surface">{friend.name}</h4>
                  <div className="flex items-center gap-1.5 text-on-surface-variant">
                    <Flame className="text-primary fill-current" size={14} />
                    <span className="text-xs font-bold">{friend.streak} Day Streak</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-1.5">
                    {friend.badges.includes('Award') && <Award className="text-tertiary" size={20} />}
                    {friend.badges.includes('Crown') && <Crown className="text-primary" size={20} />}
                  </div>
                  <span className="font-black text-primary">{friend.points.toLocaleString()} pts</span>
                </div>
              </motion.div>
            ))}

            {/* Your Rank Highlight */}
            <motion.div 
              layoutId="your-rank"
              className="bg-primary-container/40 p-8 rounded-[2.5rem] flex items-center gap-6 shadow-[0_20px_50px_rgba(61,102,90,0.15)] border-4 border-primary/10 scale-105 my-4"
            >
              <div className="w-8 flex justify-center">
                <span className="text-2xl font-black text-primary">#3</span>
              </div>
              <div className="relative w-20 h-20 rounded-[2rem] overflow-hidden border-4 border-white shrink-0 shadow-lg">
                <img 
                  alt="You" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida/ADBb0ujc5YjpU7fUw1YrOI4O1_xiPG27ZxBzsB4mT4GppAX9nmIiedpBoceP6EUtbfq448P2KMvVu8aPLzSaTaA6wz8Aa6lVjBElYLDMdTSXSZydgaKfn0uk0RdT0g1mRUg7_QLIvYqQtL19w6pfS0RjpYdmYkhtBx8JLCAwhy5ST9GRoOwpKzIG0z3BvlL8-gmC9Hdj5YD8kYXaTVq3FBjx28H8ik4X68UjYKjvq973-E9u2mYvPmFWBhAI4CQ" 
                />
                <div className="absolute bottom-0 right-0 bg-primary text-on-primary rounded-full p-1.5 border-2 border-white">
                  <Edit2 size={12} />
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <h4 className="text-xl font-bold text-on-primary-container">You (Sloth Buddy)</h4>
                  <span className="bg-primary/20 text-primary text-[10px] font-black px-2 py-0.5 rounded-full uppercase">ME</span>
                </div>
                <div className="flex items-center gap-1.5 text-on-primary-container/70">
                  <Flame className="text-primary fill-current" size={14} />
                  <span className="text-xs font-bold">{currentStreak} Day Streak</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-2xl font-black text-primary">{points.toLocaleString()} pts</span>
                <span className="text-[10px] font-black text-primary/50 uppercase tracking-widest">Top 15%</span>
              </div>
            </motion.div>

            {/* Add Friend Placeholder UI */}
            <div className="border-4 border-dashed border-surface-variant/50 rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-6 bg-surface-container-low/30 mt-4">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-sm flex items-center justify-center border border-surface-variant/30">
                  <QrCode className="text-on-surface-variant/40" size={32} />
                </div>
                <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-sm flex items-center justify-center border border-surface-variant/30">
                  <Lock className="text-on-surface-variant/40" size={32} />
                </div>
              </div>
              <div className="text-center max-w-xs">
                <p className="font-bold text-on-surface-variant">Enter a Secret Code or scan a QR code to add more pals!</p>
                <input 
                  className="mt-6 w-full text-center border-2 border-primary-container rounded-3xl bg-white focus:ring-primary focus:border-primary font-bold py-4 placeholder:text-surface-variant" 
                  placeholder="e.g. AQUA-1234" 
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
