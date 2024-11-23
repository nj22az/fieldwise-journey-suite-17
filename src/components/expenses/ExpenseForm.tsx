import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { Expense } from "@/pages/Expenses";
import ReceiptUploader from "./ReceiptUploader";

const categories = [
  "Travel",
  "Food",
  "Supplies",
  "Equipment",
  "Software",
  "Subscription",
  "Other"
];

const paymentMethods = [
  "Cash",
  "Credit Card",
  "Bank Transfer",
  "Other"
];

const currencies = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "SEK",
  "NZD"
];

interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, "id" | "createdAt" | "updatedAt" | "isLocked">) => void;
  defaultType?: "work" | "private";
  baseCurrency: string;
  conversionRates: Record<string, number>;
  editingExpense?: Expense | null;
}

const ExpenseForm = ({ onSubmit, defaultType, baseCurrency, conversionRates, editingExpense }: ExpenseFormProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [type, setType] = useState<"work" | "private">(defaultType || "work");
  const [category, setCategory] = useState<string>(categories[0]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState(baseCurrency);
  const [paymentMethod, setPaymentMethod] = useState<string>(paymentMethods[0]);
  const [reimbursable, setReimbursable] = useState(false);
  const [manualRate, setManualRate] = useState<string>("");

  // Load editing expense data
  useEffect(() => {
    if (editingExpense) {
      setDate(editingExpense.date);
      setType(editingExpense.type);
      setCategory(editingExpense.category);
      setDescription(editingExpense.description);
      setAmount(editingExpense.amount.toString());
      setCurrency(editingExpense.currency);
      setPaymentMethod(editingExpense.paymentMethod);
      setReimbursable(editingExpense.reimbursable);
      if (editingExpense.conversionRate !== conversionRates[editingExpense.currency]) {
        setManualRate(editingExpense.conversionRate.toString());
      }
    }
  }, [editingExpense]);

  const getConvertedAmount = () => {
    if (!amount) return "0.00";
    const rate = manualRate ? parseFloat(manualRate) : conversionRates[currency] || 1;
    const converted = parseFloat(amount) * rate;
    return converted.toFixed(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      date,
      type,
      category,
      description,
      amount: parseFloat(amount),
      currency,
      convertedAmount: parseFloat(getConvertedAmount()),
      conversionRate: manualRate ? parseFloat(manualRate) : conversionRates[currency] || 1,
      paymentMethod,
      reimbursable,
    });

    // Reset form if not editing
    if (!editingExpense) {
      setDate(new Date());
      setType(defaultType || "work");
      setCategory(categories[0]);
      setDescription("");
      setAmount("");
      setCurrency(baseCurrency);
      setPaymentMethod(paymentMethods[0]);
      setReimbursable(false);
      setManualRate("");
    }
  };

  const handleReceiptUpload = (file: File) => {
    // Store the receipt file (this would typically upload to a server or store locally)
    console.log('Receipt file:', file);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select value={type} onValueChange={(value: "work" | "private") => setType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((curr) => (
                  <SelectItem key={curr} value={curr}>
                    {curr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {currency !== baseCurrency && (
          <div className="space-y-2 col-span-2">
            <Label>
              Converted Amount ({baseCurrency}): {getConvertedAmount()}
            </Label>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                step="0.0001"
                value={manualRate}
                onChange={(e) => setManualRate(e.target.value)}
                placeholder={`Custom rate (Current: ${conversionRates[currency]})`}
              />
              <span className="text-sm text-muted-foreground">
                1 {currency} = {manualRate || conversionRates[currency] || 1} {baseCurrency}
              </span>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethods.map((method) => (
                <SelectItem key={method} value={method}>
                  {method}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reimbursable">Reimbursable</Label>
          <Select 
            value={reimbursable ? "yes" : "no"} 
            onValueChange={(value) => setReimbursable(value === "yes")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select reimbursable status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter expense description"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Receipt</Label>
        <ReceiptUploader onUpload={handleReceiptUpload} />
      </div>

      <Button type="submit" className="w-full">
        {editingExpense ? "Update Expense" : "Add Expense"}
      </Button>
    </form>
  );
};

export default ExpenseForm;
