/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Bell, Droplet } from 'lucide-react';

export default function TopNav() {
  return (
    <header className="w-full h-20 bg-background flex justify-between items-center px-6 md:px-12 sticky top-0 z-40 backdrop-blur-md bg-white/70">
      <div className="text-3xl font-bold text-primary tracking-tight md:hidden">
        Thirsty Creatures
      </div>
      <div className="hidden md:flex gap-6">
        <a href="#" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">Help</a>
        <a href="#" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">Community</a>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-primary hover:text-primary-container p-2 rounded-full hover:bg-surface-variant/30 transition-all scale-95 active:scale-90">
          <Bell size={20} />
        </button>
        <button className="text-primary hover:text-primary-container p-2 rounded-full bg-primary-container/30 transition-all scale-95 active:scale-90">
          <Droplet size={20} className="fill-current" />
        </button>
      </div>
    </header>
  );
}
