import { utils, write } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Expense } from '@/pages/Expenses';

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

export const exportToCSV = (expenses: Expense[]): string => {
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

export const exportToExcel = (expenses: Expense[]): void => {
  const ws = utils.json_to_sheet(
    expenses.map(expense => ({
      Date: new Date(expense.date).toISOString().split('T')[0],
      Type: expense.type,
      Category: expense.category,
      Description: expense.description,
      Amount: expense.amount,
      Currency: expense.currency,
      'Converted Amount': expense.convertedAmount,
      'Payment Method': expense.paymentMethod,
      Reimbursable: expense.reimbursable ? 'Yes' : 'No'
    }))
  );
  
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Expenses');
  
  const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `expenses_${new Date().toISOString().split('T')[0]}.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToPDF = (expenses: Expense[]): void => {
  const doc = new jsPDF();
  
  const tableColumn = ['Date', 'Type', 'Category', 'Description', 'Amount', 'Currency', 'Converted', 'Payment', 'Reimb.'];
  const tableRows = expenses.map(expense => [
    new Date(expense.date).toISOString().split('T')[0],
    expense.type,
    expense.category,
    expense.description,
    expense.amount.toString(),
    expense.currency,
    expense.convertedAmount.toString(),
    expense.paymentMethod,
    expense.reimbursable ? 'Yes' : 'No'
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    theme: 'grid',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [41, 128, 185] },
  });

  doc.save(`expenses_${new Date().toISOString().split('T')[0]}.pdf`);
};