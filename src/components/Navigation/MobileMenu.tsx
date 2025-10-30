import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import NavLink from './NavLink';
import {
  LayoutDashboard,
  TrendingUp,
  LineChart,
  Users,
  Scale,
  Sparkles,
  Wallet,
  Link as LinkIcon
} from 'lucide-react';

const navigationItems = [
  { href: '/', icon: LayoutDashboard, text: 'Dashboard' },
  { href: '/bets', icon: TrendingUp, text: 'My Bets' },
  { href: '/odds', icon: Scale, text: 'Line Shopping' },
  { href: '/analytics', icon: LineChart, text: 'Analytics' },
  { href: '/social', icon: Users, text: 'Social Feed' },
  { href: '/ai-picks', icon: Sparkles, text: 'AI Picks' },
  { href: '/bankroll', icon: Wallet, text: 'Bankroll' },
  { href: '/sportsbooks', icon: LinkIcon, text: 'Sportsbooks' },
];

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors border border-dark-700"
      >
        {isOpen ? (
          <X className="h-5 w-5 text-dark-300" />
        ) : (
          <Menu className="h-5 w-5 text-dark-300" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-40 md:hidden animate-fade-in"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="fixed top-16 left-0 right-0 bottom-0 bg-dark-900 border-t border-dark-800 z-50 overflow-y-auto md:hidden animate-slide-down">
            <nav className="p-4 space-y-1">
              {navigationItems.map((item) => (
                <div key={item.text} onClick={() => setIsOpen(false)}>
                  <NavLink
                    href={item.href}
                    icon={item.icon}
                    text={item.text}
                  />
                </div>
              ))}
            </nav>

            {/* Quick Stats in Mobile Menu */}
            <div className="p-4 border-t border-dark-800">
              <div className="text-xs font-semibold text-dark-400 mb-3">QUICK STATS</div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-dark-300">Win Rate</span>
                  <span className="text-sm font-bold text-primary-400">58.3%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-dark-300">Streak</span>
                  <span className="text-sm font-bold text-primary-400">3W</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-dark-300">Pending</span>
                  <span className="text-sm font-bold text-gold-400">4 bets</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenu;
