import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface CalendarHeaderProps {
  year: string;
  month: string;
  selectedCountries: string[];
  onYearChange: (year: string) => void;
  onMonthChange: (month: string) => void;
  onCountriesChange: (countries: string[]) => void;
  onExport: () => void;
}

const COUNTRIES = ["Sweden", "USA", "UK", "Japan", "Vietnam"];

export const CalendarHeader = ({
  year,
  month,
  selectedCountries,
  onYearChange,
  onMonthChange,
  onCountriesChange,
  onExport,
}: CalendarHeaderProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 5 },
    (_, i) => (currentYear - 2 + i).toString()
  );

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex gap-4">
        <Select value={year} onValueChange={onYearChange}>
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
        <Select value={month} onValueChange={onMonthChange}>
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
        <Select
          value={selectedCountries.join(",")}
          onValueChange={(value) => onCountriesChange(value.split(",").filter(Boolean))}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Countries" />
          </SelectTrigger>
          <SelectContent>
            {COUNTRIES.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onExport}
        className="ml-auto"
      >
        <Download className="w-4 h-4 mr-2" />
        Export Calendar
      </Button>
    </div>
  );
};