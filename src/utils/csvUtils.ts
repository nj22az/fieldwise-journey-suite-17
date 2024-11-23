export const parseConversionRatesCSV = (csvContent: string): Record<string, number> => {
  const rates: Record<string, number> = {};
  const lines = csvContent.split('\n');
  
  lines.forEach(line => {
    if (line.trim()) {
      const [currency, rate] = line.split(',');
      if (currency && rate) {
        rates[currency.trim()] = parseFloat(rate.trim());
      }
    }
  });
  
  return rates;
};

export const exportToCSV = (expenses: any[]): string => {
  const headers = ['Date', 'Type', 'Category', 'Description', 'Amount', 'Currency', 'Converted Amount', 'Payment Method', 'Reimbursable'];
  const rows = expenses.map(expense => [
    new Date(expense.date).toISOString().split('T')[0],
    expense.type,
    expense.category,
    expense.description,
    expense.amount,
    expense.currency,
    expense.convertedAmount,
    expense.paymentMethod,
    expense.reimbursable ? 'Yes' : 'No'
  ]);
  
  return [headers, ...rows].map(row => row.join(',')).join('\n');
};