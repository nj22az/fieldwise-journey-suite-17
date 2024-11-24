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
import { format, isWeekend, isWithinInterval } from "date-fns";
import type { Expense } from "@/pages/Expenses";
import { HOLIDAYS } from "@/utils/holidayData";

interface ExpenseCalendarProps {
  expenses: Expense[];
  onDateSelect: (date: Date) => void;
}

const ExpenseCalendar = ({ expenses, onDateSelect }: ExpenseCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear.toString());
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());

  const years = Array.from(
    { length: 5 },
    (_, i) => (currentYear - 2 + i).toString()
  );

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

  // Get holiday information for the selected date
  const getHolidayInfo = (date: Date) => {
    return HOLIDAYS.find(
      holiday => format(holiday.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
  };

  // Create an object to store dates with expenses
  const expenseDates = expenses.reduce((acc: Record<string, number>, expense) => {
    const dateStr = format(new Date(expense.date), "yyyy-MM-dd");
    acc[dateStr] = (acc[dateStr] || 0) + 1;
    return acc;
  }, {});

  const isHoliday = (date: Date) => {
    return HOLIDAYS.some(holiday =>
      format(holiday.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
  };

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onDateSelect(date);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
      <Card className="p-4">
        <div className="flex gap-4 mb-4">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y}>
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
          weekStartsOn={1}
          components={{
            DayContent: ({ date }) => {
              const dateStr = format(date, "yyyy-MM-dd");
              const count = expenseDates[dateStr];
              const isWeekendDay = isWeekend(date);
              const holidayInfo = isHoliday(date);
              
              return (
                <div className={`relative w-full h-full p-1 ${
                  isWeekendDay ? 'bg-slate-50' : ''
                } ${
                  holidayInfo ? 'bg-red-50' : ''
                }`}>
                  <div className={`text-sm ${
                    isWeekendDay ? 'text-slate-500' : ''
                  } ${
                    holidayInfo ? 'text-red-500' : ''
                  }`}>
                    {date.getDate()}
                  </div>
                  {count && (
                    <Badge 
                      variant="secondary" 
                      className="absolute bottom-0 right-0 text-[10px] px-1 py-0"
                    >
                      {count}
                    </Badge>
                  )}
                </div>
              );
            },
          }}
        />
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Notes & Information</h3>
        {selectedDate ? (
          <div className="space-y-4">
            {getHolidayInfo(selectedDate) && (
              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="font-semibold text-blue-900">
                  {getHolidayInfo(selectedDate)?.name}
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  Country: {getHolidayInfo(selectedDate)?.country}
                </p>
                <p className="text-sm text-blue-600 mt-2">
                  {getHolidayInfo(selectedDate)?.description}
                </p>
              </div>
            )}
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">
                Expenses for {format(selectedDate, "PP")}:
              </h4>
              <div className="space-y-2">
                {getExpensesForDate(selectedDate).map((expense) => (
                  <div
                    key={expense.id}
                    className="text-sm p-2 bg-slate-50 rounded-md flex justify-between items-center hover:bg-slate-100 transition-colors"
                  >
                    <span className="font-medium">{expense.description}</span>
                    <Badge variant="secondary">
                      {expense.amount.toFixed(2)} {expense.currency}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">
            Select a date to view expenses and holiday information.
          </p>
        )}
      </Card>
    </div>
  );
};

export default ExpenseCalendar;