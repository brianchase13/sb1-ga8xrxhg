import React, { useState } from 'react';
import { Shield, AlertTriangle, X, ExternalLink, Phone } from 'lucide-react';

const ResponsibleGamblingBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-dark-900 border-t border-gold-700/50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="p-2 bg-gold-500/20 rounded-lg flex-shrink-0">
              <Shield className="h-5 w-5 text-gold-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-gold-400 mb-1">
                Bet Responsibly
              </h3>
              {!isExpanded ? (
                <p className="text-xs text-dark-300">
                  Gambling should be entertainment, not income. Set limits and know when to stop.{' '}
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="text-gold-400 hover:text-gold-300 underline"
                  >
                    Learn More
                  </button>
                </p>
              ) : (
                <div className="space-y-3 text-xs text-dark-300">
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-gold-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-gold-400 mb-1">Warning Signs of Problem Gambling:</p>
                        <ul className="space-y-1 ml-4 list-disc">
                          <li>Betting more than you can afford to lose</li>
                          <li>Chasing losses or increasing bet sizes after losing</li>
                          <li>Gambling affecting relationships or work</li>
                          <li>Borrowing money to gamble</li>
                          <li>Feeling guilty or hiding your gambling</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-dark-800/50 border border-dark-700 rounded-lg p-3 space-y-2">
                    <p className="font-bold text-dark-200">Get Help:</p>
                    <div className="space-y-2">
                      <a
                        href="tel:1-800-522-4700"
                        className="flex items-center space-x-2 text-primary-400 hover:text-primary-300"
                      >
                        <Phone className="h-4 w-4" />
                        <span>National Problem Gambling Helpline: 1-800-522-4700</span>
                      </a>
                      <a
                        href="https://www.ncpgambling.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-primary-400 hover:text-primary-300"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>National Council on Problem Gambling</span>
                      </a>
                      <a
                        href="https://www.gamblersanonymous.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-primary-400 hover:text-primary-300"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Gamblers Anonymous</span>
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-dark-500 text-[10px]">
                    <span>21+ only</span>
                    <span>•</span>
                    <span>Void where prohibited</span>
                    <span>•</span>
                    <span>T&Cs apply</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isExpanded && (
              <button
                onClick={() => setIsExpanded(false)}
                className="text-xs text-dark-400 hover:text-dark-300 px-3 py-1 rounded"
              >
                Show Less
              </button>
            )}
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1.5 hover:bg-dark-800 rounded transition-colors"
            >
              <X className="h-4 w-4 text-dark-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsibleGamblingBanner;
