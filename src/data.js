export const CATEGORIES = [
  'Housing', 'Food & Dining', 'Transportation', 'Entertainment',
  'Healthcare', 'Shopping', 'Utilities', 'Travel', 'Education', 'Other'
];

export const CATEGORY_COLORS = {
  'Housing':        '#6366f1',
  'Food & Dining':  '#f59e0b',
  'Transportation': '#10b981',
  'Entertainment':  '#ec4899',
  'Healthcare':     '#3b82f6',
  'Shopping':       '#a855f7',
  'Utilities':      '#14b8a6',
  'Travel':         '#f97316',
  'Education':      '#84cc16',
  'Other':          '#94a3b8',
};

export const CATEGORY_ICONS = {
  'Housing':        '🏠',
  'Food & Dining':  '🍽️',
  'Transportation': '🚗',
  'Entertainment':  '🎬',
  'Healthcare':     '💊',
  'Shopping':       '🛍️',
  'Utilities':      '⚡',
  'Travel':         '✈️',
  'Education':      '📚',
  'Other':          '📦',
};

export const INITIAL_EXPENSES = [
  { id: 1,  title: 'Rent',          amount: 18000, category: 'Housing',        date: '2026-04-01', notes: 'Monthly rent' },
  { id: 2,  title: 'Groceries',     amount: 5500,  category: 'Food & Dining',  date: '2026-04-05', notes: 'Weekly groceries' },
  { id: 3,  title: 'Netflix',       amount: 649,   category: 'Entertainment',  date: '2026-04-06', notes: '' },
  { id: 4,  title: 'Gym',           amount: 1200,  category: 'Healthcare',     date: '2026-04-07', notes: 'Monthly membership' },
  { id: 5,  title: 'Ola/Uber',      amount: 1800,  category: 'Transportation', date: '2026-04-10', notes: 'Weekly rides' },
  { id: 6,  title: 'Electricity',   amount: 2200,  category: 'Utilities',      date: '2026-04-12', notes: '' },
  { id: 7,  title: 'Dinner Out',    amount: 2400,  category: 'Food & Dining',  date: '2026-04-14', notes: 'Anniversary dinner' },
  { id: 8,  title: 'Clothes',       amount: 3500,  category: 'Shopping',       date: '2026-04-18', notes: 'Winter sale' },
  { id: 9,  title: 'Flight',        amount: 8500,  category: 'Travel',         date: '2026-04-20', notes: 'Weekend trip' },
  { id: 10, title: 'Online Course', amount: 1999,  category: 'Education',      date: '2026-04-22', notes: 'React course' },
];

export const INITIAL_BUDGETS = {
  'Housing':        22000,
  'Food & Dining':  10000,
  'Transportation': 4000,
  'Entertainment':  2500,
  'Healthcare':     3000,
  'Shopping':       6000,
  'Utilities':      3000,
  'Travel':         10000,
  'Education':      4000,
  'Other':          2000,
};

export const MONTHLY_DATA = [
  { month: 'Nov', amount: 38000, income: 72000 },
  { month: 'Dec', amount: 44000, income: 72000 },
  { month: 'Jan', amount: 35000, income: 78000 },
  { month: 'Feb', amount: 52000, income: 78000 },
  { month: 'Mar', amount: 68000, income: 85000 },
  { month: 'Apr', amount: 45748, income: 80000 },
];

export const AI_RESPONSES = [
  "Based on your spending patterns, Housing takes up 39% of your monthly expenses — well within the 50% guideline. Great job!",
  "I noticed your Food & Dining spending has increased by 12% this month. Consider meal prepping to save ~₹1,500/month.",
  "You're on track to meet your savings goal! At your current rate, you'll exceed it by 8% before the deadline.",
  "Your biggest opportunity to save is in Shopping. You've used 58% of that budget already this month.",
  "Pro tip: Your electricity bill tends to spike in summer. Consider setting a higher budget of ₹3,000 for Apr–Jun.",
  "You've been consistent with your gym membership — that's a great investment in your health! 💪",
  "Overall financial health score: 78/100. Budgeting discipline is strong, but reduce impulse shopping to improve.",
  "Consider moving ₹2,000 from your Travel budget to Savings — you're under-spending on travel by 16%.",
  "Your savings rate of 43% is excellent! The recommended minimum is 20%. Keep it up!",
  "Looking at 6-month trends, your December spike was holiday shopping. A seasonal budget cap could help next year.",
];

export const TICKER_TIPS = [
  "💡 You saved ₹3,200 more this month vs last month",
  "📊 Food & Dining is your fastest-growing expense (+12%)",
  "🎯 Emergency Fund is 64% funded — keep going!",
  "⚡ Utilities spending is under budget by ₹800",
  "🛍️ Shopping budget 58% used with 13 days remaining",
  "💰 Your savings rate is 43% — excellent work!",
  "📈 Net worth increased by ₹6,500 this month",
];

export const RECENT_ACTIVITY = [
  { id: 1, type: 'expense', title: 'Online Course',  amount: -1999,  category: 'Education',    time: '2 hours ago', icon: '📚' },
  { id: 2, type: 'expense', title: 'Flight Tickets', amount: -8500,  category: 'Travel',       time: 'Yesterday',   icon: '✈️' },
  { id: 3, type: 'income',  title: 'Salary Deposit', amount: +80000, category: 'Income',       time: 'Apr 20',      icon: '💵' },
  { id: 4, type: 'expense', title: 'Clothes',        amount: -3500,  category: 'Shopping',     time: 'Apr 18',      icon: '🛍️' },
  { id: 5, type: 'expense', title: 'Dinner Out',     amount: -2400,  category: 'Food & Dining',time: 'Apr 14',      icon: '🍽️' },
  { id: 6, type: 'income',  title: 'Freelance Pay',  amount: +15000, category: 'Income',       time: 'Apr 12',      icon: '💻' },
];
