import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Mail, Phone } from "lucide-react";
import { CustomerForm, CustomerFormData } from "@/components/customers/CustomerForm";
import { useToast } from "@/hooks/use-toast";

// This would typically come from an API or database
const initialCustomers: CustomerFormData[] = [
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1234567890",
    company: "Tech Corp",
    notes: "Regular client",
  },
  {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+9876543210",
    company: "Design Studio",
    notes: "New customer",
  },
];

const Customers = () => {
  const [customers, setCustomers] = useState<CustomerFormData[]>(initialCustomers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddCustomer = (data: CustomerFormData) => {
    setCustomers([...customers, data]);
    setIsDialogOpen(false);
    toast({
      title: "Customer Added",
      description: "New customer has been successfully added to the database.",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Customers</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <CustomerForm
              onSubmit={handleAddCustomer}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="w-4 h-4 mr-2" />
                      {customer.email}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="w-4 h-4 mr-2" />
                      {customer.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{customer.company || "-"}</TableCell>
                <TableCell>{customer.notes || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Customers;