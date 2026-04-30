const CURRENCY_CONFIG = {
  INR: { symbol: '₹', locale: 'en-IN', label: 'Indian Rupee' },
  USD: { symbol: '$', locale: 'en-US', label: 'US Dollar' },
  EUR: { symbol: '€', locale: 'de-DE', label: 'Euro' },
  GBP: { symbol: '£', locale: 'en-GB', label: 'British Pound' },
  CAD: { symbol: 'CA$', locale: 'en-CA', label: 'Canadian Dollar' },
};

export function getCurrencyConfig(code = 'INR') {
  return CURRENCY_CONFIG[code] || CURRENCY_CONFIG['INR'];
}

// Returns symbol only: ₹ / $ / € etc.
export function getSymbol(code = 'INR') {
  return getCurrencyConfig(code).symbol;
}

// Format number with correct locale + symbol: ₹45,748 / $4,280
export function fmt(amount, code = 'INR') {
  const { symbol, locale } = getCurrencyConfig(code);
  const formatted = Number(amount).toLocaleString(locale);
  // EUR/GBP use symbol prefix in our app for simplicity
  return `${symbol}${formatted}`;
}
