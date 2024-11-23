import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, Copy, Trash2, History, Edit2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import type { Expense } from "@/pages/Expenses";

interface ExpenseTableProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  onEdit: (expense: Expense) => void;
}

const ExpenseTable = ({ expenses, setExpenses, onEdit }: ExpenseTableProps) => {
  const handleLockToggle = (id: string) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id
          ? { ...expense, isLocked: !expense.isLocked, updatedAt: new Date() }
          : expense
      )
    );
    toast.success("Expense status updated");
  };

  const handleCopy = (expense: Expense) => {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
      isLocked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setExpenses((prev) => [newExpense, ...prev]);
    toast.success("Expense copied successfully");
  };

  const handleDelete = (id: string) => {
    const expense = expenses.find(e => e.id === id);
    if (expense?.isLocked) {
      toast.error("Cannot delete a locked expense");
      return;
    }
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    toast.success("Expense deleted successfully");
  };

  const handleViewHistory = (expense: Expense) => {
    toast.info(`Last modified: ${format(expense.updatedAt, "PPpp")}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{format(expense.date, "PP")}</TableCell>
              <TableCell className="capitalize">{expense.type}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>{expense.amount.toFixed(2)}</TableCell>
              <TableCell>{expense.paymentMethod}</TableCell>
              <TableCell>
                {expense.reimbursable ? "Reimbursable" : "Not Reimbursable"}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleLockToggle(expense.id)}
                  >
                    {expense.isLocked ? (
                      <Lock className="h-4 w-4" />
                    ) : (
                      <Unlock className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(expense)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(expense)}
                    disabled={expense.isLocked}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(expense.id)}
                    disabled={expense.isLocked}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewHistory(expense)}
                  >
                    <History className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpenseTable;