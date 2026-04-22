import React, { useState, useMemo } from 'react';
import { Check, AlertTriangle, TrendingUp } from 'lucide-react';
import { CATEGORIES, CATEGORY_COLORS, CATEGORY_ICONS } from '../data';

export default function Budget({ expenses, budgets, setBudgets, darkMode }) {
  const [editCat, setEditCat] = useState(null);
  const [editVal, setEditVal] = useState('');

  const card = darkMode ? '#151722' : 'white';
  const border = darkMode ? '#1e2030' : '#e2e8f0';
  const textMain = darkMode ? '#f1f5f9' : '#0f172a';
  const textMuted = darkMode ? '#64748b' : '#94a3b8';

  const spent = useMemo(() => {
    const map = {};
    expenses.forEach(e => { map[e.category] = (map[e.category] || 0) + e.amount; });
    return map;
  }, [expenses]);

  const totalBudget = Object.values(budgets).reduce((a, b) => a + b, 0);
  const totalSpent = Object.values(spent).reduce((a, b) => a + b, 0);
  const overallPct = Math.round(totalSpent / totalBudget * 100);
  const overCount = CATEGORIES.filter(c => (spent[c] || 0) > budgets[c]).length;

  const handleSave = (cat) => {
    const val = parseFloat(editVal);
    if (!isNaN(val) && val > 0) setBudgets(prev => ({ ...prev, [cat]: val }));
    setEditCat(null); setEditVal('');
  };

  return (
    <div className="fade-in space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold" style={{ color: textMain }}>Budget</h1>
        <p className="mt-1 text-sm" style={{ color: textMuted }}>Set and track your category budgets</p>
      </div>

      {/* Banner */}
      <div className="card p-6 fade-in noise-bg" style={{
        background: 'linear-gradient(135deg,#6366f1 0%,#a855f7 100%)',
        borderColor: 'transparent',
      }}>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-indigo-200 text-xs font-semibold uppercase tracking-widest mb-1">Monthly Budget Overview</p>
            <p className="text-4xl font-extrabold text-white">
              ₹${totalSpent.toLocaleString('en-IN')} <span className="text-2xl text-indigo-200">/ ₹${totalBudget.toLocaleString('en-IN')}</span>
            </p>
            <p className="text-indigo-200 text-sm mt-1">{overallPct}% of total budget used</p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">₹${(totalBudget - totalSpent).toLocaleString('en-IN')}</p>
              <p className="text-indigo-200 text-xs mt-0.5">Remaining</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{overCount}</p>
              <p className="text-indigo-200 text-xs mt-0.5">Over budget</p>
            </div>
          </div>
        </div>
        <div className="relative z-10 mt-5 h-2.5 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white/80 rounded-full transition-all duration-1000"
            style={{ width: `${Math.min(overallPct, 100)}%` }} />
        </div>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORIES.map(cat => {
          const budget = budgets[cat] || 0;
          const catSpent = spent[cat] || 0;
          const pct = budget > 0 ? Math.min(Math.round(catSpent / budget * 100), 100) : 0;
          const over = catSpent > budget;
          const warn = pct > 80 && !over;
          const color = over ? '#ef4444' : warn ? '#f59e0b' : CATEGORY_COLORS[cat] || '#6366f1';
          const remaining = budget - catSpent;

          return (
            <div key={cat} className="card p-5 fade-in hover:scale-[1.01]"
              style={{ background: card, borderColor: over ? '#fca5a5' : border }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${CATEGORY_COLORS[cat]}18` }}>
                    {CATEGORY_ICONS[cat] || '📦'}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: textMain }}>{cat}</p>
                    <p className="text-xs" style={{ color: textMuted }}>{pct}% used</p>
                  </div>
                </div>
                <div>
                  {over ? (
                    <span className="flex items-center gap-1 text-xs text-red-500 font-bold bg-red-50 px-2.5 py-1 rounded-full">
                      <AlertTriangle size={11} /> Over
                    </span>
                  ) : warn ? (
                    <span className="flex items-center gap-1 text-xs text-amber-600 font-bold bg-amber-50 px-2.5 py-1 rounded-full">
                      <TrendingUp size={11} /> High
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
                      <Check size={11} /> OK
                    </span>
                  )}
                </div>
              </div>

              <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: darkMode ? '#1e2030' : '#f1f5f9' }}>
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: color }} />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-bold" style={{ color: textMain }}>₹${catSpent.toLocaleString('en-IN')}</span>
                  <span style={{ color: textMuted }}> / </span>
                  {editCat === cat ? (
                    <span className="inline-flex items-center gap-1">
                      <input
                        style={{ background: darkMode ? '#0f1117' : '#f8fafc', border: `1.5px solid #6366f1`, borderRadius: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.8rem', color: textMain, width: '80px', outline: 'none', fontFamily: 'inherit' }}
                        type="number" min="0" value={editVal}
                        onChange={e => setEditVal(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSave(cat)} autoFocus />
                      <button onClick={() => handleSave(cat)} className="btn-primary px-2 py-1 rounded-lg text-xs">✓</button>
                      <button onClick={() => setEditCat(null)} className="px-2 py-1 rounded-lg text-xs font-semibold"
                        style={{ background: darkMode ? '#1a1d2e' : '#f1f5f9', color: textMuted }}>✕</button>
                    </span>
                  ) : (
                    <button onClick={() => { setEditCat(cat); setEditVal(String(budget)); }}
                      className="font-semibold hover:text-indigo-500 transition-colors underline-offset-2 hover:underline"
                      style={{ color: textMuted }}>
                      ₹${budget.toLocaleString('en-IN')}
                    </button>
                  )}
                </div>
                <span className="text-xs font-semibold" style={{ color: over ? '#ef4444' : textMuted }}>
                  {over ? `₹${Math.abs(remaining).toLocaleString('en-IN')} over` : `₹${remaining.toLocaleString('en-IN')} left`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
