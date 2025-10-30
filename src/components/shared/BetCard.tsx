import React from 'react';
import { Clock, Check, X, Minus, TrendingUp, TrendingDown, Share2 } from 'lucide-react';
import type { Bet } from '../../types';
import { formatOdds, formatCurrency } from '../../utils/bettingCalculations';

interface BetCardProps {
  bet: Bet;
  compact?: boolean;
  onShare?: (bet: Bet) => void;
}

const BetCard: React.FC<BetCardProps> = ({ bet, compact = false, onShare }) => {
  const statusConfig = {
    pending: {
      icon: Clock,
      color: 'text-gold-400',
      bg: 'bg-gold-900/20',
      border: 'border-gold-800/50',
      label: 'Pending',
    },
    won: {
      icon: Check,
      color: 'text-primary-400',
      bg: 'bg-primary-900/20',
      border: 'border-primary-800/50',
      label: 'Won',
    },
    lost: {
      icon: X,
      color: 'text-accent-400',
      bg: 'bg-accent-900/20',
      border: 'border-accent-800/50',
      label: 'Lost',
    },
    push: {
      icon: Minus,
      color: 'text-dark-400',
      bg: 'bg-dark-800/50',
      border: 'border-dark-700',
      label: 'Push',
    },
    cancelled: {
      icon: X,
      color: 'text-dark-400',
      bg: 'bg-dark-800/50',
      border: 'border-dark-700',
      label: 'Cancelled',
    },
  };

  const config = statusConfig[bet.status];
  const StatusIcon = config.icon;

  const betTypeLabels: Record<string, string> = {
    moneyline: 'ML',
    spread: 'Spread',
    totals: 'Total',
    parlay: 'Parlay',
    prop: 'Prop',
    futures: 'Future',
  };

  return (
    <div
      className={`rounded-lg border ${config.border} ${config.bg} p-4 transition-all hover:scale-[1.01] cursor-pointer group`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs font-bold text-dark-400 uppercase tracking-wider">
              {bet.sportType}
            </span>
            <span className="text-xs text-dark-600">•</span>
            <span className="text-xs font-medium text-dark-500">{betTypeLabels[bet.betType]}</span>
          </div>
          <h3 className="text-sm font-bold text-dark-100 mb-1">{bet.event}</h3>
          <p className="text-xs text-dark-300">{bet.sportsbook}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-md ${config.bg}`}>
            <StatusIcon className={`h-3 w-3 ${config.color}`} />
            <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
          </div>
          {onShare && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare(bet);
              }}
              className="p-1.5 hover:bg-dark-800 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              title="Share bet"
            >
              <Share2 className="h-4 w-4 text-dark-400 hover:text-primary-400" />
            </button>
          )}
        </div>
      </div>

      {/* Pick and Odds */}
      <div className="bg-dark-900/50 rounded-lg p-3 mb-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-dark-400 mb-0.5">Pick</p>
            <p className="text-sm font-bold text-dark-100">{bet.pick}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-dark-400 mb-0.5">Odds</p>
            <p className="text-lg font-bold text-gold-400">{formatOdds(bet.odds)}</p>
          </div>
        </div>
      </div>

      {/* Parlay Legs */}
      {bet.parlayLegs && bet.parlayLegs.length > 0 && (
        <div className="mb-3 space-y-2">
          {bet.parlayLegs.map((leg) => (
            <div key={leg.id} className="flex items-center justify-between text-xs bg-dark-900/30 rounded p-2">
              <span className="text-dark-300">{leg.event}</span>
              <div className="flex items-center space-x-2">
                <span className="text-dark-200 font-medium">{leg.pick}</span>
                <span className="text-gold-400">{formatOdds(leg.odds)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stake and Potential Win */}
      <div className="flex items-center justify-between text-xs mb-3">
        <div>
          <p className="text-dark-500 mb-0.5">Stake</p>
          <p className="text-dark-200 font-bold">{formatCurrency(bet.stake)}</p>
        </div>
        <div className="text-right">
          <p className="text-dark-500 mb-0.5">To Win</p>
          <p className="text-primary-400 font-bold">{formatCurrency(bet.potentialWin - bet.stake)}</p>
        </div>
        {bet.status === 'won' && (
          <div className="text-right">
            <p className="text-dark-500 mb-0.5">Profit</p>
            <p className="text-primary-400 font-bold">{formatCurrency(bet.potentialWin - bet.stake)}</p>
          </div>
        )}
        {bet.status === 'lost' && (
          <div className="text-right">
            <p className="text-dark-500 mb-0.5">Loss</p>
            <p className="text-accent-400 font-bold">-{formatCurrency(bet.stake)}</p>
          </div>
        )}
      </div>

      {/* CLV Indicator */}
      {bet.clv !== undefined && (
        <div className="flex items-center justify-between pt-3 border-t border-dark-800">
          <div className="flex items-center space-x-1">
            <span className="text-xs text-dark-500">CLV:</span>
            <div className="flex items-center space-x-1">
              {bet.clv > 0 ? (
                <TrendingUp className="h-3 w-3 text-primary-400" />
              ) : (
                <TrendingDown className="h-3 w-3 text-accent-400" />
              )}
              <span
                className={`text-xs font-bold ${
                  bet.clv > 0 ? 'text-primary-400' : 'text-accent-400'
                }`}
              >
                {bet.clv > 0 ? '+' : ''}
                {bet.clv}%
              </span>
            </div>
          </div>
          {bet.notes && (
            <p className="text-xs text-dark-400 italic truncate max-w-[200px]">{bet.notes}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BetCard;