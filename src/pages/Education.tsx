import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Search, Clock, Award, CheckCircle } from "lucide-react";
import { EducationResource } from "@/redux/slices/educationSlice";

const resourceTypeIcons: Record<string, string> = {
  video: "🎬",
  article: "📄",
  quiz: "❓",
};

const Education = () => {
  const { user } = useAppSelector(state => state.auth);
  const { resources, userCompletedResources } = useAppSelector(state => state.education);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter resources based on search term and active tab
  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "completed") return matchesSearch && userCompletedResources.includes(resource.id);
    return matchesSearch && resource.type === activeTab;
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Educational Resources</h1>
          <p className="text-muted-foreground">
            Learn about food waste reduction and sustainability while earning points
          </p>
        </div>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search resources by title, description, or tags..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="all" className="mb-8" onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="grid grid-cols-5 mb-6 w-full md:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="article">Articles</TabsTrigger>
          <TabsTrigger value="quiz">Quizzes</TabsTrigger>
          {user && <TabsTrigger value="completed">Completed</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <ResourceGrid resources={filteredResources} completedIds={userCompletedResources} />
        </TabsContent>
        
        <TabsContent value="video" className="mt-0">
          <ResourceGrid 
            resources={filteredResources} 
            completedIds={userCompletedResources} 
          />
        </TabsContent>
        
        <TabsContent value="article" className="mt-0">
          <ResourceGrid 
            resources={filteredResources} 
            completedIds={userCompletedResources} 
          />
        </TabsContent>
        
        <TabsContent value="quiz" className="mt-0">
          <ResourceGrid 
            resources={filteredResources} 
            completedIds={userCompletedResources} 
          />
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          <ResourceGrid 
            resources={filteredResources} 
            completedIds={userCompletedResources} 
          />
        </TabsContent>
      </Tabs>
      
      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No resources found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

interface ResourceGridProps {
  resources: EducationResource[];
  completedIds: string[];
}

const ResourceGrid = ({ resources, completedIds }: ResourceGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <Card key={resource.id} className="overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
          <div className="relative">
            {resource.thumbnailUrl ? (
              <div className="h-48 overflow-hidden">
                <img
                  src={resource.thumbnailUrl}
                  alt={resource.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="h-48 bg-muted flex items-center justify-center">
                <span className="text-4xl">{resourceTypeIcons[resource.type]}</span>
              </div>
            )}
            
            <Badge className="absolute top-2 right-2 capitalize bg-maroof-teal hover:bg-maroof-teal/90">
              {resource.type}
            </Badge>
            
            {completedIds.includes(resource.id) && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-maroof-green hover:bg-maroof-green">
                  <CheckCircle className="w-3 h-3 mr-1" /> Completed
                </Badge>
              </div>
            )}
          </div>
          
          <CardHeader>
            <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
            <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
          </CardHeader>
          
          <CardContent className="flex-grow">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{resource.duration} min</span>
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-1" />
                <span>{resource.points} points</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-2">
              {resource.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="mt-auto">
            <Link to={`/learn/${resource.id}`} className="w-full">
              <Button 
                className="w-full text-white bg-maroof-teal hover:bg-maroof-teal/90"
                variant={completedIds.includes(resource.id) ? "outline" : "default"}
              >
                {completedIds.includes(resource.id) ? "View Again" : "Start Learning"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Education;
