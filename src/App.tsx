import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Roadmap from './pages/Roadmap';
import Mentor from './pages/Mentor';
import Quiz from './pages/Quiz';
import Certifications from './pages/Certifications';
import Pricing from './pages/Pricing';

function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/mentor" element={<Mentor />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </Layout>
      </SubscriptionProvider>
    </AuthProvider>
  );
}

export default App;