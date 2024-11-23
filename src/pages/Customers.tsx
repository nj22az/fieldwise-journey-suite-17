import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Customers = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Customers</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>
      <Card className="p-6">
        <p className="text-slate-600">Customer database coming soon...</p>
      </Card>
    </div>
  );
};

export default Customers;