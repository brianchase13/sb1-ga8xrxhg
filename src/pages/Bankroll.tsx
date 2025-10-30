import React from 'react';
import { Wallet, TrendingUp, DollarSign, Plus, Minus, Download } from 'lucide-react';
import StatsCard from '../components/shared/StatsCard';
import { mockCurrentUser } from '../utils/mockData';
import { formatCurrency } from '../utils/bettingCalculations';

function Bankroll() {
  const stats = mockCurrentUser.stats;

  const recentTransactions = [
    { id: 1, type: 'win', amount: 265, description: 'Lakers @ Celtics - ML Win', date: '2025-10-29' },
    { id: 2, type: 'loss', amount: -115, description: 'Warriors @ Nuggets - Over Loss', date: '2025-10-28' },
    { id: 3, type: 'deposit', amount: 500, description: 'FanDuel Deposit', date: '2025-10-27' },
    { id: 4, type: 'win', amount: 190.91, description: 'Ravens -3 Win', date: '2025-10-26' },
    { id: 5, type: 'withdrawal', amount: -300, description: 'Withdrawal to Bank', date: '2025-10-25' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-dark-100">Bankroll Management</h1>
        <p className="text-dark-400 mt-1">Track and manage your betting bankroll</p>
      </div>

      {/* Main Bankroll Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Balance */}
        <div className="bg-gradient-to-br from-primary-900/40 to-gold-900/40 border border-primary-800/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-dark-400 text-sm mb-1">Current Bankroll</p>
              <p className="text-4xl font-bold text-dark-100">
                {formatCurrency(stats.currentBalance)}
              </p>
            </div>
            <div className="p-4 bg-gold-gradient rounded-xl shadow-glow-gold">
              <Wallet className="h-8 w-8 text-dark-900" />
            </div>
          </div>
          <div className="flex items-center space-x-2 text-primary-400">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">
              {formatCurrency(stats.currentBalance - stats.startingBankroll)} (
              {(((stats.currentBalance - stats.startingBankroll) / stats.startingBankroll) * 100).toFixed(1)}%) since start
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-primary-900/40 border border-primary-800/50 rounded-xl p-6 hover:bg-primary-900/60 transition-all group">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-primary-400 rounded-lg group-hover:scale-110 transition-transform">
                <Plus className="h-5 w-5 text-dark-900" />
              </div>
              <span className="font-bold text-dark-100">Deposit</span>
            </div>
            <p className="text-xs text-dark-400">Add funds to bankroll</p>
          </button>
          <button className="bg-dark-800/50 border border-dark-700 rounded-xl p-6 hover:bg-dark-800 transition-all group">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-dark-700 rounded-lg group-hover:scale-110 transition-transform">
                <Minus className="h-5 w-5 text-dark-300" />
              </div>
              <span className="font-bold text-dark-100">Withdraw</span>
            </div>
            <p className="text-xs text-dark-400">Cash out winnings</p>
          </button>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Wagered"
          value={formatCurrency(stats.totalWagered)}
          icon={DollarSign}
          variant="default"
        />
        <StatsCard
          title="Total Won"
          value={formatCurrency(stats.totalWon)}
          icon={TrendingUp}
          variant="success"
        />
        <StatsCard
          title="Total Lost"
          value={formatCurrency(stats.totalLost)}
          icon={Minus}
          variant="danger"
        />
        <StatsCard
          title="Net Profit"
          value={formatCurrency(stats.netProfit)}
          subtitle={`ROI: ${stats.roi}%`}
          icon={TrendingUp}
          variant="gold"
        />
      </div>

      {/* Bankroll Chart - Placeholder */}
      <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
        <h2 className="text-lg font-bold text-dark-100 mb-4">Bankroll Growth</h2>
        <div className="h-64 flex items-center justify-center bg-dark-900/50 rounded-lg border border-dark-800">
          <p className="text-dark-400">Chart visualization coming soon</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-dark-100">Recent Transactions</h2>
          <button className="flex items-center space-x-2 px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-dark-200 hover:bg-dark-800 transition-all text-sm">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
        <div className="space-y-2">
          {recentTransactions.map((txn) => {
            const isPositive = txn.type === 'win' || txn.type === 'deposit';
            const Icon =
              txn.type === 'win' || txn.type === 'deposit'
                ? Plus
                : Minus;

            return (
              <div
                key={txn.id}
                className="flex items-center justify-between bg-dark-900/50 rounded-lg p-4 hover:bg-dark-900/70 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isPositive
                        ? 'bg-primary-900/40'
                        : 'bg-accent-900/40'
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${
                        isPositive
                          ? 'text-primary-400'
                          : 'text-accent-400'
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dark-100">{txn.description}</p>
                    <p className="text-xs text-dark-500">{txn.date}</p>
                  </div>
                </div>
                <span
                  className={`text-lg font-bold ${
                    isPositive ? 'text-primary-400' : 'text-accent-400'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {formatCurrency(Math.abs(txn.amount))}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bankroll Tips */}
      <div className="bg-gold-900/10 border border-gold-800/30 rounded-xl p-5">
        <h2 className="text-lg font-bold text-gold-400 mb-3">Bankroll Management Tips</h2>
        <ul className="space-y-2">
          <li className="flex items-start space-x-2 text-sm text-dark-300">
            <span className="text-gold-400">•</span>
            <span>
              <strong>Never bet more than 1-5% of your bankroll on a single bet</strong> to
              minimize risk of ruin
            </span>
          </li>
          <li className="flex items-start space-x-2 text-sm text-dark-300">
            <span className="text-gold-400">•</span>
            <span>
              <strong>Set a stop-loss limit</strong> and stick to it to prevent chasing losses
            </span>
          </li>
          <li className="flex items-start space-x-2 text-sm text-dark-300">
            <span className="text-gold-400">•</span>
            <span>
              <strong>Regularly withdraw profits</strong> to secure your winnings and maintain
              discipline
            </span>
          </li>
          <li className="flex items-start space-x-2 text-sm text-dark-300">
            <span className="text-gold-400">•</span>
            <span>
              <strong>Track every bet</strong> to understand your strengths and weaknesses
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Bankroll;
