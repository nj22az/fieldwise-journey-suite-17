import { Outlet, Link } from "react-router-dom";
import Navbar from "./Navbar";
import { Button } from "./ui/button";
import { Home } from "lucide-react";

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <Link to="/">
            <Button variant="outline" className="mb-6">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;