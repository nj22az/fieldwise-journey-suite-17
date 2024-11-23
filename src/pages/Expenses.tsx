import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import ExpenseTable from "@/components/expenses/ExpenseTable";
import ExpenseSummary from "@/components/expenses/ExpenseSummary";
import { toast } from "sonner";
import { parseConversionRatesCSV, exportToCSV, exportToExcel, exportToPDF } from "@/utils/csvUtils";
import { Download, Upload } from "lucide-react";

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

  const handleAddExpense = (expense: Omit<Expense, "id" | "createdAt" | "updatedAt" | "isLocked">) => {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
      isLocked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setExpenses((prev) => [newExpense, ...prev]);
    toast.success("Expense added successfully");
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

  const handleExportCSV = () => {
    const csvContent = exportToCSV(expenses);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success("Expenses exported to CSV");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Expenses</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Base Currency:</span>
            <Select value={baseCurrency} onValueChange={handleBaseCurrencyChange}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(conversionRates).map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            onChange={handleImportRates}
            className="hidden"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            Import Rates
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
            >
              <Download className="w-4 h-4 mr-2" />
              CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportToExcel(expenses)}
            >
              <Download className="w-4 h-4 mr-2" />
              Excel
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportToPDF(expenses)}
            >
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>
      </div>

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
            />
          </Card>
          <ExpenseTable expenses={expenses} setExpenses={setExpenses} />
        </TabsContent>
        
        <TabsContent value="work" className="space-y-6">
          <ExpenseSummary expenses={expenses.filter(e => e.type === "work")} baseCurrency={baseCurrency} />
          <Card className="p-6">
            <ExpenseForm 
              onSubmit={handleAddExpense} 
              defaultType="work"
              baseCurrency={baseCurrency}
              conversionRates={conversionRates}
            />
          </Card>
          <ExpenseTable 
            expenses={expenses.filter(e => e.type === "work")} 
            setExpenses={setExpenses} 
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
            />
          </Card>
          <ExpenseTable 
            expenses={expenses.filter(e => e.type === "private")} 
            setExpenses={setExpenses} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Expenses;