import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { Expense } from "@/pages/Expenses";

interface ExpenseCalendarProps {
  expenses: Expense[];
  onDateSelect: (date: Date) => void;
}

const ExpenseCalendar = ({ expenses, onDateSelect }: ExpenseCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());

  const years = Array.from(
    new Set(expenses.map((e) => new Date(e.date).getFullYear()))
  ).sort((a, b) => b - a);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Get expenses for the selected date
  const getExpensesForDate = (date: Date) => {
    return expenses.filter(
      (expense) => format(new Date(expense.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
  };

  // Create an object to store dates with expenses
  const expenseDates = expenses.reduce((acc: Record<string, number>, expense) => {
    const dateStr = format(new Date(expense.date), "yyyy-MM-dd");
    acc[dateStr] = (acc[dateStr] || 0) + 1;
    return acc;
  }, {});

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onDateSelect(date);
    }
  };

  return (
    <Card className="p-4">
      <div className="flex gap-4 mb-4">
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select 
          value={month} 
          onValueChange={(v) => setMonth(v)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m, i) => (
              <SelectItem key={m} value={(i + 1).toString()}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        month={new Date(parseInt(year), parseInt(month) - 1)}
        className="rounded-md border"
        components={{
          DayContent: ({ date }) => {
            const dateStr = format(date, "yyyy-MM-dd");
            const count = expenseDates[dateStr];
            return (
              <div className="relative w-full h-full">
                <div>{date.getDate()}</div>
                {count && (
                  <Badge 
                    variant="secondary" 
                    className="absolute bottom-0 right-0 text-xs"
                  >
                    {count}
                  </Badge>
                )}
              </div>
            );
          },
        }}
      />

      {selectedDate && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">
            Expenses for {format(selectedDate, "PP")}:
          </h3>
          <div className="space-y-2">
            {getExpensesForDate(selectedDate).map((expense) => (
              <div
                key={expense.id}
                className="text-sm p-2 bg-slate-50 rounded-md flex justify-between"
              >
                <span>{expense.description}</span>
                <span className="font-medium">
                  {expense.amount.toFixed(2)} {expense.currency}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default ExpenseCalendar;