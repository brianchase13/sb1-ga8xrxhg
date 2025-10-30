import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Download,
  Settings,
  Eye,
  Crown,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  Target,
  Award,
} from 'lucide-react';
import { formatCurrency } from '../utils/bettingCalculations';
import ExportMenu from '../components/shared/ExportMenu';

function ExpertEarnings() {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year' | 'all'>('month');

  // Mock earnings data
  const earningsData = {
    totalEarnings: 12450.75,
    pendingPayouts: 3250.0,
    activeSubscribers: 248,
    commissionRate: 15, // percentage
    thisMonthEarnings: 4200.5,
    lastMonthEarnings: 3800.25,
    totalFollowers: 1842,
    conversionRate: 13.5, // followers to subscribers
  };

  const recentTransactions = [
    { id: 1, date: '2025-01-28', subscriber: '@sportsfan23', amount: 45.0, type: 'subscription', betCount: 12 },
    { id: 2, date: '2025-01-28', subscriber: '@bettingpro', amount: 30.0, type: 'subscription', betCount: 8 },
    { id: 3, date: '2025-01-27', subscriber: '@sharpbet99', amount: 60.0, type: 'subscription', betCount: 15 },
    { id: 4, date: '2025-01-27', subscriber: '@nbafanatic', amount: 22.5, type: 'subscription', betCount: 5 },
    { id: 5, date: '2025-01-26', subscriber: '@nflking', amount: 37.5, type: 'subscription', betCount: 10 },
  ];

  const topSubscribers = [
    { username: '@sportsfan23', totalPaid: 540.0, duration: '12 months', avgBets: 45 },
    { username: '@bettingpro', totalPaid: 480.0, duration: '8 months', avgBets: 52 },
    { username: '@sharpbet99', totalPaid: 360.0, duration: '6 months', avgBets: 38 },
    { username: '@nbafanatic', totalPaid: 270.0, duration: '6 months', avgBets: 28 },
    { username: '@nflking', totalPaid: 225.0, duration: '5 months', avgBets: 31 },
  ];

  const performanceStats = [
    { label: 'Win Rate', value: '58.3%', change: +2.1, icon: Target },
    { label: 'ROI', value: '+12.5%', change: +1.8, icon: TrendingUp },
    { label: 'Avg Odds', value: '-115', change: 0, icon: Percent },
    { label: 'Total Picks', value: '342', change: +45, icon: Award },
  ];

  const monthlyGrowth = earningsData.thisMonthEarnings - earningsData.lastMonthEarnings;
  const growthPercent = ((monthlyGrowth / earningsData.lastMonthEarnings) * 100).toFixed(1);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-dark-100">Expert Earnings</h1>
            <div className="px-3 py-1 bg-gold-gradient rounded-full flex items-center space-x-1">
              <Crown className="h-4 w-4 text-dark-900" />
              <span className="text-xs font-bold text-dark-900">EXPERT</span>
            </div>
          </div>
          <p className="text-dark-400 mt-1">Track your income and subscriber performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <ExportMenu data={recentTransactions} filename="expert-earnings" />
          <button className="flex items-center space-x-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-lg text-dark-200 transition-all">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-primary-900/20 border border-primary-800/50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-primary-500/20 rounded-lg">
              <DollarSign className="h-5 w-5 text-primary-400" />
            </div>
            <div className="flex items-center space-x-1 text-xs text-primary-400">
              <ArrowUpRight className="h-3 w-3" />
              <span>{growthPercent}%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-dark-100 mb-1">
            {formatCurrency(earningsData.totalEarnings)}
          </div>
          <div className="text-xs text-dark-400">Total Earnings</div>
        </div>

        <div className="bg-gold-900/20 border border-gold-800/50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-gold-500/20 rounded-lg">
              <Calendar className="h-5 w-5 text-gold-400" />
            </div>
            <div className="text-xs text-gold-400">This month</div>
          </div>
          <div className="text-2xl font-bold text-dark-100 mb-1">
            {formatCurrency(earningsData.thisMonthEarnings)}
          </div>
          <div className="text-xs text-dark-400">
            +{formatCurrency(monthlyGrowth)} vs last month
          </div>
        </div>

        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-dark-700 rounded-lg">
              <Users className="h-5 w-5 text-dark-400" />
            </div>
            <div className="text-xs text-dark-400">
              {earningsData.conversionRate}% conversion
            </div>
          </div>
          <div className="text-2xl font-bold text-dark-100 mb-1">
            {earningsData.activeSubscribers}
          </div>
          <div className="text-xs text-dark-400">Active Subscribers</div>
        </div>

        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-dark-700 rounded-lg">
              <TrendingUp className="h-5 w-5 text-dark-400" />
            </div>
            <div className="text-xs text-primary-400">{earningsData.commissionRate}% rate</div>
          </div>
          <div className="text-2xl font-bold text-dark-100 mb-1">
            {formatCurrency(earningsData.pendingPayouts)}
          </div>
          <div className="text-xs text-dark-400">Pending Payout</div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-6">
        <h2 className="text-lg font-bold text-dark-100 mb-4">Your Performance</h2>
        <div className="grid grid-cols-4 gap-4">
          {performanceStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="inline-flex p-3 bg-primary-900/20 rounded-lg mb-3">
                  <Icon className="h-5 w-5 text-primary-400" />
                </div>
                <div className="text-xl font-bold text-dark-100 mb-1">{stat.value}</div>
                <div className="text-xs text-dark-400 mb-1">{stat.label}</div>
                {stat.change !== 0 && (
                  <div
                    className={`flex items-center justify-center space-x-1 text-xs ${
                      stat.change > 0 ? 'text-primary-400' : 'text-accent-400'
                    }`}
                  >
                    {stat.change > 0 ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    <span>
                      {stat.change > 0 ? '+' : ''}
                      {stat.change}%
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-dark-100">Recent Earnings</h2>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as any)}
              className="bg-dark-900 border border-dark-700 text-dark-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="all">All Time</option>
            </select>
          </div>

          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-dark-900/50 rounded-lg hover:bg-dark-900 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-dark-100">
                      {transaction.subscriber}
                    </span>
                    <span className="text-xs text-dark-500">•</span>
                    <span className="text-xs text-dark-500">{transaction.betCount} bets tailed</span>
                  </div>
                  <div className="text-xs text-dark-400">{transaction.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary-400">
                    +{formatCurrency(transaction.amount)}
                  </div>
                  <div className="text-xs text-dark-500 capitalize">{transaction.type}</div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-sm text-dark-300 hover:bg-dark-800 transition-colors">
            View All Transactions
          </button>
        </div>

        {/* Top Subscribers */}
        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-dark-100">Top Subscribers</h2>
            <button className="text-xs text-primary-400 hover:text-primary-300 font-medium">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {topSubscribers.map((subscriber, idx) => (
              <div
                key={subscriber.username}
                className="flex items-center justify-between p-3 bg-dark-900/50 rounded-lg hover:bg-dark-900 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-primary-900/40 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-primary-400">#{idx + 1}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-dark-100">{subscriber.username}</div>
                    <div className="text-xs text-dark-500">
                      {subscriber.duration} • {subscriber.avgBets} avg bets/month
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gold-400">
                    {formatCurrency(subscriber.totalPaid)}
                  </div>
                  <div className="text-xs text-dark-500">Total paid</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commission Settings */}
      <div className="bg-gold-900/20 border border-gold-700/50 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-gold-500/20 rounded-lg">
            <Percent className="h-6 w-6 text-gold-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-dark-100 mb-2">Commission Rate</h3>
            <p className="text-sm text-dark-300 mb-4">
              You earn {earningsData.commissionRate}% commission on all bets placed by subscribers
              who tail your picks. Higher performance unlocks better rates.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex-1 bg-dark-900/50 rounded-lg p-4">
                <div className="text-xs text-dark-400 mb-1">Current Rate</div>
                <div className="text-2xl font-bold text-gold-400">{earningsData.commissionRate}%</div>
              </div>
              <div className="flex-1 bg-dark-900/50 rounded-lg p-4">
                <div className="text-xs text-dark-400 mb-1">Next Tier at</div>
                <div className="text-lg font-bold text-dark-200">500 subscribers</div>
                <div className="text-xs text-primary-400 mt-1">+5% boost</div>
              </div>
              <button className="px-6 py-3 bg-gold-gradient rounded-lg font-bold text-dark-900 hover:shadow-glow-gold transition-all">
                View Tier Benefits
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payout Info */}
      <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-dark-100 mb-1">Next Payout</h3>
            <p className="text-sm text-dark-400">
              Payouts are processed on the 1st of each month via your selected payment method
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary-400 mb-1">
              {formatCurrency(earningsData.pendingPayouts)}
            </div>
            <div className="text-xs text-dark-500">Available on Feb 1, 2025</div>
            <button className="mt-3 px-4 py-2 bg-primary-900/40 border border-primary-800/50 rounded-lg text-sm font-medium text-primary-400 hover:bg-primary-900/60 transition-all">
              Update Payment Method
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpertEarnings;
