import React from 'react';
import { Heart, MessageCircle, Share2, TrendingUp, Star } from 'lucide-react';
import { mockSocialBets } from '../utils/mockData';
import { formatOdds, formatCurrency } from '../utils/bettingCalculations';

function SocialFeed() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark-100">Social Feed</h1>
          <p className="text-dark-400 mt-1">Follow expert bettors and discover winning strategies</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-200 hover:bg-dark-700 transition-all">
            Following
          </button>
          <button className="px-4 py-2 bg-primary-900/40 border border-primary-800/50 rounded-lg text-primary-400 font-medium">
            Experts
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {mockSocialBets.map((socialBet) => (
          <div
            key={socialBet.id}
            className="bg-dark-800/50 border border-dark-700 rounded-xl p-5 hover:border-dark-600 transition-all"
          >
            {/* User Info */}
            <div className="flex items-start space-x-3 mb-4">
              <img
                src={socialBet.user.avatar}
                alt={socialBet.user.displayName}
                className="h-12 w-12 rounded-lg"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-dark-100">{socialBet.user.displayName}</h3>
                  {socialBet.user.isVerified && (
                    <div className="h-5 w-5 bg-gold-500 rounded-full flex items-center justify-center">
                      <svg className="h-3 w-3 text-dark-900" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                  {socialBet.user.isExpert && (
                    <span className="px-2 py-0.5 bg-primary-900/40 border border-primary-800/50 rounded text-xs font-bold text-primary-400">
                      EXPERT
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-3 text-sm text-dark-400 mt-1">
                  <span>@{socialBet.user.username}</span>
                  <span>•</span>
                  <span>ROI: {socialBet.user.stats.roi}%</span>
                  <span>•</span>
                  <span>{socialBet.user.followersCount.toLocaleString()} followers</span>
                </div>
              </div>
              <button className="px-4 py-2 bg-primary-900/40 border border-primary-800/50 rounded-lg text-primary-400 text-sm font-medium hover:bg-primary-900/60 transition-all">
                Follow
              </button>
            </div>

            {/* Caption */}
            {socialBet.caption && (
              <p className="text-dark-200 mb-4">{socialBet.caption}</p>
            )}

            {/* Bet Details */}
            <div className="bg-dark-900/50 rounded-lg p-4 border border-dark-800 mb-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-xs text-dark-400 uppercase mb-1">
                    {socialBet.bet.sportType}
                  </div>
                  <h3 className="text-lg font-bold text-dark-100 mb-1">{socialBet.bet.event}</h3>
                  <p className="text-primary-400 font-bold">{socialBet.bet.pick}</p>
                </div>
                <div className="text-right">
                  {socialBet.confidence && (
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < socialBet.confidence
                              ? 'text-gold-400 fill-gold-400'
                              : 'text-dark-600'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  <div className="text-2xl font-bold text-gold-400">
                    {formatOdds(socialBet.bet.odds)}
                  </div>
                  <div className="text-xs text-dark-400">{socialBet.bet.sportsbook}</div>
                </div>
              </div>

              {socialBet.reasoning && (
                <div className="bg-dark-800/50 rounded p-3 border border-dark-700">
                  <div className="text-xs font-bold text-dark-400 uppercase mb-1">Reasoning</div>
                  <p className="text-sm text-dark-300">{socialBet.reasoning}</p>
                </div>
              )}
            </div>

            {/* Engagement */}
            <div className="flex items-center justify-between pt-4 border-t border-dark-800">
              <div className="flex items-center space-x-6">
                <button
                  className={`flex items-center space-x-2 ${
                    socialBet.isLiked ? 'text-accent-400' : 'text-dark-400 hover:text-accent-400'
                  } transition-colors`}
                >
                  <Heart className={`h-5 w-5 ${socialBet.isLiked ? 'fill-accent-400' : ''}`} />
                  <span className="text-sm font-medium">{socialBet.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-dark-400 hover:text-primary-400 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">{socialBet.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-dark-400 hover:text-primary-400 transition-colors">
                  <Share2 className="h-5 w-5" />
                  <span className="text-sm font-medium">{socialBet.shares}</span>
                </button>
              </div>
              <button className="px-4 py-2 bg-gold-gradient rounded-lg text-sm font-bold text-dark-900 hover:shadow-glow-gold transition-all">
                Copy Bet
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocialFeed;
