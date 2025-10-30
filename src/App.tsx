import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import MyBets from './pages/MyBets';
import LineComparison from './pages/LineComparison';
import Analytics from './pages/Analytics';
import SocialFeed from './pages/SocialFeed';
import AIPicks from './pages/AIPicks';
import Bankroll from './pages/Bankroll';
import Sportsbooks from './pages/Sportsbooks';
import ExpertEarnings from './pages/ExpertEarnings';
import Friends from './pages/Friends';
import { ToastProvider } from './components/shared/Toast';
import FloatingActionButton from './components/shared/FloatingActionButton';
import QuickBetModal from './components/shared/QuickBetModal';
import ResponsibleGamblingBanner from './components/shared/ResponsibleGamblingBanner';
import KeyboardShortcuts from './components/shared/KeyboardShortcuts';
import BetSizingCalculator from './components/shared/BetSizingCalculator';
import { mockCurrentUser } from './utils/mockData';

function AppContent() {
  const [isQuickBetOpen, setIsQuickBetOpen] = useState(false);
  const [isKellyOpen, setIsKellyOpen] = useState(false);
  const navigate = useNavigate();

  const shortcuts = [
    { key: 'Ctrl+B', description: 'Quick Bet Entry', action: () => setIsQuickBetOpen(true) },
    { key: 'Ctrl+K', description: 'Kelly Calculator', action: () => setIsKellyOpen(true) },
    { key: 'Ctrl+D', description: 'Dashboard', action: () => navigate('/') },
    { key: 'Ctrl+M', description: 'My Bets', action: () => navigate('/bets') },
    { key: 'Ctrl+O', description: 'Odds Comparison', action: () => navigate('/odds') },
    { key: 'Ctrl+A', description: 'Analytics', action: () => navigate('/analytics') },
    { key: 'Ctrl+S', description: 'Social Feed', action: () => navigate('/social') },
    { key: 'Ctrl+I', description: 'AI Picks', action: () => navigate('/ai-picks') },
    { key: 'Ctrl+W', description: 'Bankroll', action: () => navigate('/bankroll') },
    { key: '?', description: 'Show Shortcuts', action: () => {} },
  ];

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bets" element={<MyBets />} />
          <Route path="/odds" element={<LineComparison />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/social" element={<SocialFeed />} />
          <Route path="/ai-picks" element={<AIPicks />} />
          <Route path="/bankroll" element={<Bankroll />} />
          <Route path="/sportsbooks" element={<Sportsbooks />} />
          <Route path="/earnings" element={<ExpertEarnings />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>

        {/* Global Components */}
        <FloatingActionButton
          onQuickBet={() => setIsQuickBetOpen(true)}
          onKellyCalc={() => setIsKellyOpen(true)}
        />
        <QuickBetModal
          isOpen={isQuickBetOpen}
          onClose={() => setIsQuickBetOpen(false)}
        />
        <BetSizingCalculator
          isOpen={isKellyOpen}
          onClose={() => setIsKellyOpen(false)}
          currentBankroll={mockCurrentUser.stats.currentBalance}
        />
        <ResponsibleGamblingBanner />
        <KeyboardShortcuts shortcuts={shortcuts} />
      </Layout>
    </>
  );
}

function App() {
  return (
    <ToastProvider>
      <Router>
        <AppContent />
      </Router>
    </ToastProvider>
  );
}

export default App;