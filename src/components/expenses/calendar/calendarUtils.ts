import { getISOWeek, getYear, startOfWeek } from "date-fns";
import { Gift, Fireworks, PartyPopper, Cake } from "lucide-react";

export const getHolidayIcon = (date: Date) => {
  const month = date.getMonth();
  const day = date.getDate();
  
  // Christmas
  if (month === 11 && (day === 24 || day === 25)) {
    return <Gift className="w-3 h-3" />;
  }
  
  // New Year's
  if ((month === 11 && day === 31) || (month === 0 && day === 1)) {
    return <PartyPopper className="w-3 h-3" />;
  }
  
  // Independence Day (US)
  if (month === 6 && day === 4) {
    return <Fireworks className="w-3 h-3" />;
  }
  
  // Midsummer (approximate - needs to be calculated per year)
  if (month === 5 && day >= 19 && day <= 25) {
    return <PartyPopper className="w-3 h-3" />;
  }
  
  return null;
};

export const getISOWeekNumber = (date: Date): number => {
  const year = getYear(date);
  const weekNumber = getISOWeek(date);
  
  // Handle edge cases for week 52/53/1
  const startOfFirstWeek = startOfWeek(new Date(year, 0, 4), { weekStartsOn: 1 });
  if (date < startOfFirstWeek) {
    return getISOWeek(new Date(year - 1, 11, 31));
  }
  
  return weekNumber;
};