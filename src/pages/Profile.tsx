
import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/redux/hooks";
import { useAuth } from "@/lib/auth.context";
import { Award, MapPin, Calendar, Settings, Bell, Globe, Moon, Sun, Laptop } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  userType: z.enum(["individual", "business"]),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

// Create a component for the preferences tab
const PreferencesTab = () => {
  const { userPreferences, updatePreferences } = useAuth();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>App Preferences</CardTitle>
        <CardDescription>
          Customize your app experience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Appearance</h3>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-medium">Theme</span>
              <span className="text-sm text-muted-foreground">Choose your preferred theme</span>
            </div>
            <Select
              value={userPreferences.theme}
              onValueChange={(value) => updatePreferences({ theme: value as 'light' | 'dark' | 'system' })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light" className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  <span>Light</span>
                </SelectItem>
                <SelectItem value="dark" className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  <span>Dark</span>
                </SelectItem>
                <SelectItem value="system" className="flex items-center gap-2">
                  <Laptop className="h-4 w-4" />
                  <span>System</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Notifications</h3>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-medium">Enable notifications</span>
              <span className="text-sm text-muted-foreground">Receive notifications about your account</span>
            </div>
            <Switch 
              checked={userPreferences.notifications}
              onCheckedChange={(checked) => updatePreferences({ notifications: checked })}
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Language</h3>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-medium">Display language</span>
              <span className="text-sm text-muted-foreground">Select your preferred language</span>
            </div>
            <Select
              value={userPreferences.language}
              onValueChange={(value) => updatePreferences({ language: value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>English</span>
                </SelectItem>
                <SelectItem value="ar" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>Arabic</span>
                </SelectItem>
                <SelectItem value="fr" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>French</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Profile = () => {
  const { user } = useAppSelector(state => state.auth);
  const { userDonations } = useAppSelector(state => state.donations);
  const { userCompletedResources } = useAppSelector(state => state.education);
  const { updateUser } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      userType: user?.userType || "individual",
    },
  });
  
  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;
    
    setIsUpdating(true);
    
    try {
      await updateUser({
        ...user,
        name: data.name,
        email: data.email,
        userType: data.userType,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your account details and view your activity
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-nema-green text-white text-xl">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{user?.name}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-nema-green/10 to-nema-green/20 border border-nema-green/20">
                  <div className="bg-nema-green/20 p-2 rounded-full">
                    <Award className="h-5 w-5 text-nema-green" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-nema-green">Current Level</p>
                    <h3 className="text-2xl font-bold">{user?.level || 0}</h3>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Points</span>
                  <span className="font-medium">{user?.points || 0}</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Resources Completed</span>
                  <span className="font-medium">{userCompletedResources.length}</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Donations Made</span>
                  <span className="font-medium">{userDonations.length}</span>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="font-medium">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Tabs defaultValue="account">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Update your account information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your name or organization" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="your@email.com" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="userType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select account type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="individual">Individual</SelectItem>
                                <SelectItem value="business">Business/Organization</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="bg-nema-green hover:bg-nema-green/90"
                        disabled={isUpdating}
                      >
                        {isUpdating ? "Saving Changes..." : "Save Changes"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Donations</CardTitle>
                  <CardDescription>
                    Donations you've made to help reduce food waste
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userDonations.length > 0 ? (
                    <div className="space-y-4">
                      {userDonations.map((donation) => (
                        <div 
                          key={donation.id} 
                          className="p-4 border rounded-lg flex flex-col md:flex-row md:items-center gap-4"
                        >
                          {donation.image && (
                            <div className="w-full md:w-24 h-24 rounded-md overflow-hidden">
                              <img 
                                src={donation.image} 
                                alt={donation.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                              <h3 className="font-semibold">{donation.title}</h3>
                              <Badge 
                                variant="outline" 
                                className={donation.isClaimed ? 
                                  "bg-nema-orange/10 text-nema-orange border-nema-orange/20" : 
                                  "bg-nema-green/10 text-nema-green border-nema-green/20"}
                              >
                                {donation.isClaimed ? "Claimed" : "Available"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                              {donation.description}
                            </p>
                            <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>{donation.location}</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>Posted: {new Date(donation.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>You haven't made any donations yet.</p>
                      <Button className="mt-4 bg-nema-orange hover:bg-nema-orange/90">
                        Create Your First Donation
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences" className="mt-6">
              <PreferencesTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
