
import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// Simple statistics component
const StatCard = ({ title, value, description, icon }: { title: string, value: string, description: string, icon: React.ReactNode }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="h-4 w-4 text-muted-foreground">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Impact = () => {
  const { userDonations } = useAppSelector(state => state.donations);
  const { activities } = useAppSelector(state => state.activities);
  const educationState = useAppSelector(state => state.education);
  
  // Safely access completedResources with a fallback to empty array
  const completedResources = educationState?.userCompletedResources || [];
  
  // Get collective impact stats from localStorage (example data for now)
  const { getValue } = useLocalStorage('impact-stats', {
    totalFoodSaved: 2500, // in kg
    totalMealsDonated: 10000,
    co2Prevented: 7500, // in kg
    waterSaved: 15000000, // in liters
    goalFoodSaved: 5000,
    goalMeals: 20000
  });
  
  const stats = getValue();
  
  // Calculate user's personal contribution - add null checks
  const userDonationsWeight = Array.isArray(userDonations) 
    ? userDonations.reduce((total, donation) => total + (donation.quantity || 0), 0)
    : 0;
  const userMealsDonated = Math.floor(userDonationsWeight / 0.5); // Assuming 0.5kg = 1 meal
  const userCo2Prevented = Math.floor(userDonationsWeight * 3); // 1kg food waste ≈ 3kg CO2
  const userWaterSaved = Math.floor(userDonationsWeight * 5000); // 1kg food ≈ 5000L water
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Collective Impact</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Together, we're fighting food waste and hunger. See how our community's 
          efforts are creating positive change for people and the planet.
        </p>
      </div>

      <Tabs defaultValue="community">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="community">Community Impact</TabsTrigger>
          <TabsTrigger value="personal">Your Impact</TabsTrigger>
        </TabsList>
        
        <TabsContent value="community" className="space-y-8">
          {/* Progress toward community goals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Food Waste Prevented</CardTitle>
                <CardDescription>Progress toward our annual goal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">{stats.totalFoodSaved} kg</span>
                    <span className="text-sm">{stats.goalFoodSaved} kg goal</span>
                  </div>
                  <Progress value={(stats.totalFoodSaved / stats.goalFoodSaved) * 100} />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Meals Donated</CardTitle>
                <CardDescription>Progress toward our annual goal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">{stats.totalMealsDonated} meals</span>
                    <span className="text-sm">{stats.goalMeals} meals goal</span>
                  </div>
                  <Progress value={(stats.totalMealsDonated / stats.goalMeals) * 100} />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Community impact statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Food Saved"
              value={`${stats.totalFoodSaved.toLocaleString()} kg`}
              description="Total food waste prevented"
              icon={<span>🍽️</span>}
            />
            <StatCard 
              title="Meals Donated"
              value={stats.totalMealsDonated.toLocaleString()}
              description="Equivalent meals provided"
              icon={<span>🥗</span>}
            />
            <StatCard 
              title="CO₂ Prevented"
              value={`${stats.co2Prevented.toLocaleString()} kg`}
              description="Emissions prevented"
              icon={<span>🌿</span>}
            />
            <StatCard 
              title="Water Saved"
              value={`${(stats.waterSaved / 1000000).toFixed(1)}M L`}
              description="Water saved from food production"
              icon={<span>💧</span>}
            />
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-6">Impact Around the World</h2>
            <p className="text-muted-foreground mb-8">
              Our efforts have positive ripple effects across communities globally
            </p>
            
            <div className="bg-muted aspect-video rounded-md flex items-center justify-center">
              <p className="text-lg">Map visualization would appear here</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="personal" className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Your Donations"
              value={Array.isArray(userDonations) ? userDonations.length.toString() : "0"}
              description="Total donations made"
              icon={<span>🎁</span>}
            />
            <StatCard 
              title="Food Saved"
              value={`${userDonationsWeight} kg`}
              description="Food waste you've prevented"
              icon={<span>🍽️</span>}
            />
            <StatCard 
              title="CO₂ Prevented"
              value={`${userCo2Prevented} kg`}
              description="Your emissions impact"
              icon={<span>🌿</span>}
            />
            <StatCard 
              title="Water Saved"
              value={`${(userWaterSaved / 1000).toFixed(1)}K L`}
              description="Water saved through your actions"
              icon={<span>💧</span>}
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Activity Timeline</CardTitle>
              <CardDescription>Your journey in food waste reduction</CardDescription>
            </CardHeader>
            <CardContent>
              {Array.isArray(activities) && activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="border-l-2 border-nema-green pl-4 py-2">
                      <p className="font-medium">{activity.description}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </span>
                        <span className="text-sm font-medium text-nema-green">+{activity.points} points</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>You haven't logged any activities yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Educational Impact</CardTitle>
              <CardDescription>Resources you've completed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Resources completed</span>
                  <span className="font-bold">{completedResources.length}</span>
                </div>
                <Progress 
                  value={(completedResources.length / 10) * 100} 
                  className="h-2"
                />
                <p className="text-sm text-muted-foreground text-center">
                  {10 - completedResources.length} more resources to become a Food Waste Expert
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Impact;
