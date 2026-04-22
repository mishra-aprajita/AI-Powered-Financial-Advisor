import React, { useState } from 'react';
import { Sparkles, ArrowRight, User, DollarSign, Target } from 'lucide-react';

const STEPS = ['welcome', 'profile', 'income', 'goal'];
const EMOJIS = ['😊','😎','🧠','🦁','🌟','🎯','💎','🚀'];

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: '', emoji: '😊', income: '', currency: 'INR', primaryGoal: 'savings'
  });

  const next = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else onComplete(data);
  };

  const canNext = () => {
    if (STEPS[step] === 'profile') return data.name.trim().length > 0;
    if (STEPS[step] === 'income') return data.income.length > 0;
    return true;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #f0f2f7 0%, #e8eaf6 50%, #f3e8ff 100%)' }}>

      {/* Background blobs */}
      <div style={{
        position: 'fixed', top: '-20%', right: '-10%', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'fixed', bottom: '-10%', left: '-5%', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />

      <div className="w-full max-w-md">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {STEPS.map((_, i) => (
            <div key={i} className="rounded-full transition-all duration-300"
              style={{
                width: i === step ? '24px' : '8px', height: '8px',
                background: i <= step ? 'linear-gradient(90deg,#6366f1,#a855f7)' : '#e2e8f0',
              }} />
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-white/50"
          style={{ boxShadow: '0 20px 60px rgba(99,102,241,0.15)' }}>

          {/* STEP 0 — Welcome */}
          {STEPS[step] === 'welcome' && (
            <div className="text-center fade-in">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}>
                <Sparkles size={32} color="white" />
              </div>
              <h1 className="text-3xl font-extrabold text-slate-800 mb-3">Welcome to <span className="gradient-text">FinTrack</span></h1>
              <p className="text-slate-500 leading-relaxed mb-2">Your smart personal finance dashboard.</p>
              <p className="text-slate-400 text-sm">Track expenses, set budgets, and get AI-powered insights — all in one place.</p>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[['📊','Smart Tracking'],['🤖','AI Advisor'],['🎯','Goal Setting']].map(([icon,label]) => (
                  <div key={label} className="p-3 rounded-xl bg-slate-50">
                    <div className="text-2xl mb-1">{icon}</div>
                    <div className="text-xs font-semibold text-slate-500">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1 — Profile */}
          {STEPS[step] === 'profile' && (
            <div className="fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}>
                  <User size={20} color="white" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800">Set up your profile</h2>
                  <p className="text-slate-400 text-sm">How should we address you?</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Your Name</label>
                  <input className="input-field" placeholder="e.g. Alex, Jordan, Sam..."
                    value={data.name} onChange={e => setData({ ...data, name: e.target.value })} autoFocus />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Pick an Avatar</label>
                  <div className="grid grid-cols-8 gap-2">
                    {EMOJIS.map(em => (
                      <button key={em} onClick={() => setData({ ...data, emoji: em })}
                        className="w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all"
                        style={{
                          background: data.emoji === em ? 'linear-gradient(135deg,#6366f1,#a855f7)' : '#f1f5f9',
                          transform: data.emoji === em ? 'scale(1.15)' : 'scale(1)',
                          boxShadow: data.emoji === em ? '0 4px 12px rgba(99,102,241,0.4)' : 'none',
                        }}>
                        {em}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 — Income */}
          {STEPS[step] === 'income' && (
            <div className="fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}>
                  <DollarSign size={20} color="white" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800">Monthly Income</h2>
                  <p className="text-slate-400 text-sm">Helps us give better insights</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Monthly Income</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                    <input className="input-field pl-8" type="number" placeholder="50000"
                      value={data.income} onChange={e => setData({ ...data, income: e.target.value })} autoFocus />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Currency</label>
                  <select className="input-field" value={data.currency}
                    onChange={e => setData({ ...data, currency: e.target.value })}>
                    <option value="INR">🇮🇳 INR — Indian Rupee</option>
                    <option value="USD">🇺🇸 USD — US Dollar</option>
                    <option value="EUR">🇪🇺 EUR — Euro</option>
                    <option value="GBP">🇬🇧 GBP — British Pound</option>
                    <option value="CAD">🇨🇦 CAD — Canadian Dollar</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 — Goal */}
          {STEPS[step] === 'goal' && (
            <div className="fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}>
                  <Target size={20} color="white" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800">Primary Goal</h2>
                  <p className="text-slate-400 text-sm">We'll tailor your dashboard</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'savings',    icon: '💰', label: 'Build Savings',      desc: 'Grow my emergency fund' },
                  { id: 'debt',       icon: '📉', label: 'Pay Off Debt',        desc: 'Reduce loans & credit' },
                  { id: 'invest',     icon: '📈', label: 'Start Investing',     desc: 'Grow my wealth' },
                  { id: 'budget',     icon: '🎯', label: 'Stick to a Budget',   desc: 'Control my spending' },
                ].map(g => (
                  <button key={g.id} onClick={() => setData({ ...data, primaryGoal: g.id })}
                    className="flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left"
                    style={{
                      borderColor: data.primaryGoal === g.id ? '#6366f1' : '#e2e8f0',
                      background: data.primaryGoal === g.id ? 'linear-gradient(135deg,rgba(99,102,241,0.06),rgba(168,85,247,0.06))' : 'white',
                    }}>
                    <span className="text-2xl">{g.icon}</span>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{g.label}</p>
                      <p className="text-xs text-slate-400">{g.desc}</p>
                    </div>
                    {data.primaryGoal === g.id && (
                      <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}>
                        <svg width="10" height="10" viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button onClick={next} disabled={!canNext()}
            className="btn-primary w-full mt-8 py-3.5 rounded-2xl text-base flex items-center justify-center gap-2 disabled:opacity-40">
            {STEPS[step] === 'goal' ? '🚀 Launch Dashboard' : 'Continue'}
            {STEPS[step] !== 'goal' && <ArrowRight size={18} />}
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">No account required · All data stays on your device</p>
      </div>
    </div>
  );
}
