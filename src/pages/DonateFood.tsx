
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { addDonation } from "@/redux/slices/donationsSlice";
import { addActivity } from "@/redux/slices/activitiesSlice";
import { addUserPoints } from "@/redux/slices/authSlice";
import { useToast } from "@/hooks/use-toast";

const donationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  expiryDate: z.string().refine(date => new Date(date) > new Date(), {
    message: "Expiry date must be in the future",
  }),
  image: z.string().optional(),
});

type DonationFormValues = z.infer<typeof donationSchema>;

const foodCategories = [
  "Fruits",
  "Vegetables",
  "Baked Goods",
  "Canned Goods",
  "Dairy",
  "Grains",
  "Meat",
  "Prepared Meals",
  "Non-perishable",
  "Other",
];

const DonateFood = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { user } = useAppSelector(state => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      location: "",
      quantity: 1,
      expiryDate: "",
      image: "",
    },
  });

  const onSubmit = async (data: DonationFormValues) => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      // Create donation
      const newDonation = {
        id: `donation-${Date.now()}`,
        userId: user.id,
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        quantity: data.quantity,
        expiryDate: new Date(data.expiryDate),
        createdAt: new Date(),
        image: data.image,
        isClaimed: false,
      };
      
      dispatch(addDonation(newDonation));
      
      // Add activity and points
      dispatch(addActivity({
        id: `activity-${Date.now()}`,
        userId: user.id,
        type: "donation",
        description: `Donated ${data.title}`,
        points: 50,
        timestamp: new Date()
      }));
      
      dispatch(addUserPoints(50));
      
      toast({
        title: "Donation added successfully!",
        description: "Thank you for your contribution. You've earned 50 points!",
      });
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating donation:", error);
      toast({
        title: "Failed to add donation",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Donate Food</h1>
        <p className="text-muted-foreground mb-8">
          Share your excess food with those who need it. Your donation helps reduce food waste and supports your community.
        </p>
        
        <div className="bg-card border rounded-lg p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Fresh Vegetables from Local Farm" {...field} />
                    </FormControl>
                    <FormDescription>
                      A brief title for your donation
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {foodCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          placeholder="Quantity" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Number of items or portions
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your donation in detail" 
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Include details like condition, quantity, and any special handling instructions
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Downtown Community Center" {...field} />
                      </FormControl>
                      <FormDescription>
                        Where the donation can be collected
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          min={new Date().toISOString().split('T')[0]} 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        When will this food expire?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormDescription>
                      Add an image URL to show what you're donating
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-maroof-green hover:bg-maroof-green/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Donation..." : "Create Donation"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default DonateFood;
