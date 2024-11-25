import { Badge } from "@/components/ui/badge";
import { format, isWeekend } from "date-fns";
import { Gift, Fireworks, PartyPopper, Cake } from "lucide-react";
import { getHolidayIcon } from "./calendarUtils";
import type { Expense } from "@/pages/Expenses";

interface CalendarDayContentProps {
  date: Date;
  expenseDates: Record<string, number>;
  selectedCountries: string[];
  isHoliday: (date: Date) => boolean;
}

export const CalendarDayContent = ({ 
  date, 
  expenseDates, 
  selectedCountries,
  isHoliday 
}: CalendarDayContentProps) => {
  const dateStr = format(date, "yyyy-MM-dd");
  const count = expenseDates[dateStr];
  const isWeekendDay = isWeekend(date);
  const holidayInfo = isHoliday(date);
  const icon = getHolidayIcon(date);
  
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
        {icon && (
          <span className="absolute top-0 right-0 text-[10px]">
            {icon}
          </span>
        )}
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
};