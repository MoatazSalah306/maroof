
import { Clock, Award, Utensils, GraduationCap, HandHeart } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { ActivityLog } from "@/lib/types";

const getActivityIcon = (type: ActivityLog["type"]) => {
  switch (type) {
    case "donation":
      return <Utensils className="h-4 w-4 text-nema-green" />;
    case "claim":
      return <HandHeart className="h-4 w-4 text-nema-orange" />;
    case "education":
      return <GraduationCap className="h-4 w-4 text-nema-teal" />;
    case "volunteer":
      return <HandHeart className="h-4 w-4 text-nema-brown" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const formatTimeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  
  return Math.floor(seconds) + " seconds ago";
};

const ActivityFeed = () => {
  const { user } = useAppSelector(state => state.auth);
  const { activities } = useAppSelector(state => state.activities);
  
  // Filter activities for the current user
  const userActivities = user ? activities.filter(activity => activity.userId === user.id) : [];
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
      </div>
      
      <div className="space-y-4">
        {userActivities.length > 0 ? (
          userActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-3 rounded-md border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="rounded-full p-2 bg-background border">
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <p className="text-sm font-medium">{activity.description}</p>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Clock className="h-3 w-3" />
                    <span>{formatTimeAgo(activity.timestamp)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1 text-nema-green">
                <Award className="h-4 w-4" />
                <span className="text-sm font-medium">+{activity.points}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No activity yet. Start donating or learning to earn points!</p>
          </div>
        )}
      </div>
      
      {userActivities.length > 0 && (
        <div className="text-center pt-2">
          <button className="text-sm text-nema-teal hover:text-nema-green font-medium">
            View all activity
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
