import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Upload, PlayCircle } from "lucide-react";

interface ExpenseHeaderProps {
  baseCurrency: string;
  conversionRates: Record<string, number>;
  onBaseCurrencyChange: (currency: string) => void;
  onImportRates: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onLoadSample: () => void;
  onExportCSV: () => void;
  onExportExcel: () => void;
  onExportPDF: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const ExpenseHeader = ({
  baseCurrency,
  conversionRates,
  onBaseCurrencyChange,
  onImportRates,
  onLoadSample,
  onExportCSV,
  onExportExcel,
  onExportPDF,
  fileInputRef,
}: ExpenseHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-slate-900">Expenses</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Base Currency:</span>
          <Select value={baseCurrency} onValueChange={onBaseCurrencyChange}>
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
          onChange={onImportRates}
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
        <Button
          variant="outline"
          size="sm"
          onClick={onLoadSample}
        >
          <PlayCircle className="w-4 h-4 mr-2" />
          Load Sample Report
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onExportCSV}
          >
            <Download className="w-4 h-4 mr-2" />
            CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onExportExcel}
          >
            <Download className="w-4 h-4 mr-2" />
            Excel
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onExportPDF}
          >
            <Download className="w-4 h-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseHeader;