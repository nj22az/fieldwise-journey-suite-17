import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import ExpenseTable from "@/components/expenses/ExpenseTable";
import ExpenseSummary from "@/components/expenses/ExpenseSummary";
import { toast } from "sonner";

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
  
  // Mock conversion rates - in a real app, these would come from an API
  const conversionRates: Record<string, number> = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.0,
    AUD: 1.35,
    CAD: 1.25,
    CHF: 0.92,
    CNY: 6.45,
    SEK: 8.65,
    NZD: 1.42
  };

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Expenses</h1>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Expenses</TabsTrigger>
          <TabsTrigger value="work">Work</TabsTrigger>
          <TabsTrigger value="private">Private</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          <ExpenseSummary expenses={expenses} />
          <Card className="p-6">
            <ExpenseForm 
              onSubmit={handleAddExpense} 
              baseCurrency="USD"
              conversionRates={conversionRates}
            />
          </Card>
          <ExpenseTable expenses={expenses} setExpenses={setExpenses} />
        </TabsContent>
        
        <TabsContent value="work" className="space-y-6">
          <ExpenseSummary expenses={expenses.filter(e => e.type === "work")} />
          <Card className="p-6">
            <ExpenseForm 
              onSubmit={handleAddExpense} 
              defaultType="work"
              baseCurrency="USD"
              conversionRates={conversionRates}
            />
          </Card>
          <ExpenseTable 
            expenses={expenses.filter(e => e.type === "work")} 
            setExpenses={setExpenses} 
          />
        </TabsContent>
        
        <TabsContent value="private" className="space-y-6">
          <ExpenseSummary expenses={expenses.filter(e => e.type === "private")} />
          <Card className="p-6">
            <ExpenseForm 
              onSubmit={handleAddExpense} 
              defaultType="private"
              baseCurrency="USD"
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