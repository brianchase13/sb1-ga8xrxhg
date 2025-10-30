import React from 'react';
import { Sparkles, Brain, TrendingUp } from 'lucide-react';
import { mockAIRecommendations } from '../utils/mockData';
import { formatOdds } from '../utils/bettingCalculations';

function AIPicks() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-900/40 via-dark-800 to-gold-900/40 rounded-xl border border-primary-800/30 p-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-3 bg-primary-900/40 rounded-lg">
            <Sparkles className="h-6 w-6 text-primary-400" />
          </div>
          <h1 className="text-2xl font-bold text-dark-100">AI-Powered Picks</h1>
        </div>
        <p className="text-dark-300">
          Our advanced AI analyzes thousands of data points including team performance, player
          stats, weather conditions, and historical trends to identify high-value betting
          opportunities.
        </p>
      </div>

      {/* How It Works */}
      <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
        <h2 className="text-lg font-bold text-dark-100 mb-4 flex items-center space-x-2">
          <Brain className="h-5 w-5 text-primary-400" />
          <span>How Our AI Works</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-dark-900/50 rounded-lg p-4 border border-dark-800">
            <div className="text-2xl font-bold text-primary-400 mb-2">1</div>
            <h3 className="font-bold text-dark-100 mb-2">Data Collection</h3>
            <p className="text-sm text-dark-400">
              Aggregates real-time data from multiple sources including team stats, injury reports,
              and line movements.
            </p>
          </div>
          <div className="bg-dark-900/50 rounded-lg p-4 border border-dark-800">
            <div className="text-2xl font-bold text-primary-400 mb-2">2</div>
            <h3 className="font-bold text-dark-100 mb-2">Pattern Analysis</h3>
            <p className="text-sm text-dark-400">
              Uses machine learning to identify patterns and trends that human analysis might miss.
            </p>
          </div>
          <div className="bg-dark-900/50 rounded-lg p-4 border border-dark-800">
            <div className="text-2xl font-bold text-primary-400 mb-2">3</div>
            <h3 className="font-bold text-dark-100 mb-2">Value Detection</h3>
            <p className="text-sm text-dark-400">
              Calculates expected value and identifies bets where the odds are in your favor.
            </p>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-dark-100">Today's Top Picks</h2>
          <span className="px-3 py-1 bg-primary-900/40 border border-primary-800/50 rounded-lg text-sm font-bold text-primary-400">
            {mockAIRecommendations.length} Picks Available
          </span>
        </div>
        <div className="space-y-4">
          {mockAIRecommendations.map((rec) => (
            <div
              key={rec.id}
              className="bg-dark-900/50 rounded-lg p-5 border border-primary-800/30 hover:border-primary-700/50 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs text-dark-400 uppercase mb-1">{rec.sportType}</div>
                  <h3 className="text-xl font-bold text-dark-100 mb-1">{rec.event}</h3>
                  <p className="text-lg text-primary-400 font-bold">{rec.pick}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="text-sm text-dark-400">Confidence</div>
                    <div className="h-2 w-24 bg-dark-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-400 transition-all"
                        style={{ width: `${rec.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary-400">{rec.confidence}%</div>
                  <div className="text-2xl font-bold text-gold-400 mt-2">
                    {formatOdds(rec.recommendedOdds)}
                  </div>
                </div>
              </div>

              {/* Reasoning */}
              <div className="bg-dark-800/50 rounded-lg p-4 mb-4">
                <div className="text-xs font-bold text-dark-400 uppercase mb-2">AI Analysis</div>
                <p className="text-sm text-dark-200">{rec.reasoning}</p>
              </div>

              {/* Factors */}
              <div className="space-y-2 mb-4">
                <div className="text-xs font-bold text-dark-400 uppercase mb-2">Key Factors</div>
                {rec.factors.map((factor, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-dark-800/50 rounded p-2"
                  >
                    <div className="flex items-center space-x-2 flex-1">
                      <div className="h-2 flex-1 bg-dark-700 rounded-full overflow-hidden max-w-[100px]">
                        <div
                          className="h-full bg-primary-400"
                          style={{ width: `${factor.weight * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-dark-300">{factor.name}</span>
                    </div>
                    <span className="text-sm font-medium text-dark-200">{factor.value}</span>
                  </div>
                ))}
              </div>

              {/* Expected Value */}
              <div className="flex items-center justify-between pt-4 border-t border-dark-800">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-primary-400" />
                  <span className="text-sm text-dark-400">Expected Value:</span>
                  <span className="text-lg font-bold text-primary-400">+{rec.expectedValue}%</span>
                </div>
                <button className="px-6 py-2 bg-gold-gradient rounded-lg font-bold text-dark-900 hover:shadow-glow-gold transition-all">
                  Place Bet
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gold-900/10 border border-gold-800/30 rounded-xl p-4">
        <p className="text-xs text-dark-400">
          <strong className="text-gold-400">Disclaimer:</strong> AI predictions are for
          informational purposes only. Past performance does not guarantee future results. Always
          bet responsibly and within your means.
        </p>
      </div>
    </div>
  );
}

export default AIPicks;
