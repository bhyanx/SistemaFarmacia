export function formatCurrency(amount, currency = 'PEN') {
    try {
      return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency,
      }).format(amount);
    } catch {
      return `${amount} ${currency}`;
    }
  }