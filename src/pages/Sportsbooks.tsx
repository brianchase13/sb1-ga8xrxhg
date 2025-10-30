import React from 'react';
import { Link as LinkIcon, CheckCircle, XCircle, RefreshCw, Shield } from 'lucide-react';

function Sportsbooks() {
  const sportsbooks = [
    {
      name: 'FanDuel',
      logo: 'https://via.placeholder.com/80x40/059669/ffffff?text=FanDuel',
      isConnected: true,
      balance: 1250.50,
      lastSynced: '2 mins ago',
      requiresMFA: false,
    },
    {
      name: 'DraftKings',
      logo: 'https://via.placeholder.com/80x40/DC2626/ffffff?text=DraftKings',
      isConnected: true,
      balance: 890.25,
      lastSynced: '5 mins ago',
      requiresMFA: false,
    },
    {
      name: 'BetMGM',
      logo: 'https://via.placeholder.com/80x40/D97706/ffffff?text=BetMGM',
      isConnected: true,
      balance: 620.75,
      lastSynced: '1 hour ago',
      requiresMFA: true,
    },
    {
      name: 'Caesars',
      logo: 'https://via.placeholder.com/80x40/7C3AED/ffffff?text=Caesars',
      isConnected: false,
      requiresMFA: true,
    },
    {
      name: 'BetRivers',
      logo: 'https://via.placeholder.com/80x40/0891B2/ffffff?text=BetRivers',
      isConnected: false,
      requiresMFA: false,
    },
    {
      name: 'PointsBet',
      logo: 'https://via.placeholder.com/80x40/DB2777/ffffff?text=PointsBet',
      isConnected: false,
      requiresMFA: false,
    },
  ];

  const connectedBooks = sportsbooks.filter((s) => s.isConnected);
  const totalBalance = connectedBooks.reduce((sum, s) => sum + (s.balance || 0), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-dark-100">Sportsbook Connections</h1>
        <p className="text-dark-400 mt-1">
          Connect your sportsbook accounts for automatic bet tracking and real-time balance sync
        </p>
      </div>

      {/* Total Balance */}
      <div className="bg-gradient-to-br from-primary-900/40 to-gold-900/40 border border-primary-800/30 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-dark-400 text-sm mb-1">Total Balance Across All Sportsbooks</p>
            <p className="text-4xl font-bold text-dark-100">
              ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-dark-400 mt-2">
              {connectedBooks.length} of {sportsbooks.length} sportsbooks connected
            </p>
          </div>
          <button className="px-6 py-3 bg-gold-gradient rounded-lg font-bold text-dark-900 hover:shadow-glow-gold transition-all hover:scale-105">
            Sync All
          </button>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-primary-900/20 border border-primary-800/30 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-primary-400 mt-0.5" />
          <div>
            <h3 className="font-bold text-primary-400 mb-1">Your Security is Our Priority</h3>
            <p className="text-sm text-dark-300">
              We use bank-level 256-bit encryption to protect your credentials. Your sportsbook login
              information is encrypted and never stored in plain text. We only read your betting
              history and balances - we cannot place bets on your behalf.
            </p>
          </div>
        </div>
      </div>

      {/* Connected Sportsbooks */}
      <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
        <h2 className="text-lg font-bold text-dark-100 mb-4">Connected Sportsbooks</h2>
        <div className="space-y-3">
          {connectedBooks.length === 0 ? (
            <p className="text-center text-dark-400 py-8">
              No sportsbooks connected yet. Connect your first sportsbook below to get started.
            </p>
          ) : (
            connectedBooks.map((book) => (
              <div
                key={book.name}
                className="flex items-center justify-between bg-dark-900/50 rounded-lg p-4 border border-dark-800"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={book.logo}
                    alt={book.name}
                    className="h-10 w-20 object-contain rounded"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-dark-100">{book.name}</h3>
                      <CheckCircle className="h-4 w-4 text-primary-400" />
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-dark-400">Last synced: {book.lastSynced}</span>
                      {book.requiresMFA && (
                        <span className="px-2 py-0.5 bg-gold-900/40 border border-gold-800/50 rounded text-xs text-gold-400">
                          MFA
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-xs text-dark-400">Balance</p>
                    <p className="text-xl font-bold text-primary-400">
                      ${book.balance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <button className="p-2 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors">
                    <RefreshCw className="h-5 w-5 text-dark-300" />
                  </button>
                  <button className="px-4 py-2 bg-accent-900/40 border border-accent-800/50 rounded-lg text-accent-400 text-sm font-medium hover:bg-accent-900/60 transition-all">
                    Disconnect
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Available Sportsbooks */}
      <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
        <h2 className="text-lg font-bold text-dark-100 mb-4">Available Sportsbooks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sportsbooks
            .filter((s) => !s.isConnected)
            .map((book) => (
              <div
                key={book.name}
                className="bg-dark-900/50 rounded-lg p-5 border border-dark-800 hover:border-dark-700 transition-all group"
              >
                <img
                  src={book.logo}
                  alt={book.name}
                  className="h-12 w-24 object-contain rounded mb-4 mx-auto"
                />
                <h3 className="font-bold text-dark-100 text-center mb-2">{book.name}</h3>
                {book.requiresMFA && (
                  <div className="flex items-center justify-center space-x-1 mb-3">
                    <Shield className="h-3 w-3 text-gold-400" />
                    <span className="text-xs text-gold-400">MFA Required</span>
                  </div>
                )}
                <button className="w-full py-2 bg-primary-900/40 border border-primary-800/50 rounded-lg text-primary-400 text-sm font-medium hover:bg-primary-900/60 transition-all group-hover:scale-105 flex items-center justify-center space-x-2">
                  <LinkIcon className="h-4 w-4" />
                  <span>Connect</span>
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
        <h2 className="text-lg font-bold text-dark-100 mb-4">How Sportsbook Sync Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-dark-900/50 rounded-lg p-4 border border-dark-800">
            <div className="text-2xl font-bold text-primary-400 mb-2">1</div>
            <h3 className="font-bold text-dark-100 mb-2">Connect Securely</h3>
            <p className="text-sm text-dark-400">
              Enter your sportsbook credentials. All data is encrypted with bank-level security.
            </p>
          </div>
          <div className="bg-dark-900/50 rounded-lg p-4 border border-dark-800">
            <div className="text-2xl font-bold text-primary-400 mb-2">2</div>
            <h3 className="font-bold text-dark-100 mb-2">Automatic Sync</h3>
            <p className="text-sm text-dark-400">
              We automatically fetch your bets and balances every 5 minutes.
            </p>
          </div>
          <div className="bg-dark-900/50 rounded-lg p-4 border border-dark-800">
            <div className="text-2xl font-bold text-primary-400 mb-2">3</div>
            <h3 className="font-bold text-dark-100 mb-2">Track Everything</h3>
            <p className="text-sm text-dark-400">
              All your bets and performance metrics are automatically tracked and analyzed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sportsbooks;
