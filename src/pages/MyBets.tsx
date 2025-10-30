import React, { useState } from 'react';
import { Filter, Plus } from 'lucide-react';
import BetCard from '../components/shared/BetCard';
import ShareBetModal from '../components/shared/ShareBetModal';
import { mockBets } from '../utils/mockData';
import type { BetStatus, SportType, Bet } from '../types';

function MyBets() {
  const [filterStatus, setFilterStatus] = useState<BetStatus | 'all'>('all');
  const [filterSport, setFilterSport] = useState<SportType | 'all'>('all');
  const [selectedBet, setSelectedBet] = useState<Bet | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShareBet = (bet: Bet) => {
    setSelectedBet(bet);
    setIsShareModalOpen(true);
  };

  const filteredBets = mockBets.filter((bet) => {
    if (filterStatus !== 'all' && bet.status !== filterStatus) return false;
    if (filterSport !== 'all' && bet.sportType !== filterSport) return false;
    return true;
  });

  const stats = {
    all: mockBets.length,
    pending: mockBets.filter((b) => b.status === 'pending').length,
    won: mockBets.filter((b) => b.status === 'won').length,
    lost: mockBets.filter((b) => b.status === 'lost').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark-100">My Bets</h1>
          <p className="text-dark-400 mt-1">Track and manage all your wagers</p>
        </div>
        <button className="px-6 py-3 bg-gold-gradient rounded-lg font-bold text-dark-900 hover:shadow-glow-gold transition-all hover:scale-105 flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Add Bet</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'All Bets', value: stats.all, active: filterStatus === 'all' },
          { label: 'Pending', value: stats.pending, active: filterStatus === 'pending' },
          { label: 'Won', value: stats.won, active: filterStatus === 'won' },
          { label: 'Lost', value: stats.lost, active: filterStatus === 'lost' },
        ].map((stat) => (
          <button
            key={stat.label}
            onClick={() => setFilterStatus(stat.label.toLowerCase() as BetStatus | 'all')}
            className={`p-4 rounded-lg border transition-all ${
              stat.active
                ? 'bg-primary-900/40 border-primary-800/50 text-primary-400'
                : 'bg-dark-800/50 border-dark-700 text-dark-300 hover:bg-dark-800'
            }`}
          >
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm mt-1">{stat.label}</div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-dark-800/50 border border-dark-700 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-dark-400" />
          <select
            value={filterSport}
            onChange={(e) => setFilterSport(e.target.value as SportType | 'all')}
            className="bg-dark-900 border border-dark-700 text-dark-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Sports</option>
            <option value="nfl">NFL</option>
            <option value="nba">NBA</option>
            <option value="mlb">MLB</option>
            <option value="nhl">NHL</option>
            <option value="soccer">Soccer</option>
          </select>
        </div>
      </div>

      {/* Bets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBets.map((bet) => (
          <BetCard key={bet.id} bet={bet} onShare={handleShareBet} />
        ))}
      </div>

      {filteredBets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-dark-400">No bets found with the selected filters</p>
        </div>
      )}

      {/* Share Modal */}
      {selectedBet && (
        <ShareBetModal
          isOpen={isShareModalOpen}
          onClose={() => {
            setIsShareModalOpen(false);
            setSelectedBet(null);
          }}
          bet={selectedBet}
          userName="You"
        />
      )}
    </div>
  );
}

export default MyBets;
