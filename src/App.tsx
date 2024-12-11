import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import Metrics from './pages/Metrics';
import ABTests from './pages/ABTests';
import Notifications from './pages/Notifications';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/ab-tests" element={<ABTests />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;