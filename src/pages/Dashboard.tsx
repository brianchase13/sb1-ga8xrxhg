import React from 'react';
import {
  Wallet,
  TrendingUp,
  Target,
  Flame,
  AlertCircle,
  Zap,
  ArrowRight,
  Sparkles,
  Scale,
} from 'lucide-react';
import StatsCard from '../components/shared/StatsCard';
import BetCard from '../components/shared/BetCard';
import {
  mockCurrentUser,
  mockBets,
  mockArbitrageOpportunities,
  mockInsights,
  mockOddsComparisons,
  mockAIRecommendations,
} from '../utils/mockData';
import { formatCurrency, formatOdds, formatPercentage } from '../utils/bettingCalculations';

function Dashboard() {
  const stats = mockCurrentUser.stats;
  const pendingBets = mockBets.filter((bet) => bet.status === 'pending');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-900/40 via-dark-800 to-gold-900/40 rounded-xl border border-primary-800/30 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-dark-100 mb-1">
              Welcome back, {mockCurrentUser.displayName}!
            </h1>
            <p className="text-dark-400">
              You're on a {stats.currentStreak.count} bet {stats.currentStreak.type} streak{' '}
              <Flame className="inline h-4 w-4 text-gold-400" />
            </p>
          </div>
          <button className="px-6 py-3 bg-gold-gradient rounded-lg font-bold text-dark-900 hover:shadow-glow-gold transition-all hover:scale-105">
            Place New Bet
          </button>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Bankroll"
          value={formatCurrency(stats.currentBalance)}
          subtitle={`${formatPercentage(
            ((stats.currentBalance - stats.startingBankroll) / stats.startingBankroll) * 100
          )} total`}
          icon={Wallet}
          variant="gold"
          trend={{ value: 15.2, isPositive: true }}
        />
        <StatsCard
          title="ROI"
          value={`${stats.roi}%`}
          subtitle={`Net: ${formatCurrency(stats.netProfit)}`}
          icon={TrendingUp}
          variant="success"
          trend={{ value: 3.1, isPositive: true }}
        />
        <StatsCard
          title="Win Rate"
          value={`${stats.winRate}%`}
          subtitle={`${stats.longestWinStreak}W streak record`}
          icon={Target}
          variant="default"
        />
        <StatsCard
          title="Pending Bets"
          value={pendingBets.length}
          subtitle={formatCurrency(
            pendingBets.reduce((sum, bet) => sum + bet.potentialWin, 0)
          ) + ' potential'}
          icon={Flame}
          variant="warning"
        />
      </div>

      {/* Arbitrage Opportunities - HIGH PRIORITY */}
      {mockArbitrageOpportunities.length > 0 && (
        <div className="bg-gold-900/20 border border-gold-700/50 rounded-xl p-5 animate-pulse-slow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-gold-400" />
              <h2 className="text-lg font-bold text-gold-400">Arbitrage Opportunities</h2>
              <span className="px-2 py-1 bg-gold-500 text-dark-900 text-xs font-bold rounded">
                {mockArbitrageOpportunities.length} LIVE
              </span>
            </div>
            <button className="text-sm text-gold-400 hover:text-gold-300 font-medium">
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockArbitrageOpportunities.slice(0, 2).map((arb) => (
              <div
                key={arb.id}
                className="bg-dark-900/50 rounded-lg p-4 border border-gold-800/30"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs text-dark-400 uppercase mb-1">{arb.sportType}</div>
                    <h3 className="text-sm font-bold text-dark-100">{arb.event}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-dark-400">Profit</div>
                    <div className="text-lg font-bold text-gold-400">+{arb.profit}%</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {arb.bets.map((bet, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs bg-dark-800/50 rounded p-2"
                    >
                      <span className="text-dark-300">{bet.sportsbook}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-dark-200 font-medium">{bet.pick}</span>
                        <span className="text-gold-400">{formatOdds(bet.odds)}</span>
                        <span className="text-dark-400">{formatCurrency(bet.stake)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-3 py-2 bg-gold-gradient rounded-lg text-sm font-bold text-dark-900 hover:shadow-glow-gold transition-all">
                  Execute Arb
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Recommendations */}
      {mockAIRecommendations.length > 0 && (
        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary-400" />
              <h2 className="text-lg font-bold text-dark-100">AI-Powered Picks</h2>
            </div>
            <button className="text-sm text-primary-400 hover:text-primary-300 font-medium">
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockAIRecommendations.map((rec) => (
              <div
                key={rec.id}
                className="bg-dark-900/50 rounded-lg p-4 border border-primary-800/30 hover:border-primary-700/50 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs text-dark-400 uppercase mb-1">{rec.sportType}</div>
                    <h3 className="text-sm font-bold text-dark-100 mb-1">{rec.event}</h3>
                    <p className="text-xs text-primary-400 font-medium">{rec.pick}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-dark-400">Confidence</div>
                    <div className="flex items-center space-x-1">
                      <div className="text-lg font-bold text-primary-400">{rec.confidence}%</div>
                      <div className="h-2 w-12 bg-dark-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-400"
                          style={{ width: `${rec.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-dark-300 mb-3">{rec.reasoning}</p>
                <div className="flex items-center justify-between text-xs pt-3 border-t border-dark-800">
                  <span className="text-dark-400">EV: +{rec.expectedValue}%</span>
                  <span className="text-gold-400">{formatOdds(rec.recommendedOdds)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insights */}
      {mockInsights.length > 0 && (
        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
          <h2 className="text-lg font-bold text-dark-100 mb-4">Your Insights</h2>
          <div className="space-y-3">
            {mockInsights.map((insight) => {
              const iconConfig = {
                trend: { icon: TrendingUp, color: 'text-primary-400', bg: 'bg-primary-900/20' },
                warning: { icon: AlertCircle, color: 'text-gold-400', bg: 'bg-gold-900/20' },
                opportunity: { icon: Zap, color: 'text-gold-400', bg: 'bg-gold-900/20' },
                value: { icon: Scale, color: 'text-primary-400', bg: 'bg-primary-900/20' },
              };
              const config = iconConfig[insight.type];
              const InsightIcon = config.icon;

              return (
                <div
                  key={insight.id}
                  className="flex items-start space-x-3 bg-dark-900/50 rounded-lg p-4 hover:bg-dark-900/70 transition-all"
                >
                  <div className={`p-2 rounded-lg ${config.bg}`}>
                    <InsightIcon className={`h-4 w-4 ${config.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-dark-100 mb-1">{insight.title}</h3>
                    <p className="text-xs text-dark-400">{insight.description}</p>
                  </div>
                  {insight.actionable && (
                    <button className="text-xs text-primary-400 hover:text-primary-300 font-medium whitespace-nowrap">
                      Take Action
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Pending Bets */}
      <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-dark-100">Active Bets</h2>
          <button className="text-sm text-primary-400 hover:text-primary-300 font-medium flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingBets.slice(0, 3).map((bet) => (
            <BetCard key={bet.id} bet={bet} />
          ))}
        </div>
      </div>

      {/* Best Odds Today */}
      <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Scale className="h-5 w-5 text-primary-400" />
            <h2 className="text-lg font-bold text-dark-100">Best Lines Today</h2>
          </div>
          <button className="text-sm text-primary-400 hover:text-primary-300 font-medium">
            Line Shopping →
          </button>
        </div>
        <div className="space-y-3">
          {mockOddsComparisons.slice(0, 2).map((odds, idx) => (
            <div key={idx} className="bg-dark-900/50 rounded-lg p-4 border border-dark-800">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-xs text-dark-400 uppercase mb-1">{odds.sportType}</div>
                  <h3 className="text-sm font-bold text-dark-100">{odds.event}</h3>
                </div>
                <div className="text-xs text-dark-400">
                  {new Date(odds.startTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {odds.bestOdds.slice(0, 3).map((best, i) => (
                  <div
                    key={i}
                    className="bg-dark-800/50 rounded p-2 border border-primary-800/30"
                  >
                    <div className="text-[10px] text-dark-500 uppercase mb-1">{best.type}</div>
                    <div className="text-xs text-dark-200 font-medium mb-1">{best.pick}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gold-400 font-bold">
                        {formatOdds(best.odds)}
                      </span>
                      <span className="text-[10px] text-dark-500">{best.sportsbook}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;