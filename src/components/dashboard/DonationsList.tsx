
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

interface Donation {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  expiryDate: Date;
  createdAt: Date;
  quantity: number;
  image?: string;
}

// Mock data
const mockDonations: Donation[] = [
  {
    id: "1",
    title: "Fresh Vegetables",
    description: "Assorted vegetables from our local farm",
    category: "Vegetables",
    location: "Downtown Community Center",
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 48), // 2 days from now
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    quantity: 10,
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "2",
    title: "Bread and Pastries",
    description: "Freshly baked goods from our bakery",
    category: "Baked Goods",
    location: "Northside Food Pantry",
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    quantity: 20,
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "3",
    title: "Canned Foods",
    description: "Non-perishable food items for families",
    category: "Non-perishable",
    location: "Eastside Community Hub",
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days from now
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    quantity: 50,
  },
];

const DonationsList = () => {
  const [donations] = useState<Donation[]>(mockDonations);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Available Donations</h2>
        <Button size="sm" variant="outline">View All</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {donations.map((donation) => (
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
                <span>Expires: {donation.expiryDate.toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                <span>
                  Posted: {new Date(donation.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
            
            <CardFooter className="pt-0">
              <Button className="w-full bg-nema-green hover:bg-nema-green/90">Claim</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DonationsList;
