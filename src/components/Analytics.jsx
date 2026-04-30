import React, { useMemo, useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis,
  Radar, ScatterChart, Scatter, ZAxis, Cell
} from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { fmt, getSymbol } from '../currency';
import { CATEGORY_COLORS, MONTHLY_DATA, INITIAL_BUDGETS } from '../data';

const RADAR_DATA = [
  { subject: 'Budgeting', score: 85 },
  { subject: 'Savings', score: 72 },
  { subject: 'Consistency', score: 78 },
  { subject: 'Investments', score: 45 },
  { subject: 'Income Growth', score: 60 },
  { subject: 'Debt Mgmt', score: 90 },
];

const DAILY_SPEND = [
  { day: 'Mon', amount: 0 },
  { day: 'Tue', amount: 2400 },
  { day: 'Wed', amount: 1200 },
  { day: 'Thu', amount: 0 },
  { day: 'Fri', amount: 3500 },
  { day: 'Sat', amount: 5800 },
  { day: 'Sun', amount: 1800 },
];

const SCATTER_DATA = [
  { x: 1, y: 1200, z: 400, name: 'Housing' },
  { x: 2, y: 428, z: 200, name: 'Food & Dining' },
  { x: 3, y: 62, z: 80, name: 'Transportation' },
  { x: 4, y: 18, z: 60, name: 'Entertainment' },
  { x: 5, y: 45, z: 70, name: 'Healthcare' },
  { x: 6, y: 155, z: 120, name: 'Shopping' },
];

