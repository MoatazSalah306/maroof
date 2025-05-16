
import { Award, Gift, Flame, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useAppSelector } from "@/redux/hooks";

const UserStats = () => {
  const { user } = useAppSelector(state => state.auth);
  
  if (!user) return null;
  
  // Calculate percentage to next level (example calculation)
  const pointsForCurrentLevel = user.level * 100;
  const pointsForNextLevel = (user.level + 1) * 100;
  const progressToNextLevel = Math.min(
    ((user.points - pointsForCurrentLevel) / (pointsForNextLevel - pointsForCurrentLevel)) * 100,
    100
  );
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-4 rounded-lg bg-gradient-to-r from-maroof-green/10 to-maroof-green/20 border border-maroof-green/20">
        <div className="flex items-center gap-3">
          <div className="bg-maroof-green/20 p-2 rounded-full">
            <Award className="h-5 w-5 text-maroof-green" />
          </div>
          <div>
            <p className="text-sm font-medium text-maroof-green">Current Level</p>
            <h3 className="text-2xl font-bold">{user.level}</h3>
          </div>
        </div>
      </div>
      
      <div className="p-4 rounded-lg bg-gradient-to-r from-maroof-orange/10 to-maroof-orange/20 border border-maroof-orange/20">
        <div className="flex items-center gap-3">
          <div className="bg-maroof-orange/20 p-2 rounded-full">
            <Gift className="h-5 w-5 text-maroof-orange" />
          </div>
          <div>
            <p className="text-sm font-medium text-maroof-orange">Total Points</p>
            <h3 className="text-2xl font-bold">{user.points}</h3>
          </div>
        </div>
      </div>
      
      <div className="p-4 rounded-lg bg-gradient-to-r from-maroof-teal/10 to-maroof-teal/20 border border-maroof-teal/20">
        <div className="flex items-center gap-3">
          <div className="bg-maroof-teal/20 p-2 rounded-full">
            <Flame className="h-5 w-5 text-maroof-teal" />
          </div>
          <div>
            <p className="text-sm font-medium text-maroof-teal">Streak</p>
            <h3 className="text-2xl font-bold">7 days</h3>
          </div>
        </div>
      </div>
      
      <div className="p-4 rounded-lg bg-gradient-to-r from-maroof-brown/10 to-maroof-brown/20 border border-maroof-brown/20">
        <div className="flex items-center gap-3">
          <div className="bg-maroof-brown/20 p-2 rounded-full">
            <Clock className="h-5 w-5 text-maroof-brown" />
          </div>
          <div>
            <p className="text-sm font-medium text-maroof-brown">Member Since</p>
            <h3 className="text-base font-bold">
              {new Date(user.createdAt).toLocaleDateString()}
            </h3>
          </div>
        </div>
      </div>
      
      <div className="col-span-1 md:col-span-2 lg:col-span-4 p-4 rounded-lg border bg-card">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Level {user.level}</span>
            <span className="text-sm font-medium">Level {user.level + 1}</span>
          </div>
          <Progress value={progressToNextLevel} className="h-2 bg-muted" />
          <p className="text-xs text-muted-foreground text-center">
            {pointsForNextLevel - user.points} more points to reach next level
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
