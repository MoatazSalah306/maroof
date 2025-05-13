
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { claimDonation } from "@/redux/slices/donationsSlice";
import { addActivity } from "@/redux/slices/activitiesSlice";
import { addUserPoints } from "@/redux/slices/authSlice";
import { useToast } from "@/hooks/use-toast";

const DonationsList = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { user } = useAppSelector(state => state.auth);
  const { donations } = useAppSelector(state => state.donations);
  
  // Filter for available (not claimed) donations that are not from the current user
  const availableDonations = donations.filter(
    donation => !donation.isClaimed && (!user || donation.userId !== user.id)
  );

  const handleClaimDonation = (donationId: string) => {
    if (!user) return;
    
    dispatch(claimDonation({ donationId, userId: user.id }));
    
    // Add activity and points
    dispatch(addActivity({
      id: `activity-${Date.now()}`,
      userId: user.id,
      type: "claim",
      description: "Claimed food donation",
      points: 30,
      timestamp: new Date()
    }));
    
    dispatch(addUserPoints(30));
    
    toast({
      title: "Donation claimed!",
      description: "You've earned 30 points for claiming this donation.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Available Donations</h2>
        <Button size="sm" variant="outline">View All</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableDonations.length > 0 ? (
          availableDonations.map((donation) => (
            <Card key={donation.id} className="overflow-hidden hover:shadow-md transition-shadow">
              {donation.image && (
                <div className="h-40 overflow-hidden">
                  <img
                    src={donation.image}
                    alt={donation.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <CardHeader className={donation.image ? "pt-3 pb-2" : ""}>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{donation.title}</CardTitle>
                  <Badge variant="outline" className="bg-nema-green/10 text-nema-green border-nema-green/20">
                    {donation.category}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {donation.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-2 pt-0">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{donation.location}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Expires: {new Date(donation.expiryDate).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>
                    Posted: {new Date(donation.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0">
                <Button 
                  className="w-full bg-nema-green hover:bg-nema-green/90"
                  onClick={() => handleClaimDonation(donation.id)}
                  disabled={!user}
                >
                  Claim
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-8 text-muted-foreground">
            <p>No donations are currently available. Check back later or create your own donation!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationsList;