export default function Analytics({ expenses, budgets, darkMode, currency = 'INR' }) {
  const [period, setPeriod] = useState('6m');

  const INSIGHTS = [
    { icon: '🔥', title: 'Highest spend day', value: 'Saturday', sub: `${getSymbol(currency)}4,200 avg`, color: '#f97316' },
    { icon: '💤', title: 'Lowest spend day', value: 'Monday/Thursday', sub: `${getSymbol(currency)}0 avg`, color: '#10b981' },
    { icon: '📅', title: 'Most frequent category', value: 'Food & Dining', sub: '3 transactions', color: '#f59e0b' },
    { icon: '🎯', title: 'Under budget categories', value: '7 out of 10', sub: 'This month', color: '#6366f1' },
  ];


  const card = darkMode ? '#151722' : 'white';
  const border = darkMode ? '#1e2030' : '#e2e8f0';
  const textMain = darkMode ? '#f1f5f9' : '#0f172a';
  const textMuted = darkMode ? '#64748b' : '#94a3b8';
  const gridColor = darkMode ? '#1e2030' : '#f1f5f9';

  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);
  const totalBudget = Object.values(budgets).reduce((a, b) => a + b, 0);
  const savingsRate = (((80000 - totalSpent) / 80000) * 100).toFixed(1);

  const categorySpend = useMemo(() => {
    const map = {};
    expenses.forEach(e => { map[e.category] = (map[e.category] || 0) + e.amount; });
    return Object.entries(map)
      .map(([cat, spent]) => ({
        cat, spent,
        budget: budgets[cat] || 0,
        diff: (budgets[cat] || 0) - spent,
        pct: budgets[cat] ? Math.round(spent / budgets[cat] * 100) : 0,
      }))
      .sort((a, b) => b.spent - a.spent);
  }, [expenses, budgets]);

  const AreaTip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white shadow-xl rounded-xl px-4 py-3 border border-slate-100 text-sm">
        <p className="font-bold text-slate-600 mb-1">{label}</p>
        {payload.map(p => (
          <p key={p.dataKey} className="font-bold" style={{ color: p.color }}>
            {p.dataKey === 'income' ? 'Income' : 'Spent'}: {fmt(p.value || 0, currency)}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold" style={{ color: textMain }}>Analytics</h1>
          <p className="mt-1 text-sm" style={{ color: textMuted }}>Deep dive into your financial patterns</p>
        </div>
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: darkMode ? '#1a1d2e' : '#f1f5f9' }}>
          {['1m','3m','6m','1y'].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: period === p ? 'linear-gradient(135deg,#6366f1,#a855f7)' : 'transparent',
                color: period === p ? 'white' : textMuted,
              }}>{p}</button>
          ))}
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Net Savings', value: `{fmt((80000 - totalSpent), currency)}`, icon: '💰', color: '#10b981', positive: true },
          { label: 'Savings Rate', value: `${savingsRate}%`, icon: '📈', color: '#6366f1', positive: true },
          { label: 'Avg Daily Spend', value: `{fmt((totalSpent / 22).toFixed(0), currency)}`, icon: '📅', color: '#f59e0b', positive: null },
          { label: 'Budget Variance', value: `{fmt((totalBudget - totalSpent), currency)}`, icon: '🎯', color: '#a855f7', positive: totalBudget > totalSpent },
        ].map(k => (
          <div key={k.label} className="card p-5 fade-in hover:scale-[1.02]"
            style={{ background: card, borderColor: border }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{k.icon}</span>
              {k.positive !== null && (
                k.positive
                  ? <TrendingUp size={16} color="#10b981" />
                  : <TrendingDown size={16} color="#ef4444" />
              )}
              {k.positive === null && <Minus size={16} color={textMuted} />}
            </div>
            <p className="text-xl font-extrabold" style={{ color: k.color }}>{k.value}</p>
            <p className="text-xs font-medium mt-1" style={{ color: textMuted }}>{k.label}</p>
          </div>
        ))}
      </div>

      {/* Area chart — Cashflow */}
      <div className="card p-6 fade-in" style={{ background: card, borderColor: border }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-sm font-bold" style={{ color: textMain }}>Cashflow Overview</p>
            <p className="text-xs mt-0.5" style={{ color: textMuted }}>Income vs spending over time</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={MONTHLY_DATA}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: textMuted }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: textMuted }} axisLine={false} tickLine={false} tickFormatter={v => v >= 100000 ? `{fmt((v/100000).toFixed(1), currency)}L` : `{fmt((v/1000).toFixed(0), currency)}k`} />
            <Tooltip content={<AreaTip />} />
            <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2.5} fill="url(#incomeGrad)" dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }} />
            <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={2.5} fill="url(#spendGrad)" dot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Radar + Daily spend side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Radar */}
        <div className="card p-6 fade-in" style={{ background: card, borderColor: border }}>
          <p className="text-sm font-bold mb-1" style={{ color: textMain }}>Financial Profile</p>
          <p className="text-xs mb-4" style={{ color: textMuted }}>Your strengths across 6 dimensions</p>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke={darkMode ? '#1e2030' : '#e2e8f0'} />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: textMuted }} />
              <Radar dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} dot={{ r: 4, fill: '#6366f1' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Daily spending pattern */}
        <div className="card p-6 fade-in" style={{ background: card, borderColor: border }}>
          <p className="text-sm font-bold mb-1" style={{ color: textMain }}>Daily Spending Pattern</p>
          <p className="text-xs mb-4" style={{ color: textMuted }}>This week's spending by day</p>
          <div className="flex items-end justify-between gap-2 h-44">
            {DAILY_SPEND.map(d => {
              const max = Math.max(...DAILY_SPEND.map(x => x.amount));
              const pct = max > 0 ? (d.amount / max) * 100 : 0;
              return (
                <div key={d.day} className="flex flex-col items-center gap-2 flex-1">
                  <span className="text-xs font-bold" style={{ color: textMuted }}>
                    {d.amount > 0 ? `{fmt(d.amount, currency)}` : '–'}
                  </span>
                  <div className="w-full rounded-t-xl relative flex-1 flex items-end"
                    style={{ background: darkMode ? '#1a1d2e' : '#f1f5f9', minHeight: '120px' }}>
                    <div className="w-full rounded-t-xl transition-all duration-700"
                      style={{
                        height: `${Math.max(pct, 4)}%`,
                        background: d.amount > 150
                          ? 'linear-gradient(180deg,#ef4444,#f97316)'
                          : 'linear-gradient(180deg,#6366f1,#a855f7)',
                        minHeight: pct > 0 ? '8px' : '0',
                      }} />
                  </div>
                  <span className="text-xs font-semibold" style={{ color: textMuted }}>{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category breakdown table */}
      <div className="card p-6 fade-in" style={{ background: card, borderColor: border }}>
        <p className="text-sm font-bold mb-5" style={{ color: textMain }}>Category Deep Dive</p>
        <div className="space-y-3">
          {categorySpend.map(row => (
            <div key={row.cat} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: CATEGORY_COLORS[row.cat] || '#94a3b8' }}>
                {row.cat.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-semibold" style={{ color: textMain }}>{row.cat}</span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-bold" style={{ color: textMain }}>{fmt(row.spent, currency)}</span>
                    <span style={{ color: textMuted }}>/ {fmt(row.budget, currency)}</span>
                    <span className={`font-bold px-2 py-0.5 rounded-full text-xs ${row.diff >= 0 ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
                      {row.diff >= 0 ? `{fmt(row.diff, currency)} left` : `{fmt(Math.abs(row.diff), currency)} over`}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: darkMode ? '#1e2030' : '#f1f5f9' }}>
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(row.pct, 100)}%`,
                      background: row.pct > 100 ? '#ef4444' : row.pct > 80 ? '#f59e0b' : CATEGORY_COLORS[row.cat],
                    }} />
                </div>
              </div>
              <span className="text-xs font-bold w-10 text-right flex-shrink-0"
                style={{ color: row.pct > 100 ? '#ef4444' : textMuted }}>{row.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Insights grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {INSIGHTS.map(ins => (
          <div key={ins.title} className="card p-5 fade-in hover:scale-[1.02]"
            style={{ background: card, borderColor: border }}>
            <div className="text-2xl mb-3">{ins.icon}</div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: textMuted }}>{ins.title}</p>
            <p className="text-base font-extrabold" style={{ color: ins.color }}>{ins.value}</p>
            <p className="text-xs mt-0.5" style={{ color: textMuted }}>{ins.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
