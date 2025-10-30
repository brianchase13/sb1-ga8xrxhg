import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import MyBets from './pages/MyBets';
import LineComparison from './pages/LineComparison';
import Analytics from './pages/Analytics';
import SocialFeed from './pages/SocialFeed';
import AIPicks from './pages/AIPicks';
import Bankroll from './pages/Bankroll';
import Sportsbooks from './pages/Sportsbooks';
import { ToastProvider } from './components/shared/Toast';
import FloatingActionButton from './components/shared/FloatingActionButton';
import QuickBetModal from './components/shared/QuickBetModal';

function App() {
  const [isQuickBetOpen, setIsQuickBetOpen] = useState(false);

  return (
    <ToastProvider>
      <Router>
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
          </Routes>

          {/* Global Components */}
          <FloatingActionButton onQuickBet={() => setIsQuickBetOpen(true)} />
          <QuickBetModal
            isOpen={isQuickBetOpen}
            onClose={() => setIsQuickBetOpen(false)}
          />
        </Layout>
      </Router>
    </ToastProvider>
  );
}

export default App;