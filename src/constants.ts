import { Character, Badge } from './types';

export const MASCOTS = {
  WATER_DROP: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhB9veMQaPCyaN5J-iEkNrfFL8DUv42mXhn_BJRdZxBd7poiw_pgngjb6u00fnYkkxCtxvQwovAiGPA87Um5Dnbg5CeaYrKIvaN7vM0rKyrf0mdW4VCTrsjMzcM_d_UiMo_g1QOXrXxZJBvYUnlPbUO4mCXAOhWSfAiRG6EB_KTpSXR4XTVAXNits8RbeZ9p_-Ow7QNYIzPlYEVqB8vwW2A570Q5xcTojq0yUU2w519hTXaiSZU-21Lvio3iFomtXQFy-veC0tWWdW",
  LLAMA: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqJJAE6I3Vzyjfq2hJ3aZtR3TMR1rMCFXphEO-UpGEWsMF4U1s7mjWDBH2U0cpBytUn5CsOVlEVQKaApgouCPu3LZ1wZvVsMHm4U9SnDO27Lb1c5z_dPHTgRu1Y0fKbfUalIKRGFBSIFniauRd_WJz42OMZflLQiT8fIJ3qyHr0I6pIBPi765UgEcIkc8ESYyxINbdMKX0vGrsey-iKOyErwb4aCJgiEaQs6KGm4OchbWUpFR3745MNbkOQ7oQXL2PddtHZd_VdBwZ",
  ALPACA: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIPKrQr_xd1CqoT1shC6BRaru38Z9v8398M3zP_mIosL9djiaSiifFLTBXaDFVyx4PnyIJrs5iKkVzQfU5rvwhhhMZ1Zy0jY07HXXkqwhNs408tQGD2Mo_LSE7crkt6V2S4QMm9GFkKj-WkVP1qRWQR4VzyWhLqvXDtZvqFyK1K4GJBDYd6GUU-uoxxdvfnjROAkBxbHqklRepeO8WxnH3AKnMig96XG4P3PsFNqmuqvpF5xQ08pVFPfWAy65ZF4YW5ZEl7E6nN_Ch",
  CAPYBARA: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5GYG4JKTPveQSwvMQJjZoBjc_hQL9e72F-FbifZNF6bjDQSJVbrvUVrW5nqFdzJmwMn0kGWxPI7074zQnXK4HOdOig6za-m05q8WMXXfHNP5SqQFEq3Dk9AkX_xUmAOHEGJFYR6WAiormdBGXr3T2pP6Aq7B1O2_HklRmDLYwsqStgGA7oJzWfAAjMXw8GQL2ehdaVAS_uSwauiGHYuZys37BZLqjw33U2UYRU0fQkddVy4wvavVhjgRJfoj3Ce76c8q0A7n5ifjW"
};

export const CHARACTERS: Character[] = [
  {
    id: '1',
    name: 'Lulu',
    description: 'Loves sparkling water and afternoon naps.',
    level: 5,
    progress: 85,
    image: MASCOTS.LLAMA,
    isUnlocked: true
  },
  {
    id: '2',
    name: 'Pip',
    description: 'Just joined the squad! Needs more hydration to grow.',
    level: 1,
    progress: 20,
    image: MASCOTS.ALPACA,
    isUnlocked: true
  },
  {
    id: '3',
    name: 'Barnaby',
    description: 'The chillest pal around. Unlocks at Milestone 3.',
    level: 0,
    progress: 68,
    image: MASCOTS.CAPYBARA,
    isUnlocked: false,
    unlockCondition: 'Drink 50 more glasses'
  }
];

export const BADGES: Badge[] = [
  {
    id: '1',
    name: 'Early Bird',
    description: 'Drank water before 8 AM',
    icon: 'Star',
    isUnlocked: true,
    color: 'secondary-fixed'
  },
  {
    id: '2',
    name: 'Ocean Master',
    description: 'Hit goal 7 days in a row',
    icon: 'Waves',
    isUnlocked: true,
    color: 'primary-container'
  },
  {
    id: '3',
    name: 'Goal Crusher',
    description: 'Exceeded daily goal',
    icon: 'Trophy',
    isUnlocked: true,
    color: 'tertiary-container'
  },
  {
    id: '4',
    name: 'Hydration Hero',
    description: 'Reach a 30-day streak',
    icon: 'Lock',
    isUnlocked: false,
    color: 'surface-container-high'
  }
];

export const DRINK_OPTIONS = [
  { name: 'Water', description: 'Pure & Simple', amount: 250, icon: 'Water', color: 'primary-container' },
  { name: 'Coffee', description: 'Energy Boost', amount: 200, icon: 'Coffee', color: 'tertiary-container' },
  { name: 'Tea', description: 'Calm & Cozy', amount: 200, icon: 'Soup', color: 'secondary-container' },
  { name: 'Juice', description: 'Sweet & Fruity', amount: 300, icon: 'CupSoda', color: 'surface-container' },
  { name: 'Smoothie', description: 'Thick & Nutritious', amount: 400, icon: 'GlassWater', color: 'primary-fixed' },
];
