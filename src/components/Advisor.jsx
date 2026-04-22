import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, TrendingUp, PiggyBank, AlertCircle, Lightbulb } from 'lucide-react';
import { AI_RESPONSES } from '../data';

const SUGGESTIONS = [
  "How's my spending this month?",
  "Where can I save more money?",
  "Am I on track with my budget?",
  "What's my biggest expense?",
  "Tips to boost savings?",
];

export default function Advisor({ expenses, profile, darkMode }) {
  const name = profile?.name || 'there';
  const card = darkMode ? '#151722' : 'white';
  const border = darkMode ? '#1e2030' : '#e2e8f0';
  const textMain = darkMode ? '#f1f5f9' : '#0f172a';
  const textMuted = darkMode ? '#64748b' : '#94a3b8';
  const inputBg = darkMode ? '#1a1d2e' : '#f8fafc';

  const [messages, setMessages] = useState([{
    id: 1, role: 'assistant',
    text: `Hey ${name}! 👋 I'm your AI financial advisor. I've analyzed your spending patterns and I'm ready to give you personalized insights. What would you like to know?`,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const idx = useRef(0);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, thinking]);

  const send = (text) => {
    const msg = text || input.trim();
    if (!msg || thinking) return;
    setInput('');
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: msg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setThinking(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', text: AI_RESPONSES[idx.current % AI_RESPONSES.length], time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      idx.current++;
      setThinking(false);
    }, 1300);
    inputRef.current?.focus();
  };

  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);
  const topCat = (() => {
    const map = {};
    expenses.forEach(e => { map[e.category] = (map[e.category] || 0) + e.amount; });
    return Object.entries(map).sort((a, b) => b[1] - a[1])[0] || ['N/A', 0];
  })();

  return (
    <div className="fade-in space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold" style={{ color: textMain }}>AI Advisor</h1>
        <p className="mt-1 text-sm" style={{ color: textMuted }}>Personalized financial insights powered by AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chat */}
        <div className="lg:col-span-2 card flex flex-col" style={{ height: '580px', background: card, borderColor: border }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: `1px solid ${border}` }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}>
              <Bot size={18} color="white" />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: textMain }}>FinTrack AI</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <p className="text-xs text-emerald-500 font-medium">Online · Analyzing your data</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ background: darkMode ? '#1a1d2e' : '#f1f5f9', color: textMuted }}>
              <Sparkles size={12} color="#6366f1" /> AI-Powered
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-3 chat-bubble-in ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={msg.role === 'assistant'
                    ? { background: 'linear-gradient(135deg,#6366f1,#a855f7)' }
                    : { background: darkMode ? '#1a1d2e' : '#e2e8f0' }}>
                  {msg.role === 'assistant' ? <Bot size={15} color="white" /> : <User size={15} color={textMuted} />}
                </div>
                <div className={`max-w-xs sm:max-w-sm flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className="px-4 py-3 rounded-2xl text-sm leading-relaxed"
                    style={msg.role === 'user'
                      ? { background: 'linear-gradient(135deg,#6366f1,#a855f7)', color: 'white', borderTopRightRadius: '4px' }
                      : { background: darkMode ? '#1a1d2e' : '#f8fafc', color: textMain, borderTopLeftRadius: '4px', border: `1px solid ${border}` }}>
                    {msg.text}
                  </div>
                  <p className="text-xs px-1" style={{ color: textMuted }}>{msg.time}</p>
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex gap-3 chat-bubble-in">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}>
                  <Bot size={15} color="white" />
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center"
                  style={{ background: darkMode ? '#1a1d2e' : '#f8fafc', border: `1px solid ${border}` }}>
                  {[0,1,2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full"
                      style={{ background: textMuted, animation: `bounce 1.2s ease ${i*0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          <div className="px-5 py-2 flex gap-2 flex-wrap" style={{ borderTop: `1px solid ${border}` }}>
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => send(s)}
                className="text-xs font-medium px-3 py-1.5 rounded-full transition-all"
                style={{ background: darkMode ? '#1a1d2e' : '#eef2ff', color: '#6366f1' }}>
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-5 pb-5 pt-2">
            <div className="flex gap-2 items-center rounded-2xl px-4 py-2.5 transition-all"
              style={{ background: inputBg, border: `1.5px solid ${border}` }}>
              <input ref={inputRef}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: textMain }}
                placeholder="Ask me anything about your finances..."
                value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()} />
              <button onClick={() => send()} disabled={!input.trim() || thinking}
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}>
                <Send size={14} color="white" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <div className="card p-5 fade-in" style={{ background: card, borderColor: border }}>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={16} color="#6366f1" />
              <p className="text-sm font-bold" style={{ color: textMain }}>Quick Insights</p>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100">
                <p className="text-xs font-bold text-indigo-600 mb-1">💡 Top Tip</p>
                <p className="text-xs text-indigo-800">You could save ~₹1,500/month by reducing Food & Dining expenses.</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                <p className="text-xs font-bold text-amber-600 mb-1">⚠️ Watch Out</p>
                <p className="text-xs text-amber-800">Shopping budget is 52% used — 18 days left this month.</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <p className="text-xs font-bold text-emerald-600 mb-1">✅ Great Job</p>
                <p className="text-xs text-emerald-800">You're 8% under your total budget target this month!</p>
              </div>
            </div>
          </div>

          <div className="card p-5 fade-in" style={{ background: card, borderColor: border }}>
            <p className="text-sm font-bold mb-4" style={{ color: textMain }}>Your Stats</p>
            <div className="space-y-3">
              {[
                { icon: TrendingUp, label: 'Total spent', value: `₹${totalSpent.toLocaleString('en-IN')}`, color: '#6366f1' },
                { icon: AlertCircle, label: 'Top category', value: topCat[0], color: '#f59e0b' },
                { icon: PiggyBank, label: 'Health score', value: '78 / 100', color: '#10b981' },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm" style={{ color: textMuted }}>
                    <s.icon size={14} />
                    <span>{s.label}</span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Goal aligned with profile */}
          {profile?.primaryGoal && (
            <div className="card p-5 fade-in" style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.08),rgba(168,85,247,0.08))', borderColor: '#c4b5fd' }}>
              <p className="text-xs font-bold text-indigo-600 mb-2 uppercase tracking-wider">Your Goal</p>
              <p className="text-sm font-bold" style={{ color: textMain }}>
                {{
                  savings: '💰 Build Savings',
                  debt: '📉 Pay Off Debt',
                  invest: '📈 Start Investing',
                  budget: '🎯 Stick to Budget',
                }[profile.primaryGoal]}
              </p>
              <p className="text-xs mt-1.5" style={{ color: textMuted }}>
                Ask me for a personalized plan to achieve this goal!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
