import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import ExpenseTable from "@/components/expenses/ExpenseTable";
import ExpenseSummary from "@/components/expenses/ExpenseSummary";
import ExpenseHeader from "@/components/expenses/ExpenseHeader";
import { toast } from "sonner";
import { parseConversionRatesCSV, exportToCSV, exportToExcel, exportToPDF } from "@/utils/csvUtils";
import { sampleExpenseReports } from "@/utils/sampleExpenseReports";

export type Expense = {
  id: string;
  date: Date;
  type: "work" | "private";
  category: string;
  description: string;
  amount: number;
  currency: string;
  convertedAmount: number;
  conversionRate: number;
  paymentMethod: string;
  reimbursable: boolean;
  isLocked: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [baseCurrency, setBaseCurrency] = useState("SEK");
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [conversionRates, setConversionRates] = useState<Record<string, number>>({
    USD: 10.45,
    EUR: 11.35,
    GBP: 13.23,
    JPY: 0.071,
    AUD: 6.85,
    CAD: 7.75,
    CHF: 11.92,
    CNY: 1.45,
    SEK: 1,
    NZD: 6.42
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddExpense = (expenseData: Omit<Expense, "id" | "createdAt" | "updatedAt" | "isLocked">) => {
    if (editingExpense) {
      // Update existing expense
      setExpenses(prev => prev.map(exp => 
        exp.id === editingExpense.id 
          ? {
              ...exp,
              ...expenseData,
              updatedAt: new Date()
            }
          : exp
      ));
      setEditingExpense(null);
      toast.success("Expense updated successfully");
    } else {
      // Add new expense
      const newExpense: Expense = {
        ...expenseData,
        id: crypto.randomUUID(),
        isLocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setExpenses((prev) => [newExpense, ...prev]);
      toast.success("Expense added successfully");
    }
  };

  const handleEditExpense = (expense: Expense) => {
    if (expense.isLocked) {
      toast.error("Cannot edit a locked expense");
      return;
    }
    setEditingExpense(expense);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBaseCurrencyChange = (newCurrency: string) => {
    setBaseCurrency(newCurrency);
    toast.success(`Base currency changed to ${newCurrency}`);
  };

  const handleImportRates = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const newRates = parseConversionRatesCSV(content);
          setConversionRates(prev => ({ ...prev, ...newRates }));
          toast.success("Conversion rates imported successfully");
        } catch (error) {
          toast.error("Failed to import conversion rates");
        }
      };
      reader.readAsText(file);
    }
  };

  const loadSampleReport = () => {
    const randomIndex = Math.floor(Math.random() * sampleExpenseReports.length);
    const report = sampleExpenseReports[randomIndex];
    setExpenses(report.expenses);
    toast.success(`Loaded sample report: ${report.name}`);
  };

  return (
    <div className="space-y-6">
      <ExpenseHeader
        baseCurrency={baseCurrency}
        conversionRates={conversionRates}
        onBaseCurrencyChange={handleBaseCurrencyChange}
        onImportRates={handleImportRates}
        onLoadSample={loadSampleReport}
        onExportCSV={() => exportToCSV(expenses)}
        onExportExcel={() => exportToExcel(expenses)}
        onExportPDF={() => exportToPDF(expenses)}
        fileInputRef={fileInputRef}
      />

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Expenses</TabsTrigger>
          <TabsTrigger value="work">Work</TabsTrigger>
          <TabsTrigger value="private">Private</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          <ExpenseSummary expenses={expenses} baseCurrency={baseCurrency} />
          <Card className="p-6">
            <ExpenseForm 
              onSubmit={handleAddExpense} 
              baseCurrency={baseCurrency}
              conversionRates={conversionRates}
              editingExpense={editingExpense}
            />
          </Card>
          <ExpenseTable 
            expenses={expenses} 
            setExpenses={setExpenses} 
            onEdit={handleEditExpense}
          />
        </TabsContent>
        
        <TabsContent value="work" className="space-y-6">
          <ExpenseSummary expenses={expenses.filter(e => e.type === "work")} baseCurrency={baseCurrency} />
          <Card className="p-6">
            <ExpenseForm 
              onSubmit={handleAddExpense} 
              defaultType="work"
              baseCurrency={baseCurrency}
              conversionRates={conversionRates}
              editingExpense={editingExpense}
            />
          </Card>
          <ExpenseTable 
            expenses={expenses.filter(e => e.type === "work")} 
            setExpenses={setExpenses}
            onEdit={handleEditExpense}
          />
        </TabsContent>
        
        <TabsContent value="private" className="space-y-6">
          <ExpenseSummary expenses={expenses.filter(e => e.type === "private")} baseCurrency={baseCurrency} />
          <Card className="p-6">
            <ExpenseForm 
              onSubmit={handleAddExpense} 
              defaultType="private"
              baseCurrency={baseCurrency}
              conversionRates={conversionRates}
              editingExpense={editingExpense}
            />
          </Card>
          <ExpenseTable 
            expenses={expenses.filter(e => e.type === "private")} 
            setExpenses={setExpenses}
            onEdit={handleEditExpense}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Expenses;