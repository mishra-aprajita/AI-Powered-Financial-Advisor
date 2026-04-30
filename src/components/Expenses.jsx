import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Check, X, Receipt, Search } from 'lucide-react';
import { fmt, getSymbol } from '../currency';
import { CATEGORIES, CATEGORY_COLORS, CATEGORY_ICONS } from '../data';

const EMPTY_FORM = { title: '', amount: '', category: 'Food & Dining', date: '', notes: '' };

export default function Expenses({ expenses, setExpenses, darkMode, currency = 'INR' }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [showForm, setShowForm] = useState(false);


  const card = darkMode ? '#151722' : 'white';
  const border = darkMode ? '#1e2030' : '#e2e8f0';
  const textMain = darkMode ? '#f1f5f9' : '#0f172a';
  const textMuted = darkMode ? '#64748b' : '#94a3b8';
  const inputBg = darkMode ? '#0f1117' : '#f8fafc';
  const inputBorder = darkMode ? '#1e2030' : '#e2e8f0';

  const handleSubmit = () => {
    if (!form.title || !form.amount || !form.date) return;
    if (editId !== null) {
      setExpenses(prev => prev.map(e => e.id === editId ? { ...form, id: editId, amount: parseFloat(form.amount) } : e));
      setEditId(null);
    } else {
      setExpenses(prev => [{ ...form, id: Date.now(), amount: parseFloat(form.amount) }, ...prev]);
    }
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  const handleEdit = (expense) => {
    setForm({ ...expense, amount: String(expense.amount) });
    setEditId(expense.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filtered = expenses.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'All' || e.category === filterCat;
    return matchSearch && matchCat;
  });

  const total = filtered.reduce((s, e) => s + e.amount, 0);

  const inputStyle = {
    background: inputBg,
    border: `1.5px solid ${inputBorder}`,
    borderRadius: '0.75rem',
    padding: '0.65rem 1rem',
    fontFamily: 'inherit',
    fontSize: '0.95rem',
    color: textMain,
    width: '100%',
    outline: 'none',
  };

  return (
    <div className="fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold" style={{ color: textMain }}>Expenses</h1>
          <p className="mt-1 text-sm" style={{ color: textMuted }}>{expenses.length} transactions recorded</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm(EMPTY_FORM); }}
          className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm">
          <Plus size={16} />Add Expense
        </button>
      </div>

      {showForm && (
        <div className="card p-6 fade-in" style={{ background: card, borderColor: '#6366f1', borderLeftWidth: '4px' }}>
          <p className="text-sm font-bold mb-5" style={{ color: textMain }}>
            {editId !== null ? '✏️ Edit Expense' : '➕ New Expense'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Title *', key: 'title', placeholder: 'e.g. Netflix subscription', type: 'text' },
              { label: 'Amount ($) *', key: 'amount', placeholder: '0.00', type: 'number' },
              { label: 'Date *', key: 'date', placeholder: '', type: 'date' },
            ].map(f => (
              <div key={f.key} className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: textMuted }}>{f.label}</label>
                <input style={inputStyle} type={f.type} placeholder={f.placeholder}
                  value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
              </div>
            ))}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: textMuted }}>Category *</label>
              <select style={inputStyle} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map(c => <option key={c} value={c}>{CATEGORY_ICONS[c]} {c}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: textMuted }}>Notes</label>
              <input style={inputStyle} placeholder="Optional note..."
                value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <button onClick={handleSubmit} className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm">
              <Check size={15} />{editId !== null ? 'Update' : 'Save Expense'}
            </button>
            <button onClick={() => { setForm(EMPTY_FORM); setEditId(null); setShowForm(false); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-slate-100"
              style={{ color: textMuted }}>
              <X size={15} />Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: textMuted }} />
          <input style={{ ...inputStyle, paddingLeft: '2.5rem' }} placeholder="Search expenses..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', ...CATEGORIES.slice(0, 5)].map(cat => (
            <button key={cat} onClick={() => setFilterCat(cat)}
              className="text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-150"
              style={{
                background: filterCat === cat ? 'linear-gradient(135deg,#6366f1,#a855f7)' : darkMode ? '#1a1d2e' : '#f1f5f9',
                color: filterCat === cat ? 'white' : textMuted,
              }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm" style={{ color: textMuted }}>
        <Receipt size={14} />
        <span>
          Showing <strong style={{ color: textMain }}>{filtered.length}</strong> expenses —
          Total: <strong className="gradient-text">{fmt(total, currency)}</strong>
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="card p-12 text-center fade-in" style={{ background: card, borderColor: border }}>
          <div className="text-5xl mb-3">🧾</div>
          <p className="font-medium" style={{ color: textMain }}>No expenses found</p>
          <p className="text-sm mt-1" style={{ color: textMuted }}>Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map(expense => (
            <div key={expense.id}
              className="card px-5 py-4 fade-in flex items-center gap-4 group hover:scale-[1.005] cursor-default"
              style={{ background: card, borderColor: border }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                style={{ background: `${CATEGORY_COLORS[expense.category]}20` }}>
                {CATEGORY_ICONS[expense.category] || '📦'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate" style={{ color: textMain }}>{expense.title}</p>
                <p className="text-xs mt-0.5" style={{ color: textMuted }}>
                  {expense.category} · {expense.date}{expense.notes ? ` · ${expense.notes}` : ''}
                </p>
              </div>
              <p className="text-base font-extrabold flex-shrink-0" style={{ color: textMain }}>
                -{fmt(expense.amount, currency)}
              </p>
              <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(expense)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: '#eef2ff', color: '#6366f1' }}>
                  <Pencil size={13} />
                </button>
                <button onClick={() => setExpenses(prev => prev.filter(e => e.id !== expense.id))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: '#fef2f2', color: '#ef4444' }}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
