import React, { useState } from 'react';
import { Scale, TrendingUp, Zap, AlertCircle } from 'lucide-react';
import { mockOddsComparisons, mockArbitrageOpportunities } from '../utils/mockData';
import { formatOdds } from '../utils/bettingCalculations';

function LineComparison() {
  const [selectedSport, setSelectedSport] = useState<string>('all');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-dark-100">Line Shopping</h1>
        <p className="text-dark-400 mt-1">
          Find the best odds across all sportsbooks and discover arbitrage opportunities
        </p>
      </div>

      {/* Arbitrage Alert Banner */}
      {mockArbitrageOpportunities.length > 0 && (
        <div className="bg-gold-900/20 border border-gold-700/50 rounded-xl p-5">
          <div className="flex items-center space-x-2 mb-3">
            <Zap className="h-5 w-5 text-gold-400" />
            <h2 className="text-lg font-bold text-gold-400">
              {mockArbitrageOpportunities.length} Active Arbitrage Opportunities
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockArbitrageOpportunities.map((arb) => (
              <div
                key={arb.id}
                className="bg-dark-900/50 rounded-lg p-4 border border-gold-800/30"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-xs text-dark-400 uppercase">{arb.sportType}</div>
                    <h3 className="font-bold text-dark-100">{arb.event}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-dark-400">Guaranteed Profit</div>
                    <div className="text-xl font-bold text-gold-400">+{arb.profit}%</div>
                  </div>
                </div>
                <div className="space-y-2 mb-3">
                  {arb.bets.map((bet, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-sm bg-dark-800/50 rounded p-2"
                    >
                      <span className="text-dark-300">{bet.sportsbook}</span>
                      <span className="text-dark-200 font-medium">{bet.pick}</span>
                      <span className="text-gold-400">{formatOdds(bet.odds)}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full py-2 bg-gold-gradient rounded-lg text-sm font-bold text-dark-900 hover:shadow-glow-gold transition-all">
                  Execute Arbitrage
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sport Filter */}
      <div className="flex items-center space-x-2">
        {['all', 'nfl', 'nba', 'mlb', 'nhl', 'soccer'].map((sport) => (
          <button
            key={sport}
            onClick={() => setSelectedSport(sport)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedSport === sport
                ? 'bg-primary-900/40 border border-primary-800/50 text-primary-400'
                : 'bg-dark-800/50 border border-dark-700 text-dark-300 hover:bg-dark-800'
            }`}
          >
            {sport.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Odds Comparison Grid */}
      <div className="space-y-4">
        {mockOddsComparisons.map((game, idx) => (
          <div key={idx} className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
            {/* Game Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xs text-dark-400 uppercase mb-1">{game.sportType}</div>
                <h3 className="text-xl font-bold text-dark-100">{game.event}</h3>
                <p className="text-sm text-dark-400 mt-1">
                  {new Date(game.startTime).toLocaleString()}
                </p>
              </div>
              <button className="px-3 py-1.5 bg-primary-900/40 border border-primary-800/50 rounded-lg text-xs font-bold text-primary-400">
                Set Alert
              </button>
            </div>

            {/* Odds Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-800">
                    <th className="text-left py-2 px-3 text-xs font-bold text-dark-400 uppercase">
                      Sportsbook
                    </th>
                    <th className="text-center py-2 px-3 text-xs font-bold text-dark-400 uppercase">
                      Moneyline
                    </th>
                    <th className="text-center py-2 px-3 text-xs font-bold text-dark-400 uppercase">
                      Spread
                    </th>
                    <th className="text-center py-2 px-3 text-xs font-bold text-dark-400 uppercase">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {game.odds.map((sportsbook, i) => (
                    <tr key={i} className="border-b border-dark-800/50 hover:bg-dark-900/30">
                      <td className="py-3 px-3 font-medium text-dark-200">
                        {sportsbook.sportsbook}
                      </td>
                      <td className="py-3 px-3">
                        {sportsbook.moneyline && (
                          <div className="flex justify-center space-x-2 text-sm">
                            <span className="text-dark-300">
                              {formatOdds(sportsbook.moneyline.home)}
                            </span>
                            <span className="text-dark-600">/</span>
                            <span className="text-dark-300">
                              {formatOdds(sportsbook.moneyline.away)}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        {sportsbook.spread && (
                          <div className="flex justify-center space-x-2 text-sm">
                            <span className="text-dark-300">
                              {sportsbook.spread.home.line > 0 ? '+' : ''}
                              {sportsbook.spread.home.line} ({formatOdds(sportsbook.spread.home.odds)})
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        {sportsbook.total && (
                          <div className="flex justify-center space-x-2 text-sm">
                            <span className="text-dark-300">
                              O{sportsbook.total.over.line} ({formatOdds(sportsbook.total.over.odds)})
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Best Odds Summary */}
            <div className="mt-4 pt-4 border-t border-dark-800">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="h-4 w-4 text-primary-400" />
                <span className="text-sm font-bold text-primary-400">Best Available Odds</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {game.bestOdds.map((best, i) => (
                  <div
                    key={i}
                    className="bg-primary-900/20 border border-primary-800/30 rounded-lg p-3"
                  >
                    <div className="text-xs text-dark-400 uppercase mb-1">{best.type}</div>
                    <div className="text-sm font-bold text-dark-100 mb-1">{best.pick}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gold-400">
                        {formatOdds(best.odds)}
                      </span>
                      <span className="text-xs text-dark-400">{best.sportsbook}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LineComparison;
