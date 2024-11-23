import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Expense } from "@/pages/Expenses";

interface ExpenseSummaryProps {
  expenses: Expense[];
  baseCurrency: string;
}

const ExpenseSummary = ({ expenses, baseCurrency }: ExpenseSummaryProps) => {
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.convertedAmount, 0);
  const workExpenses = expenses.filter(e => e.type === "work");
  const privateExpenses = expenses.filter(e => e.type === "private");
  const reimbursableAmount = expenses
    .filter(e => e.reimbursable)
    .reduce((sum, expense) => sum + expense.convertedAmount, 0);

  const categoryData = Object.entries(
    expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.convertedAmount;
      return acc;
    }, {} as Record<string, number>)
  ).map(([category, amount]) => ({
    category,
    amount,
  }));

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAmount.toFixed(2)} {baseCurrency}</div>
          <p className="text-xs text-muted-foreground">
            Work: {workExpenses.reduce((sum, e) => sum + e.convertedAmount, 0).toFixed(2)} {baseCurrency} |
            Private: {privateExpenses.reduce((sum, e) => sum + e.convertedAmount, 0).toFixed(2)} {baseCurrency}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Reimbursable Amount</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{reimbursableAmount.toFixed(2)} {baseCurrency}</div>
          <p className="text-xs text-muted-foreground">
            {expenses.filter(e => e.reimbursable).length} reimbursable expenses
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseSummary;