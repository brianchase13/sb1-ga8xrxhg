import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Check,
  X,
  TrendingUp,
  Crown,
  MessageCircle,
  Share2,
  UserMinus,
  Clock,
} from 'lucide-react';
import { mockUsers } from '../utils/mockData';
import { useToast } from '../components/shared/Toast';
import TailModal from '../components/shared/TailModal';
import type { User } from '../types';

function Friends() {
  const [activeTab, setActiveTab] = useState<'following' | 'followers' | 'suggestions' | 'requests'>(
    'following'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpert, setSelectedExpert] = useState<User | null>(null);
  const [isTailModalOpen, setIsTailModalOpen] = useState(false);
  const { showToast } = useToast();

  // Mock data - in real app this would come from API
  const following = mockUsers.slice(0, 5);
  const followers = mockUsers.slice(3, 8);
  const suggestions = mockUsers.slice(6, 12);
  const friendRequests = [
    { ...mockUsers[0], requestedAt: '2 hours ago' },
    { ...mockUsers[2], requestedAt: '1 day ago' },
  ];

  const stats = {
    following: following.length,
    followers: followers.length,
    friends: 12, // mutual follows
  };

  const handleFollow = (user: User) => {
    showToast('success', 'Following', `You're now following ${user.displayName}`);
  };

  const handleUnfollow = (user: User) => {
    showToast('info', 'Unfollowed', `You unfollowed ${user.displayName}`);
  };

  const handleTail = (user: User) => {
    setSelectedExpert(user);
    setIsTailModalOpen(true);
  };

  const handleAcceptRequest = (user: User) => {
    showToast('success', 'Request Accepted', `${user.displayName} is now your friend`);
  };

  const handleRejectRequest = (user: User) => {
    showToast('info', 'Request Declined', `Rejected friend request from ${user.displayName}`);
  };

  const filteredUsers = (users: User[]) => {
    if (!searchQuery) return users;
    return users.filter(
      (user) =>
        user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const renderUserCard = (user: User, actions: 'follow' | 'unfollow' | 'request') => (
    <div
      key={user.id}
      className="flex items-center justify-between p-4 bg-dark-800/50 border border-dark-700 rounded-xl hover:border-dark-600 transition-all"
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img src={user.avatar} alt={user.displayName} className="h-14 w-14 rounded-lg" />
          {user.isVerified && (
            <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-gold-500 rounded-full flex items-center justify-center border-2 border-dark-900">
              <Check className="h-3 w-3 text-dark-900" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-bold text-dark-100">{user.displayName}</h3>
            {user.isExpert && (
              <div className="px-2 py-0.5 bg-primary-900/40 border border-primary-800/50 rounded text-xs font-bold text-primary-400">
                EXPERT
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3 text-sm text-dark-400">
            <span>@{user.username}</span>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>ROI: {user.stats.roi}%</span>
            </div>
            <span>•</span>
            <span>{user.stats.winRate}% Win Rate</span>
          </div>
          {user.specialties && (
            <div className="flex items-center space-x-2 mt-2">
              {user.specialties.slice(0, 3).map((sport) => (
                <span
                  key={sport}
                  className="px-2 py-0.5 bg-dark-900 border border-dark-700 rounded text-xs text-dark-300 uppercase"
                >
                  {sport}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {actions === 'follow' && (
          <>
            <button
              onClick={() => handleFollow(user)}
              className="px-4 py-2 bg-primary-900/40 border border-primary-800/50 rounded-lg text-primary-400 text-sm font-medium hover:bg-primary-900/60 transition-all"
            >
              Follow
            </button>
            {user.isExpert && (
              <button
                onClick={() => handleTail(user)}
                className="px-4 py-2 bg-gold-gradient rounded-lg text-dark-900 text-sm font-bold hover:shadow-glow-gold transition-all"
              >
                Tail
              </button>
            )}
          </>
        )}

        {actions === 'unfollow' && (
          <>
            <button
              onClick={() => handleUnfollow(user)}
              className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-300 text-sm font-medium hover:bg-dark-700 transition-all"
            >
              Unfollow
            </button>
            <button className="p-2 hover:bg-dark-800 rounded-lg transition-colors">
              <MessageCircle className="h-4 w-4 text-dark-400 hover:text-primary-400" />
            </button>
            <button className="p-2 hover:bg-dark-800 rounded-lg transition-colors">
              <Share2 className="h-4 w-4 text-dark-400 hover:text-primary-400" />
            </button>
          </>
        )}

        {actions === 'request' && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleAcceptRequest(user)}
              className="p-2 bg-primary-900/40 border border-primary-800/50 rounded-lg hover:bg-primary-900/60 transition-all"
            >
              <Check className="h-4 w-4 text-primary-400" />
            </button>
            <button
              onClick={() => handleRejectRequest(user)}
              className="p-2 bg-accent-900/40 border border-accent-800/50 rounded-lg hover:bg-accent-900/60 transition-all"
            >
              <X className="h-4 w-4 text-accent-400" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark-100">Friends & Following</h1>
          <p className="text-dark-400 mt-1">Connect with other bettors and follow experts</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary-gradient rounded-lg font-bold text-white hover:shadow-glow-green transition-all">
          <UserPlus className="h-4 w-4" />
          <span>Invite Friends</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-primary-400 mb-1">{stats.following}</div>
          <div className="text-sm text-dark-400">Following</div>
        </div>
        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-primary-400 mb-1">{stats.followers}</div>
          <div className="text-sm text-dark-400">Followers</div>
        </div>
        <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-gold-400 mb-1">{stats.friends}</div>
          <div className="text-sm text-dark-400">Friends</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users..."
          className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-dark-800">
        {[
          { id: 'following', label: 'Following', count: stats.following },
          { id: 'followers', label: 'Followers', count: stats.followers },
          { id: 'suggestions', label: 'Suggested', icon: Crown },
          { id: 'requests', label: 'Requests', count: friendRequests.length, badge: true },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 font-medium text-sm transition-all relative ${
              activeTab === tab.id
                ? 'text-primary-400 border-b-2 border-primary-500'
                : 'text-dark-400 hover:text-dark-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-primary-900/40 text-primary-400'
                      : 'bg-dark-800 text-dark-400'
                  }`}
                >
                  {tab.count}
                </span>
              )}
              {tab.badge && tab.count && tab.count > 0 && (
                <div className="absolute -top-1 -right-1 h-2 w-2 bg-accent-500 rounded-full animate-pulse"></div>
              )}
              {tab.icon && <tab.icon className="h-4 w-4" />}
            </div>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'following' && (
          <>
            {filteredUsers(following).length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-dark-600 mx-auto mb-4" />
                <p className="text-dark-400">
                  {searchQuery ? 'No users found' : 'Not following anyone yet'}
                </p>
                <button
                  onClick={() => setActiveTab('suggestions')}
                  className="mt-4 px-4 py-2 bg-primary-900/40 border border-primary-800/50 rounded-lg text-primary-400 text-sm font-medium hover:bg-primary-900/60 transition-all"
                >
                  Browse Suggestions
                </button>
              </div>
            ) : (
              filteredUsers(following).map((user) => renderUserCard(user, 'unfollow'))
            )}
          </>
        )}

        {activeTab === 'followers' && (
          <>
            {filteredUsers(followers).length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-dark-600 mx-auto mb-4" />
                <p className="text-dark-400">
                  {searchQuery ? 'No users found' : 'No followers yet'}
                </p>
                <p className="text-sm text-dark-500 mt-2">
                  Share your bets to gain followers
                </p>
              </div>
            ) : (
              filteredUsers(followers).map((user) => renderUserCard(user, 'follow'))
            )}
          </>
        )}

        {activeTab === 'suggestions' && (
          <>
            <div className="bg-primary-900/20 border border-primary-800/50 rounded-xl p-4 mb-4">
              <div className="flex items-start space-x-3">
                <Crown className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-dark-100 mb-1">Featured Experts</h3>
                  <p className="text-xs text-dark-400">
                    Top-performing bettors recommended based on your interests
                  </p>
                </div>
              </div>
            </div>
            {filteredUsers(suggestions).map((user) => renderUserCard(user, 'follow'))}
          </>
        )}

        {activeTab === 'requests' && (
          <>
            {friendRequests.length === 0 ? (
              <div className="text-center py-12">
                <UserPlus className="h-12 w-12 text-dark-600 mx-auto mb-4" />
                <p className="text-dark-400">No pending friend requests</p>
              </div>
            ) : (
              friendRequests.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-primary-900/20 border border-primary-800/50 rounded-xl"
                >
                  <div className="flex items-center space-x-4">
                    <img src={user.avatar} alt={user.displayName} className="h-14 w-14 rounded-lg" />
                    <div>
                      <h3 className="font-bold text-dark-100 mb-1">{user.displayName}</h3>
                      <div className="flex items-center space-x-2 text-sm text-dark-400">
                        <Clock className="h-3 w-3" />
                        <span>{user.requestedAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleAcceptRequest(user)}
                      className="px-4 py-2 bg-primary-gradient rounded-lg text-white text-sm font-bold hover:shadow-glow-green transition-all"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRejectRequest(user)}
                      className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-300 text-sm font-medium hover:bg-dark-700 transition-all"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>

      {/* Tail Modal */}
      {selectedExpert && (
        <TailModal
          isOpen={isTailModalOpen}
          onClose={() => {
            setIsTailModalOpen(false);
            setSelectedExpert(null);
          }}
          expert={selectedExpert}
        />
      )}
    </div>
  );
}

export default Friends;
