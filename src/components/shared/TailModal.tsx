import React, { useState } from 'react';
import { X, Users, TrendingUp, DollarSign, AlertTriangle, Check, Copy } from 'lucide-react';
import type { User } from '../../types';
import { useToast } from './Toast';

interface TailModalProps {
  isOpen: boolean;
  onClose: () => void;
  expert: User;
}

const TailModal: React.FC<TailModalProps> = ({ isOpen, onClose, expert }) => {
  const [tailAmount, setTailAmount] = useState(100);
  const [tailPercentage, setTailPercentage] = useState(10);
  const [tailMode, setTailMode] = useState<'fixed' | 'percentage'>('percentage');
  const [autoConfirm, setAutoConfirm] = useState(false);
  const [sportFilters, setSportFilters] = useState<string[]>([]);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const estimatedBetsPerWeek = 15;
  const avgBetSize = tailMode === 'fixed' ? tailAmount : (5000 * (tailPercentage / 100));
  const weeklyExposure = estimatedBetsPerWeek * avgBetSize;

  const handleStartTailing = () => {
    showToast('success', 'Tailing Started!', `You're now tailing ${expert.displayName}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-dark-900 border border-dark-700 rounded-2xl shadow-2xl max-w-2xl w-full animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-dark-900 border-b border-dark-800 p-6 z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={expert.avatar}
                  alt={expert.displayName}
                  className="h-12 w-12 rounded-lg"
                />
                {expert.isExpert && (
                  <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-gold-500 rounded-full flex items-center justify-center border-2 border-dark-900">
                    <Check className="h-3 w-3 text-dark-900" />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-dark-100">Tail {expert.displayName}</h2>
                <p className="text-xs text-dark-400 mt-0.5">
                  Automatically copy their bets
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-dark-800 rounded-lg transition-colors">
              <X className="h-5 w-5 text-dark-400" />
            </button>
          </div>

          {/* Expert Stats Quick View */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-primary-900/20 border border-primary-800/30 rounded-lg p-3 text-center">
              <div className="text-xs text-dark-400 mb-1">ROI</div>
              <div className="text-lg font-bold text-primary-400">+{expert.stats.roi}%</div>
            </div>
            <div className="bg-primary-900/20 border border-primary-800/30 rounded-lg p-3 text-center">
              <div className="text-xs text-dark-400 mb-1">Win Rate</div>
              <div className="text-lg font-bold text-primary-400">{expert.stats.winRate}%</div>
            </div>
            <div className="bg-gold-900/20 border border-gold-800/30 rounded-lg p-3 text-center">
              <div className="text-xs text-dark-400 mb-1">Streak</div>
              <div className="text-lg font-bold text-gold-400">
                {expert.stats.currentStreak.count}{expert.stats.currentStreak.type === 'win' ? 'W' : 'L'}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Warning */}
          <div className="bg-gold-900/20 border border-gold-700/50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-gold-400 mb-1">Understand the Risks</h3>
                <ul className="text-xs text-dark-300 space-y-1">
                  <li>• Past performance does not guarantee future results</li>
                  <li>• You are responsible for all bets placed via tailing</li>
                  <li>• Variance can cause losing streaks even for winning bettors</li>
                  <li>• Set appropriate limits to protect your bankroll</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tail Mode Selection */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-3">
              Tail Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTailMode('percentage')}
                className={`p-4 rounded-lg border transition-all ${
                  tailMode === 'percentage'
                    ? 'bg-primary-900/40 border-primary-700/50 text-primary-400'
                    : 'bg-dark-800/50 border-dark-700 text-dark-300 hover:bg-dark-800'
                }`}
              >
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm font-bold mb-1">Percentage</div>
                <div className="text-xs opacity-80">Match their unit %</div>
              </button>
              <button
                onClick={() => setTailMode('fixed')}
                className={`p-4 rounded-lg border transition-all ${
                  tailMode === 'fixed'
                    ? 'bg-primary-900/40 border-primary-700/50 text-primary-400'
                    : 'bg-dark-800/50 border-dark-700 text-dark-300 hover:bg-dark-800'
                }`}
              >
                <div className="text-2xl mb-2">💵</div>
                <div className="text-sm font-bold mb-1">Fixed Amount</div>
                <div className="text-xs opacity-80">Same $ every bet</div>
              </button>
            </div>
          </div>

          {/* Amount/Percentage Input */}
          {tailMode === 'percentage' ? (
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Percentage of Your Bankroll
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={tailPercentage}
                  onChange={(e) => setTailPercentage(Number(e.target.value))}
                  className="flex-1"
                />
                <div className="text-2xl font-bold text-primary-400 w-20 text-right">
                  {tailPercentage}%
                </div>
              </div>
              <p className="text-xs text-dark-500 mt-2">
                If they bet 2 units, you'll bet {tailPercentage}% × 2 = {(tailPercentage * 2).toFixed(1)}% of your bankroll
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Fixed Amount Per Bet
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-400" />
                <input
                  type="number"
                  value={tailAmount}
                  onChange={(e) => setTailAmount(Number(e.target.value))}
                  min="10"
                  step="10"
                  className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
              </div>
            </div>
          )}

          {/* Sport Filters */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Sport Filters (Optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {['NFL', 'NBA', 'MLB', 'NHL', 'Soccer'].map((sport) => (
                <button
                  key={sport}
                  onClick={() =>
                    setSportFilters((prev) =>
                      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
                    )
                  }
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    sportFilters.includes(sport)
                      ? 'bg-primary-500 text-white'
                      : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
            <p className="text-xs text-dark-500 mt-2">
              {sportFilters.length === 0
                ? 'Tail all sports'
                : `Only tail ${sportFilters.join(', ')} bets`}
            </p>
          </div>

          {/* Auto-Confirm */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="autoConfirm"
              checked={autoConfirm}
              onChange={(e) => setAutoConfirm(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-dark-600 bg-dark-800 text-primary-500 focus:ring-primary-500"
            />
            <label htmlFor="autoConfirm" className="flex-1">
              <div className="text-sm font-medium text-dark-200">Auto-confirm bets</div>
              <div className="text-xs text-dark-500 mt-1">
                Automatically place bets without manual confirmation. Not recommended for beginners.
              </div>
            </label>
          </div>

          {/* Estimated Exposure */}
          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
            <h3 className="text-sm font-bold text-dark-200 mb-3 flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-primary-400" />
              <span>Estimated Weekly Exposure</span>
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-dark-400">Avg Bets/Week:</span>
                <span className="text-dark-200 font-medium">~{estimatedBetsPerWeek}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-400">Avg Bet Size:</span>
                <span className="text-dark-200 font-medium">${avgBetSize.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-dark-800">
                <span className="text-dark-300 font-medium">Weekly Exposure:</span>
                <span className="text-primary-400 font-bold">${weeklyExposure.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-dark-900 border-t border-dark-800 p-6 space-y-3">
          <button
            onClick={handleStartTailing}
            className="w-full py-3 bg-primary-gradient rounded-lg font-bold text-white hover:shadow-glow-green transition-all hover:scale-105"
          >
            Start Tailing {expert.displayName}
          </button>
          <p className="text-xs text-dark-500 text-center">
            You can modify or stop tailing anytime in Settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default TailModal;
