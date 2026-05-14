/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Plus, Coffee, Droplets, Soup, CupSoda, GlassWater, PlusCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { DRINK_OPTIONS } from '../constants';

const ICON_MAP: Record<string, any> = {
  Water: Droplets,
  Coffee: Coffee,
  Soup: Soup,
  CupSoda: CupSoda,
  GlassWater: GlassWater
};

const COLOR_MAP: Record<string, string> = {
  'primary-container': 'bg-primary-container',
  'tertiary-container': 'bg-tertiary-container',
  'secondary-container': 'bg-secondary-container',
  'surface-container': 'bg-surface-container',
  'primary-fixed': 'bg-primary-fixed',
};

interface DrinksProps {
  onAddDrink: (name: string, amount: number, type: string) => void;
}

export default function Drinks({ onAddDrink }: DrinksProps) {
  return (
    <div className="space-y-12">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-on-background mb-4">Drinks Menu</h1>
        <p className="text-lg text-on-surface-variant font-medium">
          Select a delightful beverage to add to your daily hydration goal. Every drop counts towards keeping your AquaPals happy!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {DRINK_OPTIONS.map((drink, idx) => {
          const Icon = ICON_MAP[drink.icon] || Droplets;
          const bgClass = COLOR_MAP[drink.color] || 'bg-primary-container';
          // Determine type based on icon/name
          const type = drink.name === 'Water' ? 'Water' : (drink.name === 'Juice' ? 'Juice' : 'Other');
          
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => onAddDrink(drink.name, drink.amount, type)}
              className={`${bgClass} relative rounded-[2rem] p-8 flex flex-col items-center justify-center text-center aspect-square shadow-cloud cursor-pointer overflow-hidden border-2 border-white/40 group`}
            >
              <div className="w-20 h-20 mb-4 flex items-center justify-center bg-white/30 rounded-full text-current transition-transform group-hover:scale-110">
                <Icon size={40} className="fill-current" />
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-1">{drink.name}</h3>
              <p className="text-sm font-medium opacity-80 mb-6">{drink.description}</p>
              
              <button className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white text-on-surface flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all">
                <Plus size={24} />
              </button>
            </motion.div>
          );
        })}

        {/* Custom Card */}
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          className="bg-surface group relative rounded-[2rem] p-8 flex flex-col items-center justify-center text-center aspect-square shadow-cloud border-2 border-dashed border-outline-variant cursor-pointer"
        >
          <div className="w-20 h-20 mb-4 flex items-center justify-center bg-surface-container rounded-full text-secondary transition-transform group-hover:scale-110">
            <PlusCircle size={40} />
          </div>
          <h3 className="text-2xl font-bold text-on-surface mb-1">Custom Drink</h3>
          <p className="text-sm font-medium text-on-surface-variant opacity-80">Create your own special blend</p>
        </motion.div>
      </div>
    </div>
  );
}
