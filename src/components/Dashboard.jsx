import React, { useMemo, useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area } from 'recharts';
import { TrendingUp, Wallet, Target, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';
import { CATEGORY_COLORS, MONTHLY_DATA, INITIAL_BUDGETS, TICKER_TIPS, RECENT_ACTIVITY } from '../data';

const HEALTH_SCORE = 78;

// Animated counter hook
function useCountUp(end, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return val;
}

function StatCard({ icon: Icon, label, value, numericValue, sub, color, trend, darkMode }) {
  const count = useCountUp(numericValue || 0);
  const display = numericValue !== undefined
    ? value.replace(/[\d,]+/, count.toLocaleString('en-IN'))
    : value;

  return (
    <div className="card p-6 fade-in flex flex-col gap-3 hover:scale-[1.02]"
      style={{ background: darkMode ? '#151722' : 'white', borderColor: darkMode ? '#1e2030' : '#e2e8f0' }}>
      <div className="flex items-center justify-between">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: `${color}20` }}>
          <Icon size={21} color={color} />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${trend >= 0 ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
            {trend >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider mb-1.5"
          style={{ color: darkMode ? '#64748b' : '#94a3b8' }}>{label}</p>
        <p className="text-2xl font-extrabold" style={{ color: darkMode ? '#f1f5f9' : '#0f172a' }}>
          {display}
        </p>
        {sub && <p className="text-xs mt-1" style={{ color: darkMode ? '#475569' : '#94a3b8' }}>{sub}</p>}
      </div>
    </div>
  );
}

function Ticker({ darkMode }) {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % TICKER_TIPS.length);
        setFade(true);
      }, 400);
    }, 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="rounded-2xl px-5 py-3 flex items-center gap-3 overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)', boxShadow: '0 4px 20px rgba(99,102,241,0.25)' }}>
      <Zap size={16} color="white" style={{ flexShrink: 0 }} />
      <span className="text-white text-sm font-semibold transition-opacity duration-400"
        style={{ opacity: fade ? 1 : 0 }}>
        {TICKER_TIPS[idx]}
      </span>
    </div>
  );
}

function HealthRing({ score, darkMode }) {
  const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
  const c = 2 * Math.PI * 54;
  const dash = (score / 100) * c;
  return (
    <div className="card p-6 fade-in flex flex-col gap-4"
      style={{ background: darkMode ? '#151722' : 'white', borderColor: darkMode ? '#1e2030' : '#e2e8f0' }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: darkMode ? '#64748b' : '#94a3b8' }}>Financial Health</p>
          <p className="text-lg font-extrabold mt-0.5" style={{ color: darkMode ? '#f1f5f9' : '#0f172a' }}>Overall Score</p>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-600">Good ✓</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative w-28 h-28 flex-shrink-0">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            <circle cx="60" cy="60" r="54" fill="none" stroke={darkMode ? '#1e2030' : '#f1f5f9'} strokeWidth="10" />
            <circle cx="60" cy="60" r="54" fill="none" stroke={color} strokeWidth="10"
              strokeDasharray={`${dash} ${c}`} strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 1.2s ease' }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold" style={{ color }}>{score}</span>
            <span className="text-xs" style={{ color: darkMode ? '#475569' : '#94a3b8' }}>/100</span>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 flex-1">
          {[{ label: 'Budgeting', val: 85 },{ label: 'Savings', val: 72 },{ label: 'Spending', val: 68 }].map(item => (
            <div key={item.label}>
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: darkMode ? '#94a3b8' : '#64748b' }} className="font-medium">{item.label}</span>
                <span className="font-bold" style={{ color: darkMode ? '#f1f5f9' : '#0f172a' }}>{item.val}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: darkMode ? '#1e2030' : '#f1f5f9' }}>
                <div className="h-full rounded-full" style={{ width: `${item.val}%`, background: 'linear-gradient(90deg,#6366f1,#a855f7)', transition: 'width 1s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CustomPieTip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white shadow-xl rounded-xl px-4 py-2.5 border border-slate-100 text-sm">
      <p className="font-bold text-slate-800">{payload[0].name}</p>
      <p className="text-slate-500">₹${payload[0].value.toLocaleString('en-IN')}</p>
    </div>
  );
};

const CustomBarTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white shadow-xl rounded-xl px-4 py-3 border border-slate-100 text-sm space-y-1">
      <p className="font-semibold text-slate-500">{label}</p>
      <p className="font-bold text-emerald-600">Income: ₹${payload[1]?.value?.toLocaleString('en-IN')}</p>
      <p className="font-bold text-indigo-600">Spent: ₹${payload[0]?.value?.toLocaleString('en-IN')}</p>
    </div>
  );
};

export default function Dashboard({ expenses, profile, darkMode }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const name = profile?.name || 'there';

  const totalSpent = useMemo(() => expenses.reduce((s, e) => s + e.amount, 0), [expenses]);
  const totalBudget = useMemo(() => Object.values(INITIAL_BUDGETS).reduce((a, b) => a + b, 0), []);

  const pieData = useMemo(() => {
    const map = {};
    expenses.forEach(e => { map[e.category] = (map[e.category] || 0) + e.amount; });
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [expenses]);

  const budgetUsed = ((totalSpent / totalBudget) * 100).toFixed(0);
  const top5 = pieData.slice(0, 5);

  const card = darkMode ? '#151722' : 'white';
  const border = darkMode ? '#1e2030' : '#e2e8f0';
  const textMain = darkMode ? '#f1f5f9' : '#0f172a';
  const textMuted = darkMode ? '#64748b' : '#94a3b8';

  return (
    <div className="fade-in space-y-5">
      {/* Greeting row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold" style={{ color: textMain }}>
            {greeting}, <span className="gradient-text">{name}</span> {profile?.emoji || '👋'}
          </h1>
          <p className="mt-1 text-sm" style={{ color: textMuted }}>Here's your financial overview for April 2026</p>
        </div>
        <Ticker darkMode={darkMode} />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Wallet} label="Available Balance" value="₹34,252" numericValue={34252}
          sub="Updated just now" color="#6366f1" trend={5.2} darkMode={darkMode} />
        <StatCard icon={TrendingUp} label="Total Spent" value={`₹${totalSpent.toLocaleString('en-IN')}`} numericValue={totalSpent}
          sub="This month" color="#f59e0b" trend={-3.1} darkMode={darkMode} />
        <StatCard icon={Target} label="Budget Used" value={`${budgetUsed}%`}
          sub={`₹${totalSpent.toLocaleString('en-IN')} / ₹${totalBudget.toLocaleString('en-IN')}`} color="#10b981" darkMode={darkMode} />
        <StatCard icon={TrendingUp} label="Savings Rate" value="18.4%" numericValue={18}
          sub="↑ 2.1% from last month" color="#a855f7" trend={2.1} darkMode={darkMode} />
      </div>

      {/* Health + Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <HealthRing score={HEALTH_SCORE} darkMode={darkMode} />
        <div className="card p-6 fade-in flex flex-col gap-4"
          style={{ background: card, borderColor: border }}>
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: textMuted }}>Savings Goals</p>
            <span className="text-xs text-indigo-500 font-semibold cursor-pointer hover:underline">View all</span>
          </div>
          {[
            { label: 'Emergency Fund', current: 52000, goal: 100000, color: '#6366f1', icon: '🛡️' },
            { label: 'New MacBook', current: 18000, goal: 120000, color: '#10b981', icon: '💻' },
            { label: 'Vacation Fund', current: 14000, goal: 50000, color: '#f59e0b', icon: '🏖️' },
          ].map(g => {
            const pct = Math.round(g.current / g.goal * 100);
            return (
              <div key={g.label}>
                <div className="flex justify-between text-sm mb-1.5 items-center">
                  <span className="font-semibold flex items-center gap-1.5" style={{ color: textMain }}>
                    <span>{g.icon}</span>{g.label}
                  </span>
                  <span className="font-bold text-xs" style={{ color: g.color }}>
                    ₹${g.current.toLocaleString('en-IN')} <span style={{ color: textMuted }} className="font-normal">/ ₹${g.goal.toLocaleString('en-IN')}</span>
                  </span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: darkMode ? '#1e2030' : '#f1f5f9' }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: g.color, transition: 'width 1s ease' }} />
                </div>
                <p className="text-xs mt-1" style={{ color: textMuted }}>{pct}% complete</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Pie */}
        <div className="card p-6 fade-in lg:col-span-2" style={{ background: card, borderColor: border }}>
          <p className="text-sm font-bold mb-4" style={{ color: textMain }}>Expense Breakdown</p>
          <ResponsiveContainer width="100%" height={190}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={52} outerRadius={82} paddingAngle={3} dataKey="value">
                {pieData.map(e => <Cell key={e.name} fill={CATEGORY_COLORS[e.name] || '#94a3b8'} />)}
              </Pie>
              <Tooltip content={<CustomPieTip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-2">
            {top5.map(item => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: CATEGORY_COLORS[item.name] }} />
                  <span style={{ color: darkMode ? '#94a3b8' : '#64748b' }} className="font-medium">{item.name}</span>
                </div>
                <span className="font-bold" style={{ color: textMain }}>₹${item.value.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar — income vs expenses */}
        <div className="card p-6 fade-in lg:col-span-3" style={{ background: card, borderColor: border }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold" style={{ color: textMain }}>Income vs Expenses</p>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block bg-emerald-400"></span><span style={{ color: textMuted }}>Income</span></span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block bg-indigo-400"></span><span style={{ color: textMuted }}>Spent</span></span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={245}>
            <BarChart data={MONTHLY_DATA} barSize={18} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#1e2030' : '#f1f5f9'} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: textMuted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: textMuted }} axisLine={false} tickLine={false} tickFormatter={v => v >= 100000 ? `₹${(v/100000).toFixed(1)}L` : `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomBarTip />} cursor={{ fill: 'rgba(99,102,241,0.05)', radius: 8 }} />
              <Bar dataKey="amount" radius={[6,6,0,0]} fill="#6366f1" opacity={0.85} />
              <Bar dataKey="income" radius={[6,6,0,0]} fill="#10b981" opacity={0.7} />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card p-6 fade-in" style={{ background: card, borderColor: border }}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-bold" style={{ color: textMain }}>Recent Activity</p>
          <span className="text-xs text-indigo-500 font-semibold cursor-pointer hover:underline">See all</span>
        </div>
        <div className="space-y-3">
          {RECENT_ACTIVITY.map(item => (
            <div key={item.id} className="flex items-center gap-4 py-1">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: darkMode ? '#1a1d2e' : '#f8fafc' }}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: textMain }}>{item.title}</p>
                <p className="text-xs" style={{ color: textMuted }}>{item.category} · {item.time}</p>
              </div>
              <span className={`text-sm font-extrabold flex-shrink-0 ${item.type === 'income' ? 'text-emerald-500' : 'text-red-400'}`}>
                {item.type === 'income' ? '+' : '-'}₹${Math.abs(item.amount).toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Budget strip */}
      <div className="card p-6 fade-in" style={{ background: card, borderColor: border }}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-bold" style={{ color: textMain }}>Budget Overview</p>
          <span className="text-xs font-medium" style={{ color: textMuted }}>April 2026</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {top5.map(item => {
            const budget = INITIAL_BUDGETS[item.name] || 0;
            const pct = Math.min(Math.round(item.value / budget * 100), 100);
            const over = item.value > budget;
            return (
              <div key={item.name} className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: CATEGORY_COLORS[item.name] }} />
                  <span className="text-xs font-semibold truncate" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{item.name}</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: darkMode ? '#1e2030' : '#f1f5f9' }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: over ? '#ef4444' : CATEGORY_COLORS[item.name], transition: 'width 1s ease' }} />
                </div>
                <div className="flex justify-between text-xs">
                  <span className={`font-bold ${over ? 'text-red-500' : ''}`} style={{ color: over ? '#ef4444' : textMain }}>{pct}%</span>
                  <span style={{ color: textMuted }}>₹${budget}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
