
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Gift, Award, BadgePercent } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { Progress } from "@/components/ui/progress";

const Rewards = () => {
  const { user } = useAppSelector(state => state.auth);
  
  // Sample rewards data - this would typically come from an API
  const rewards = [
    {
      id: "1",
      title: "Free Delivery Voucher",
      description: "Get free delivery on your next grocery order from our partner stores.",
      pointsCost: 100,
      category: "voucher",
      icon: <BadgePercent className="h-8 w-8 text-maroof-orange" />,
      available: true
    },
    {
      id: "2",
      title: "Sustainability Workshop",
      description: "Join an exclusive workshop on sustainable cooking practices.",
      pointsCost: 200,
      category: "experience",
      icon: <Award className="h-8 w-8 text-maroof-green" />,
      available: true
    },
    {
      id: "3",
      title: "Premium Member Badge",
      description: "Display a special badge on your profile to show your commitment to reducing food waste.",
      pointsCost: 150,
      category: "status",
      icon: <Trophy className="h-8 w-8 text-maroof-teal" />,
      available: true
    },
    {
      id: "4",
      title: "Eco-Friendly Food Container Set",
      description: "Receive a set of sustainable food containers to help reduce plastic waste.",
      pointsCost: 300,
      category: "physical",
      icon: <Gift className="h-8 w-8 text-maroof-brown" />,
      available: true
    },
    {
      id: "5",
      title: "Restaurant Discount Code",
      description: "15% off at partner restaurants that prioritize sustainable food practices.",
      pointsCost: 250,
      category: "voucher",
      icon: <BadgePercent className="h-8 w-8 text-maroof-orange" />,
      available: true
    },
    {
      id: "6",
      title: "Community Garden Access",
      description: "Get access to a local community garden where you can grow your own vegetables.",
      pointsCost: 400,
      category: "experience",
      icon: <Award className="h-8 w-8 text-maroof-green" />,
      available: true
    }
  ];
  
  // Filter rewards based on affordability
  const affordableRewards = rewards.filter(reward => user && user.points >= reward.pointsCost);
  const unaffordableRewards = rewards.filter(reward => !user || user.points < reward.pointsCost);
  
  // Calculate percentage of rewards that are affordable
  const percentAffordable = user ? Math.round((affordableRewards.length / rewards.length) * 100) : 0;
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="px-3 py-1 text-sm rounded-full bg-maroof-green/10 text-maroof-green border border-maroof-green/20 inline-block mb-4">
          Point Rewards
        </span>
        <h1 className="text-4xl font-bold mb-6">
          Turn Your Points Into Rewards
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          As you donate food and participate in sustainable activities, you earn points that can be redeemed for exclusive rewards and experiences.
        </p>
        
        {user ? (
          <div className="bg-card border rounded-lg p-4 mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Your Points Balance</span>
              <span className="text-xl font-bold text-maroof-orange">{user.points} points</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Available Rewards</span>
                <span>{affordableRewards.length} of {rewards.length}</span>
              </div>
              <Progress value={percentAffordable} className="h-2 bg-muted" />
            </div>
          </div>
        ) : (
          <div className="bg-card border rounded-lg p-4 mb-8">
            <p className="text-center mb-3">Log in to view your points balance and redeem rewards</p>
            <Button className="bg-maroof-green hover:bg-maroof-green/90" asChild>
              <a href="/login">Sign In</a>
            </Button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Show affordable rewards first */}
        {affordableRewards.map((reward) => (
          <RewardCard key={reward.id} reward={reward} userPoints={user?.points || 0} />
        ))}
        
        {/* Then show unaffordable rewards */}
        {unaffordableRewards.map((reward) => (
          <RewardCard key={reward.id} reward={reward} userPoints={user?.points || 0} />
        ))}
      </div>
      
      <div className="mt-16 max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">How to Earn More Points</CardTitle>
            <CardDescription className="text-center">
              There are many ways to earn points and unlock more rewards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-md bg-card">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Gift className="h-5 w-5 text-maroof-orange" />
                  Donate Food
                </h3>
                <p className="text-sm text-muted-foreground">
                  Earn 10-50 points for each food donation, based on quantity and type of food.
                </p>
              </div>
              
              <div className="p-4 border rounded-md bg-card">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Award className="h-5 w-5 text-maroof-green" />
                  Complete Educational Content
                </h3>
                <p className="text-sm text-muted-foreground">
                  Earn 15-30 points for completing sustainability and food waste educational content.
                </p>
              </div>
              
              <div className="p-4 border rounded-md bg-card">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-maroof-teal" />
                  Maintain Activity Streaks
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get bonus points for consistent activity. 7-day streak = 50 bonus points!
                </p>
              </div>
              
              <div className="p-4 border rounded-md bg-card">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <BadgePercent className="h-5 w-5 text-maroof-brown" />
                  Refer Friends
                </h3>
                <p className="text-sm text-muted-foreground">
                  Earn 100 points for each friend who joins and makes their first donation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper component for individual reward cards
const RewardCard = ({ reward, userPoints }) => {
  const isAffordable = userPoints >= reward.pointsCost;
  
  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <div className="bg-gradient-to-br from-card to-maroof-green/5 h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-2">
          {reward.icon}
        </div>
        <CardTitle className="text-center text-xl">{reward.title}</CardTitle>
        <div className="flex justify-center">
          <Badge variant={isAffordable ? "default" : "outline"} className={isAffordable ? "bg-maroof-green" : ""}>
            {reward.pointsCost} points
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-center">{reward.description}</p>
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
        <Button
          className={isAffordable ? "bg-maroof-green hover:bg-maroof-green/90" : "bg-muted text-muted-foreground"}
          disabled={!isAffordable}
        >
          {isAffordable ? "Redeem Reward" : `Need ${reward.pointsCost - userPoints} more points`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Rewards;
