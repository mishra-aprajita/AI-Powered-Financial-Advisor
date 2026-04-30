import React from 'react';
import { LayoutDashboard, Receipt, PiggyBank, Bot, Sparkles, BarChart2, Moon, Sun, Bell, Settings } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard',  label: 'Dashboard',  icon: LayoutDashboard },
  { id: 'expenses',   label: 'Expenses',   icon: Receipt },
  { id: 'budget',     label: 'Budget',     icon: PiggyBank },
  { id: 'analytics',  label: 'Analytics',  icon: BarChart2 },
  { id: 'advisor',    label: 'AI Advisor', icon: Bot },
];

export default function Navbar({ active, setActive, darkMode, setDarkMode, profile, onProfileClick }) {
  const displayName = profile?.name?.trim() ? profile.name : null;
  const displayEmoji = profile?.emoji || null;

  return (
    <nav className="sticky top-0 z-50 transition-colors duration-300"
      style={{
        background: darkMode ? 'rgba(15,17,23,0.92)' : 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${darkMode ? '#1e2030' : '#e2e8f0'}`,
        boxShadow: '0 1px 12px rgba(99,102,241,0.06)',
      }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}>
            <Sparkles size={15} color="white" />
          </div>
          <span className="font-extrabold text-lg" style={{ color: darkMode ? '#f1f5f9' : '#0f172a' }}>
            <span className="gradient-text">Fin</span>Track
          </span>
        </div>

        {/* Nav Pills */}
        <div className="flex items-center gap-0.5 p-1 rounded-2xl"
          style={{ background: darkMode ? '#1a1d2e' : '#f1f5f9' }}>
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <button key={id} onClick={() => setActive(id)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: isActive ? 'linear-gradient(135deg,#6366f1,#a855f7)' : 'transparent',
                  color: isActive ? 'white' : darkMode ? '#94a3b8' : '#64748b',
                  boxShadow: isActive ? '0 2px 12px rgba(99,102,241,0.3)' : 'none',
                }}>
                <Icon size={14} />
                <span className="hidden md:inline">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="w-9 h-9 rounded-xl flex items-center justify-center relative transition-all hover:scale-105"
            style={{ background: darkMode ? '#1a1d2e' : '#f1f5f9' }}>
            <Bell size={16} color={darkMode ? '#94a3b8' : '#64748b'} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2"
              style={{ borderColor: darkMode ? '#0f1117' : 'white' }} />
          </button>

          <button onClick={() => setDarkMode(d => !d)}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105"
            style={{ background: darkMode ? '#1a1d2e' : '#f1f5f9' }}>
            {darkMode ? <Sun size={16} color="#f59e0b" /> : <Moon size={16} color="#64748b" />}
          </button>

          {/* Avatar — click to edit profile */}
          <button
            onClick={onProfileClick}
            title={displayName ? `${displayName} — Edit profile` : 'Set up profile'}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold hover:scale-105 transition-all hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)', boxShadow: '0 2px 8px rgba(99,102,241,0.3)' }}>
            {displayEmoji && displayName ? displayEmoji : displayName ? displayName.slice(0,2).toUpperCase() : <Settings size={16} />}
          </button>
        </div>

      </div>
    </nav>
  );
}
