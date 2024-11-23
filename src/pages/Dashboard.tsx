import { Card } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Recent Expenses</h3>
          <p className="text-slate-600">Coming soon...</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Customer Updates</h3>
          <p className="text-slate-600">Coming soon...</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Work Hours</h3>
          <p className="text-slate-600">Coming soon...</p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;