import { Character, Badge } from './types';

export const MASCOTS = {
  WATER_DROP: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhB9veMQaPCyaN5J-iEkNrfFL8DUv42mXhn_BJRdZxBd7poiw_pgngjb6u00fnYkkxCtxvQwovAiGPA87Um5Dnbg5CeaYrKIvaN7vM0rKyrf0mdW4VCTrsjMzcM_d_UiMo_g1QOXrXxZJBvYUnlPbUO4mCXAOhWSfAiRG6EB_KTpSXR4XTVAXNits8RbeZ9p_-Ow7QNYIzPlYEVqB8vwW2A570Q5xcTojq0yUU2w519hTXaiSZU-21Lvio3iFomtXQFy-veC0tWWdW",
  LLAMA: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9hcyPmkYp0DTfSWhaFB68gXkT2XQ-rd48_xZBE6qBBQCnT_VllV2Z61gCiRhkurt9qRfiU3YonQX5-Hh_4UnP1997AnSiSu8663f5YWCMLd0s-wXvZc_BD39hXxSrGsEkopePpnV0bqlRr5x2QIoTdytpiXFLOl3bv97O88xmbZK5kscR3fbIksVbuiUkHpI3WzmrVjCpPWajX9Got9f0E0-DpTBtXR7LvGMPozLJihKkfYJImBnLNi_K9Yys5M0MX5xSNHVuq4qd",
  ALPACA: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIPKrQr_xd1CqoT1shC6BRaru38Z9v8398M3zP_mIosL9djiaSiifFLTBXaDFVyx4PnyIJrs5iKkVzQfU5rvwhhhMZ1Zy0jY07HXXkqwhNs408tQGD2Mo_LSE7crkt6V2S4QMm9GFkKj-WkVP1qRWQR4VzyWhLqvXDtZvqFyK1K4GJBDYd6GUU-uoxxdvfnjROAkBxbHqklRepeO8WxnH3AKnMig96XG4P3PsFNqmuqvpF5xQ08pVFPfWAy65ZF4YW5ZEl7E6nN_Ch",
  CAPYBARA: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5GYG4JKTPveQSwvMQJjZoBjc_hQL9e72F-FbifZNF6bjDQSJVbrvUVrW5nqFdzJmwMn0kGWxPI7074zQnXK4HOdOig6za-m05q8WMXXfHNP5SqQFEq3Dk9AkX_xUmAOHEGJFYR6WAiormdBGXr3T2pP6Aq7B1O2_HklRmDLYwsqStgGA7oJzWfAAjMXw8GQL2ehdaVAS_uSwauiGHYuZys37BZLqjw33U2UYRU0fQkddVy4wvavVhjgRJfoj3Ce76c8q0A7n5ifjW",
  HIPPO: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqxo00Zg5HjHuHDbmF6oIB5_600qxwi7P-QnDmhsn4EFPKNwQ9Iya-gf90BRnuM6N55U3DqNZ9BZwiFhiO4UexJhVUInqvUw6ol5Kma_XcR3T-kbdRfYAZ_eNVNqX2QYFeEHV9hQTwo6K0yWAmahUCgzQbp4SB5WX5otrY2WMoM5TLZ5-tANrsVyfXw_geadzvmd3qpcrBDbnL_qfKVdn4njlr1U_Jghcb8srgYdqhXil2GY6kiW9D0JmhpAD3hL-VozrH7lquE1kk",
  ELEPHANT: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMUAfFtgseFBdIKGYuXn7MSyIXh2rzqqO1JAAoq3aUBb8dbuB7dKdfP9M4BZCQlVnj0RBCPNFV3Feg5UONqYlsXabN-_wVjCCZl2TdA2OcdJ5Rhmd4L9fG18zyVoljL2pCYDA4hpF5Kdeg0jkrLI5_EyS3SpONC9Okp19NmfqAXrLtshfMNFeFNwCRydi9z1vSAg2EucUFaW1zBvBi7nwWgOEoOFegE08TSkkbEIoUIuGY3NaDWWCg9la8ZaC4s2WQcq0Mhuw3wVHb",
  SLOTH: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1nhHPfI4DSY_qMJCClO0jJBVnWGP3A12zRbLFcRcSrfa6xLJMhUZgPr9PSLLv9aTWS66DFXGN4VX7M-7hTp2ENlPd8d0rvqroRmuwVVjRKOx1D3aL3fSYseuyiGjcnGYIaMmZrQYqKldF6P3lOubU9F12695g1WbwSW2d88LmhI73OjdwAmM_zyizaCCUCQOMLBT4e8tbpdJbSBEgqNXgrloGC-kk7FBf9ekJDRsUX_v-9K3dS5mpMI9wjrCS1sHE19lj0aMGnn12"
};

export const CHARACTERS: Character[] = [
  {
    id: '1',
    name: 'Lulu',
    description: 'Loves sparkling water and afternoon naps.',
    level: 5,
    progress: 85,
    image: MASCOTS.LLAMA,
    isUnlocked: true,
    color: 'bg-secondary-fixed'
  },
  {
    id: '2',
    name: 'Pip',
    description: 'Just joined the squad! Needs more hydration to grow.',
    level: 1,
    progress: 20,
    image: MASCOTS.ALPACA,
    isUnlocked: true,
    color: 'bg-primary-container'
  },
  {
    id: '3',
    name: 'Barnaby',
    description: 'The chillest pal around. Unlocks at Milestone 3.',
    level: 0,
    progress: 68,
    image: MASCOTS.CAPYBARA,
    isUnlocked: false,
    unlockCondition: 'Drink 50 more glasses',
    color: 'bg-tertiary-container'
  },
  {
    id: '4',
    name: 'Hugo',
    description: 'Loves mud baths and staying cool in the water.',
    level: 3,
    progress: 45,
    image: MASCOTS.HIPPO,
    isUnlocked: true,
    color: 'bg-primary-container'
  },
  {
    id: '5',
    name: 'Elly',
    description: 'Never forgets a glass of water! Sprinkles joy everywhere.',
    level: 0,
    progress: 10,
    image: MASCOTS.ELEPHANT,
    isUnlocked: false,
    unlockCondition: 'Drink 100 more glasses',
    color: 'bg-secondary-container'
  },
  {
    id: '6',
    name: 'Sid',
    description: 'Taking it slow, one sip at a time.',
    level: 1,
    progress: 12,
    image: MASCOTS.SLOTH,
    isUnlocked: true,
    color: 'bg-tertiary-container'
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
  { name: 'Milk', description: 'Strong Bones', amount: 200, icon: 'Baby', color: 'tertiary-container' },
  { name: 'Fruit Juice', description: 'Sweet & Fruity', amount: 200, icon: 'Citrus', color: 'secondary-container' },
  { name: 'Fruit Water', description: 'Yummy Berry', amount: 250, icon: 'Apple', color: 'surface-container' },
  { name: 'Smoothie', description: 'Thick & Nutritious', amount: 300, icon: 'GlassWater', color: 'primary-fixed' },
];

export const AGE_BANDS = [
  { id: '1-3', label: '1-3 years', description: 'approx 960ml, 4 cups', target: 960 },
  { id: '4-8', label: '4-8 years', description: 'approx 1200ml, 5 cups', target: 1200 },
  { id: '9-13', label: '9-13 years', description: 'approx 1600-2000ml, 6-8 cups', target: 1800 },
  { id: '14-18', label: '14-18 years', description: 'approx 1.9-2.6l, 8-11 cups', target: 2250 },
];
