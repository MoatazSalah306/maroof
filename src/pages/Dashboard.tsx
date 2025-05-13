
import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import UserStats from "@/components/dashboard/UserStats";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import DonationsList from "@/components/dashboard/DonationsList";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen } from "lucide-react";

const Dashboard = () => {
  const { user } = useAppSelector(state => state.auth);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">
            Track your impact, manage donations, and earn rewards
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/donate">
            <Button className="bg-nema-orange hover:bg-nema-orange/90">
              <Plus className="mr-2 h-4 w-4" /> Create Donation
            </Button>
          </Link>
          <Link to="/learn">
            <Button variant="outline">
              <BookOpen className="mr-2 h-4 w-4" /> Educational Resources
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-8">
        <UserStats />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DonationsList />
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
