export type ViewType = 'home' | 'drinks' | 'characters' | 'stats' | 'leaderboard' | 'settings';

export interface DrinkRecord {
  id: string;
  name: string;
  amount: number;
  icon: string;
  timestamp: Date;
  type: string;
}

export interface Character {
  id: string;
  name: string;
  description: string;
  level: number;
  progress: number; // 0-100
  image: string;
  isUnlocked: boolean;
  unlockCondition?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  color: string;
}
