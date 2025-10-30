import React, { useState } from 'react';
import { X, TrendingUp, Calculator, Sparkles } from 'lucide-react';
import { formatOdds, calculatePotentialWin, calculateImpliedProbability } from '../../utils/bettingCalculations';

interface QuickBetModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledEvent?: string;
  prefilledPick?: string;
  prefilledOdds?: number;
}

const QuickBetModal: React.FC<QuickBetModalProps> = ({
  isOpen,
  onClose,
  prefilledEvent = '',
  prefilledPick = '',
  prefilledOdds = -110,
}) => {
  const [event, setEvent] = useState(prefilledEvent);
  const [pick, setPick] = useState(prefilledPick);
  const [odds, setOdds] = useState(prefilledOdds);
  const [stake, setStake] = useState(100);
  const [sportsbook, setSportsbook] = useState('FanDuel');

  if (!isOpen) return null;

  const potentialWin = calculatePotentialWin(stake, odds);
  const profit = potentialWin - stake;
  const impliedProb = calculateImpliedProbability(odds);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-dark-900 border border-dark-700 rounded-2xl shadow-2xl max-w-lg w-full animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gold-gradient rounded-lg">
              <TrendingUp className="h-5 w-5 text-dark-900" />
            </div>
            <h2 className="text-xl font-bold text-dark-100">Quick Bet Entry</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-dark-400" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          {/* Event */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Event
            </label>
            <input
              type="text"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              placeholder="e.g., Chiefs @ Bills"
              className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Pick */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Your Pick
            </label>
            <input
              type="text"
              value={pick}
              onChange={(e) => setPick(e.target.value)}
              placeholder="e.g., Chiefs -2.5"
              className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Odds & Stake */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Odds
              </label>
              <input
                type="number"
                value={odds}
                onChange={(e) => setOdds(Number(e.target.value))}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Stake ($)
              </label>
              <input
                type="number"
                value={stake}
                onChange={(e) => setStake(Number(e.target.value))}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Sportsbook */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Sportsbook
            </label>
            <select
              value={sportsbook}
              onChange={(e) => setSportsbook(e.target.value)}
              className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            >
              <option>FanDuel</option>
              <option>DraftKings</option>
              <option>BetMGM</option>
              <option>Caesars</option>
              <option>BetRivers</option>
            </select>
          </div>

          {/* Calculation Summary */}
          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4 space-y-3">
            <div className="flex items-center space-x-2 mb-2">
              <Calculator className="h-4 w-4 text-primary-400" />
              <span className="text-sm font-bold text-dark-300">Bet Summary</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-dark-500 mb-1">To Win</div>
                <div className="text-lg font-bold text-primary-400">
                  ${profit.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-xs text-dark-500 mb-1">Total Payout</div>
                <div className="text-lg font-bold text-gold-400">
                  ${potentialWin.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-xs text-dark-500 mb-1">Implied Prob.</div>
                <div className="text-sm font-bold text-dark-200">
                  {impliedProb.toFixed(1)}%
                </div>
              </div>
              <div>
                <div className="text-xs text-dark-500 mb-1">Odds</div>
                <div className="text-sm font-bold text-dark-200">
                  {formatOdds(odds)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3 p-6 border-t border-dark-800">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-lg font-medium text-dark-200 transition-all"
          >
            Cancel
          </button>
          <button
            className="flex-1 px-6 py-3 bg-gold-gradient rounded-lg font-bold text-dark-900 hover:shadow-glow-gold transition-all hover:scale-105"
          >
            Add Bet
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickBetModal;
