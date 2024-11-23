import { Card } from "@/components/ui/card";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Receipt, Users, Car, Clock, Plane } from "lucide-react";

const modules = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="w-6 h-6" />,
    description: "Overview of all activities",
    path: "/dashboard",
    color: "bg-blue-500",
  },
  {
    title: "Expenses",
    icon: <Receipt className="w-6 h-6" />,
    description: "Track and manage expenses",
    path: "/expenses",
    color: "bg-green-500",
  },
  {
    title: "Customers",
    icon: <Users className="w-6 h-6" />,
    description: "Customer database and history",
    path: "/customers",
    color: "bg-purple-500",
  },
  {
    title: "Mileage",
    icon: <Car className="w-6 h-6" />,
    description: "Track travel distances",
    path: "/mileage",
    color: "bg-orange-500",
  },
  {
    title: "Work Hours",
    icon: <Clock className="w-6 h-6" />,
    description: "Log and manage work time",
    path: "/work-hours",
    color: "bg-red-500",
  },
  {
    title: "Travel",
    icon: <Plane className="w-6 h-6" />,
    description: "Plan and track trips",
    path: "/travel",
    color: "bg-indigo-500",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          Field Service Management
        </h1>
        <p className="text-slate-600 mb-8">
          Select a module to get started
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <NavLink to={module.path} key={module.path}>
              <Card className="p-6 card-hover cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${module.color} text-white`}>
                    {module.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      {module.title}
                    </h2>
                    <p className="text-slate-600 mt-1">
                      {module.description}
                    </p>
                  </div>
                </div>
              </Card>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;