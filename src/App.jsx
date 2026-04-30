import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Expenses from './components/Expenses';
import Budget from './components/Budget';
import Advisor from './components/Advisor';
import Analytics from './components/Analytics';
import Onboarding from './components/Onboarding';
import { INITIAL_EXPENSES, INITIAL_BUDGETS } from './data';

const DEFAULT_PROFILE = { name: '', emoji: '👋', income: '80000', currency: 'INR', primaryGoal: 'savings' };

export default function App() {
  const [active, setActive] = useState('dashboard');
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [budgets, setBudgets] = useState(INITIAL_BUDGETS);
  const [darkMode, setDarkMode] = useState(false);
  
  // Load saved profile, default to empty (no onboarding block)
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('fintrack_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch { return DEFAULT_PROFILE; }
  });
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const handleProfileSave = (p) => {
    setProfile(p);
    setShowOnboarding(false);
    localStorage.setItem('fintrack_profile', JSON.stringify(p));
  };

  if (showOnboarding) {
    return <Onboarding onComplete={handleProfileSave} />;
  }

  const renderSection = () => {
    switch (active) {
      case 'dashboard': return <Dashboard expenses={expenses} profile={profile} darkMode={darkMode} currency={profile?.currency || 'INR'} />;
      case 'expenses':  return <Expenses expenses={expenses} setExpenses={setExpenses} darkMode={darkMode} currency={profile?.currency || 'INR'} />;
      case 'budget':    return <Budget expenses={expenses} budgets={budgets} setBudgets={setBudgets} darkMode={darkMode} currency={profile?.currency || 'INR'} />;
      case 'analytics': return <Analytics expenses={expenses} budgets={budgets} darkMode={darkMode} currency={profile?.currency || 'INR'} />;
      case 'advisor':   return <Advisor expenses={expenses} profile={profile} darkMode={darkMode} currency={profile?.currency || 'INR'} />;
      default: return null;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode' : ''}`}
      style={{ background: darkMode ? '#0f1117' : '#f0f2f7' }}>
      <Navbar
        active={active} setActive={setActive}
        darkMode={darkMode} setDarkMode={setDarkMode}
        profile={profile}
        onProfileClick={() => setShowOnboarding(true)}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {renderSection()}
      </main>
    </div>
  );
}
