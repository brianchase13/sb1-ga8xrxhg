import React, { useState } from 'react';
import { X, Info, TrendingUp, Calculator, AlertTriangle, DollarSign } from 'lucide-react';
import { calculateKellyCriterion, calculateImpliedProbability } from '../../utils/bettingCalculations';

interface BetSizingCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  currentBankroll: number;
}

const BetSizingCalculator: React.FC<BetSizingCalculatorProps> = ({
  isOpen,
  onClose,
  currentBankroll,
}) => {
  const [odds, setOdds] = useState(-110);
  const [trueWinProb, setTrueWinProb] = useState(55);
  const [kellyFraction, setKellyFraction] = useState(0.25);

  if (!isOpen) return null;

  const impliedProb = calculateImpliedProbability(odds);
  const edge = trueWinProb - impliedProb;
  const hasEdge = edge > 0;

  const fullKelly = calculateKellyCriterion(odds, trueWinProb / 100, currentBankroll, 1);
  const fractionalKelly = calculateKellyCriterion(
    odds,
    trueWinProb / 100,
    currentBankroll,
    kellyFraction
  );
  const kellyPercent = (fractionalKelly / currentBankroll) * 100;

  // Risk of Ruin approximation
  const winRate = trueWinProb / 100;
  const avgWin = Math.abs(odds) > 100 ? odds / 100 : 100 / Math.abs(odds);
  const avgLoss = 1;
  const riskOfRuin =
    winRate === 0.5
      ? 50
      : Math.pow((1 - winRate) / winRate, currentBankroll / (avgWin * winRate - avgLoss * (1 - winRate))) * 100;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-dark-900 border border-dark-700 rounded-2xl shadow-2xl max-w-2xl w-full animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-dark-900 border-b border-dark-800 p-6 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-gradient rounded-lg">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-dark-100">Kelly Criterion Calculator</h2>
                <p className="text-xs text-dark-400 mt-0.5">
                  Optimal bet sizing based on your edge
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-dark-800 rounded-lg transition-colors">
              <X className="h-5 w-5 text-dark-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Warning Box */}
          <div className="bg-gold-900/20 border border-gold-700/50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-gold-400 mb-1">
                  Professional Risk Management
                </h3>
                <p className="text-xs text-dark-300">
                  Kelly Criterion assumes you know your true win probability. Overestimating leads to
                  overbetting and potential bankroll destruction. Use fractional Kelly (25% recommended)
                  for protection against estimation errors.
                </p>
              </div>
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Odds (American)
              </label>
              <input
                type="number"
                value={odds}
                onChange={(e) => setOdds(Number(e.target.value))}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Your True Win Probability (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={trueWinProb}
                  onChange={(e) => setTrueWinProb(Math.min(100, Math.max(0, Number(e.target.value))))}
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
                <input
                  type="range"
                  value={trueWinProb}
                  onChange={(e) => setTrueWinProb(Number(e.target.value))}
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full mt-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Kelly Fraction (Risk Tolerance)
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {[0.1, 0.25, 0.5, 1].map((fraction) => (
                  <button
                    key={fraction}
                    onClick={() => setKellyFraction(fraction)}
                    className={`py-2 rounded-lg text-sm font-medium transition-all ${
                      kellyFraction === fraction
                        ? 'bg-primary-500 text-white'
                        : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                    }`}
                  >
                    {fraction === 1 ? 'Full' : `${fraction * 100}%`}
                  </button>
                ))}
              </div>
              <input
                type="range"
                value={kellyFraction}
                onChange={(e) => setKellyFraction(Number(e.target.value))}
                min="0.1"
                max="1"
                step="0.05"
                className="w-full"
              />
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {/* Edge Analysis */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
              <h3 className="text-sm font-bold text-dark-200 mb-3 flex items-center space-x-2">
                <Info className="h-4 w-4 text-primary-400" />
                <span>Edge Analysis</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-dark-500 mb-1">Implied Probability</div>
                  <div className="text-lg font-bold text-dark-200">{impliedProb.toFixed(2)}%</div>
                </div>
                <div>
                  <div className="text-xs text-dark-500 mb-1">Your Edge</div>
                  <div
                    className={`text-lg font-bold ${hasEdge ? 'text-primary-400' : 'text-accent-400'}`}
                  >
                    {edge > 0 ? '+' : ''}
                    {edge.toFixed(2)}%
                  </div>
                </div>
              </div>

              {!hasEdge && (
                <div className="mt-3 p-3 bg-accent-900/20 border border-accent-800/50 rounded-lg">
                  <p className="text-xs text-accent-400 font-medium">
                    ⚠️ No Edge Detected: Your true win probability is not higher than the implied
                    probability. Kelly Criterion recommends $0 stake. This is not a +EV bet.
                  </p>
                </div>
              )}
            </div>

            {/* Recommended Stake */}
            {hasEdge && (
              <div className="bg-primary-900/20 border border-primary-800/50 rounded-xl p-4">
                <h3 className="text-sm font-bold text-primary-400 mb-3">
                  Recommended Stake ({kellyFraction === 1 ? 'Full' : 'Fractional'} Kelly)
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-dark-400">Current Bankroll</span>
                    <span className="text-sm font-bold text-dark-200">
                      ${currentBankroll.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-dark-400">Recommended Stake</span>
                    <span className="text-2xl font-bold text-primary-400">
                      ${fractionalKelly.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-dark-400">Percentage of Bankroll</span>
                    <span className="text-sm font-bold text-primary-400">
                      {kellyPercent.toFixed(2)}%
                    </span>
                  </div>
                  {kellyFraction < 1 && (
                    <div className="flex items-center justify-between text-xs text-dark-500 pt-2 border-t border-dark-800">
                      <span>Full Kelly would be</span>
                      <span className="font-medium">${fullKelly.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Risk Metrics */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
              <h3 className="text-sm font-bold text-dark-200 mb-3">Risk Metrics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-dark-400">Risk of Ruin</span>
                    <div className="group relative">
                      <Info className="h-3 w-3 text-dark-500 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-dark-800 border border-dark-700 rounded-lg text-xs text-dark-300 hidden group-hover:block z-50">
                        Probability of losing entire bankroll given current strategy
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-accent-400">
                    {riskOfRuin.toFixed(2)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-dark-400">Units Risked</span>
                  <span className="text-sm font-bold text-dark-200">
                    {(fractionalKelly / 100).toFixed(2)} U
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Formula Explanation */}
          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
            <h3 className="text-sm font-bold text-dark-200 mb-2 flex items-center space-x-2">
              <Calculator className="h-4 w-4 text-primary-400" />
              <span>Kelly Formula</span>
            </h3>
            <div className="text-xs text-dark-400 space-y-1 font-mono">
              <div>f* = (bp - q) / b</div>
              <div className="text-[10px] space-y-0.5 mt-2 text-dark-500">
                <div>where:</div>
                <div>f* = fraction of bankroll to wager</div>
                <div>b = decimal odds -1 (net odds received)</div>
                <div>p = probability of winning (your true edge)</div>
                <div>q = probability of losing (1 - p)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-dark-900 border-t border-dark-800 p-6">
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary-gradient rounded-lg font-bold text-white hover:shadow-glow-green transition-all"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetSizingCalculator;
