import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  LineChart,
  Users,
  Scale,
  Sparkles,
  Wallet,
  Link as LinkIcon,
  UserPlus,
  Crown
} from 'lucide-react';
import NavLink from './NavLink';

const navigationItems = [
  { href: '/', icon: LayoutDashboard, text: 'Dashboard' },
  { href: '/bets', icon: TrendingUp, text: 'My Bets' },
  { href: '/odds', icon: Scale, text: 'Line Shopping' },
  { href: '/analytics', icon: LineChart, text: 'Analytics' },
  { href: '/social', icon: Users, text: 'Social Feed' },
  { href: '/friends', icon: UserPlus, text: 'Friends' },
  { href: '/ai-picks', icon: Sparkles, text: 'AI Picks' },
  { href: '/earnings', icon: Crown, text: 'Expert Earnings', badge: 'PRO' },
  { href: '/bankroll', icon: Wallet, text: 'Bankroll' },
  { href: '/sportsbooks', icon: LinkIcon, text: 'Sportsbooks' },
] as const;

const Sidebar: React.FC = () => {
  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-dark-900 border-r border-dark-800 overflow-y-auto hidden md:block">
      <nav className="p-4 space-y-1">
        {navigationItems.map((item) => (
          <NavLink
            key={item.text}
            href={item.href}
            icon={item.icon}
            text={item.text}
            badge={item.badge}
          />
        ))}
      </nav>

      {/* Quick Stats in Sidebar */}
      <div className="p-4 mt-6 border-t border-dark-800">
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

      {/* Upgrade Banner */}
      <div className="m-4 p-4 bg-gradient-to-br from-primary-900/40 to-gold-900/40 rounded-lg border border-primary-700/30">
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles className="h-4 w-4 text-gold-400" />
          <span className="text-xs font-bold text-gold-400">PRO FEATURES</span>
        </div>
        <p className="text-xs text-dark-300 mb-3">
          Unlock AI predictions, arbitrage alerts, and advanced analytics
        </p>
        <button className="w-full py-2 bg-gold-gradient rounded-lg text-xs font-bold text-dark-900 hover:shadow-glow-gold transition-all">
          Upgrade Now
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;