import React from 'react';
import { TrendingUp, Search, Bell, User } from 'lucide-react';
import { mockCurrentUser } from '../../utils/mockData';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-lg border-b border-dark-800">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <MobileMenu />
            <div className="flex items-center space-x-2 group cursor-pointer">
              <div className="bg-gold-gradient p-2 rounded-xl shadow-glow-gold transition-transform group-hover:scale-105">
                <TrendingUp className="h-6 w-6 text-dark-900" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
                  SharpBet
                </span>
                <div className="text-[10px] text-primary-400 font-semibold tracking-wider -mt-1">
                  PRO
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-400" />
              <input
                type="text"
                placeholder="Search games, teams, or players..."
                className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Bankroll Display */}
            <div className="hidden sm:flex items-center space-x-3 bg-dark-800 px-4 py-2 rounded-lg border border-dark-700">
              <div className="text-right">
                <div className="text-xs text-dark-400">Bankroll</div>
                <div className="text-sm font-bold text-primary-400">
                  ${mockCurrentUser.stats.currentBalance.toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-dark-400">ROI</div>
                <div className="text-sm font-bold text-gold-400">
                  +{mockCurrentUser.stats.roi}%
                </div>
              </div>
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors border border-dark-700">
              <Bell className="h-5 w-5 text-dark-300" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-accent-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <button className="flex items-center space-x-2 p-1 pr-3 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors border border-dark-700">
              <div className="relative">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-gold-500 flex items-center justify-center">
                  <User className="h-5 w-5 text-dark-900" />
                </div>
                {mockCurrentUser.isVerified && (
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-gold-500 rounded-full flex items-center justify-center border-2 border-dark-900">
                    <svg className="h-2.5 w-2.5 text-dark-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <span className="hidden md:block text-sm font-medium text-dark-200">
                {mockCurrentUser.displayName}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;