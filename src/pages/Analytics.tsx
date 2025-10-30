import React from 'react';
import { TrendingUp, Target, DollarSign, Percent } from 'lucide-react';
import StatsCard from '../components/shared/StatsCard';
import {
  mockCurrentUser,
  mockPerformanceByType,
  mockPerformanceBySport,
} from '../utils/mockData';
import { formatCurrency } from '../utils/bettingCalculations';

function Analytics() {
  const stats = mockCurrentUser.stats;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-dark-100">Performance Analytics</h1>
        <p className="text-dark-400 mt-1">Deep dive into your betting performance and trends</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Wagered"
          value={formatCurrency(stats.totalWagered)}
          icon={DollarSign}
          variant="default"
        />
        <StatsCard
          title="Net Profit"
          value={formatCurrency(stats.netProfit)}
          icon={TrendingUp}
          variant="success"
        />
        <StatsCard
          title="ROI"
          value={`${stats.roi}%`}
          icon={Percent}
          variant="gold"
        />
        <StatsCard
          title="Win Rate"
          value={`${stats.winRate}%`}
          icon={Target}
          variant="default"
        />
      </div>

      {/* Performance by Bet Type */}
      <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
        <h2 className="text-lg font-bold text-dark-100 mb-4">Performance by Bet Type</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-800">
                <th className="text-left py-3 px-4 text-sm font-bold text-dark-400 uppercase">
                  Type
                </th>
                <th className="text-center py-3 px-4 text-sm font-bold text-dark-400 uppercase">
                  Count
                </th>
                <th className="text-center py-3 px-4 text-sm font-bold text-dark-400 uppercase">
                  Win Rate
                </th>
                <th className="text-center py-3 px-4 text-sm font-bold text-dark-400 uppercase">
                  ROI
                </th>
                <th className="text-right py-3 px-4 text-sm font-bold text-dark-400 uppercase">
                  Net Profit
                </th>
              </tr>
            </thead>
            <tbody>
              {mockPerformanceByType.map((perf) => (
                <tr key={perf.betType} className="border-b border-dark-800/50 hover:bg-dark-900/30">
                  <td className="py-4 px-4 font-medium text-dark-100 capitalize">
                    {perf.betType}
                  </td>
                  <td className="py-4 px-4 text-center text-dark-300">{perf.count}</td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`font-bold ${
                        perf.winRate >= 55 ? 'text-primary-400' : 'text-dark-300'
                      }`}
                    >
                      {perf.winRate}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`font-bold ${
                        perf.roi > 0 ? 'text-primary-400' : 'text-accent-400'
                      }`}
                    >
                      {perf.roi > 0 ? '+' : ''}
                      {perf.roi}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span
                      className={`font-bold ${
                        perf.netProfit > 0 ? 'text-primary-400' : 'text-accent-400'
                      }`}
                    >
                      {formatCurrency(perf.netProfit)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance by Sport */}
      <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
        <h2 className="text-lg font-bold text-dark-100 mb-4">Performance by Sport</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockPerformanceBySport.map((perf) => (
            <div
              key={perf.sportType}
              className="bg-dark-900/50 rounded-lg p-4 border border-dark-800"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-dark-100 uppercase">{perf.sportType}</h3>
                  <p className="text-sm text-dark-400">{perf.count} total bets</p>
                </div>
                <div className="text-right">
                  <div
                    className={`text-2xl font-bold ${
                      perf.roi > 0 ? 'text-primary-400' : 'text-accent-400'
                    }`}
                  >
                    {perf.roi > 0 ? '+' : ''}
                    {perf.roi}%
                  </div>
                  <div className="text-xs text-dark-400">ROI</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-dark-800/50 rounded p-2">
                  <div className="text-xs text-dark-400 mb-1">Win Rate</div>
                  <div className="text-sm font-bold text-dark-200">{perf.winRate}%</div>
                </div>
                <div className="bg-dark-800/50 rounded p-2">
                  <div className="text-xs text-dark-400 mb-1">Record</div>
                  <div className="text-sm font-bold text-dark-200">
                    {perf.wins}-{perf.losses}
                  </div>
                </div>
                <div className="bg-dark-800/50 rounded p-2">
                  <div className="text-xs text-dark-400 mb-1">Profit</div>
                  <div
                    className={`text-sm font-bold ${
                      perf.netProfit > 0 ? 'text-primary-400' : 'text-accent-400'
                    }`}
                  >
                    {formatCurrency(perf.netProfit)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Streaks and Milestones */}
      <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
        <h2 className="text-lg font-bold text-dark-100 mb-4">Streaks & Milestones</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary-900/20 border border-primary-800/30 rounded-lg p-4">
            <div className="text-sm text-dark-400 mb-1">Longest Win Streak</div>
            <div className="text-3xl font-bold text-primary-400">{stats.longestWinStreak}</div>
            <div className="text-xs text-dark-500 mt-1">consecutive wins</div>
          </div>
          <div className="bg-accent-900/20 border border-accent-800/30 rounded-lg p-4">
            <div className="text-sm text-dark-400 mb-1">Longest Loss Streak</div>
            <div className="text-3xl font-bold text-accent-400">{stats.longestLossStreak}</div>
            <div className="text-xs text-dark-500 mt-1">consecutive losses</div>
          </div>
          <div className="bg-gold-900/20 border border-gold-800/30 rounded-lg p-4">
            <div className="text-sm text-dark-400 mb-1">Current Streak</div>
            <div className="text-3xl font-bold text-gold-400">
              {stats.currentStreak.count}
              {stats.currentStreak.type === 'win' ? 'W' : 'L'}
            </div>
            <div className="text-xs text-dark-500 mt-1">
              {stats.currentStreak.type === 'win' ? 'wins' : 'losses'} in a row
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
