
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Award, AlertTriangle, CheckCircle, BookOpen } from "lucide-react";
import { markResourceAsCompleted } from "@/redux/slices/educationSlice";
import { addActivity } from "@/redux/slices/activitiesSlice";
import { addUserPoints } from "@/redux/slices/authSlice";
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const EducationResource = () => {
  const { resourceId } = useParams<{ resourceId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { user } = useAppSelector(state => state.auth);
  const { resources, userCompletedResources } = useAppSelector(state => state.education);
  const [isCompleting, setIsCompleting] = useState(false);
  
  // Find the resource
  const resource = resources.find(r => r.id === resourceId);
  const isCompleted = userCompletedResources?.includes(resourceId || "") || false;
  
  // If resource not found
  if (!resource) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <Alert variant="destructive" className="max-w-lg mx-auto">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Resource not found</AlertTitle>
          <AlertDescription>
            The educational resource you're looking for doesn't exist or has been removed.
          </AlertDescription>
        </Alert>
        <Button 
          variant="outline" 
          className="mt-6"
          onClick={() => navigate("/learn")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Educational Resources
        </Button>
      </div>
    );
  }
  
  const handleMarkAsCompleted = () => {
    if (!user || isCompleted || isCompleting) return;
    
    setIsCompleting(true);
    
    try {
      // Mark resource as completed
      dispatch(markResourceAsCompleted({ resourceId: resource.id, userId: user.id }));
      
      // Add activity
      dispatch(addActivity({
        id: `activity-${Date.now()}`,
        userId: user.id,
        type: "education",
        description: `Completed "${resource.title}"`,
        points: resource.points,
        timestamp: new Date()
      }));
      
      // Add points to user
      dispatch(addUserPoints(resource.points));
      
      toast({
        title: "Resource completed!",
        description: `You've earned ${resource.points} points for completing this resource.`,
      });
    } catch (error) {
      console.error("Error marking resource as completed:", error);
      toast({
        title: "Error",
        description: "Failed to mark resource as completed.",
        variant: "destructive",
      });
    } finally {
      setIsCompleting(false);
    }
  };
  
  // Extract YouTube video ID from YouTube URL
  const getYoutubeVideoId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/learn" className="inline-flex items-center text-maroof-teal hover:text-maroof-green">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Educational Resources
          </Link>
        </div>
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge className="capitalize bg-maroof-teal">
              {resource.type}
            </Badge>
            {isCompleted && (
              <Badge className="bg-maroof-green">
                <CheckCircle className="w-3 h-3 mr-1" /> Completed
              </Badge>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{resource.title}</h1>
          
          <div className="flex items-center gap-4 text-muted-foreground mb-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{resource.duration} min</span>
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-1" />
              <span>{resource.points} points</span>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-6">{resource.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-6">
            {resource.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Resource Content */}
        <div className="border rounded-lg overflow-hidden mb-8">
          {resource.type === 'video' && (
            <div className="bg-muted">
              <AspectRatio ratio={16/9}>
                {getYoutubeVideoId(resource.content) ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${getYoutubeVideoId(resource.content)}`}
                    title={resource.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <p className="text-muted-foreground">Video could not be loaded</p>
                  </div>
                )}
              </AspectRatio>
            </div>
          )}
          
          {resource.type === 'article' && (
            <div className="p-6 bg-card">
              <div className="prose prose-neutral max-w-none">
                <h2>Article Content</h2>
                <p>
                  This is a placeholder for the article content. In a real implementation, 
                  this would contain the full article text, formatted with HTML.
                </p>
                {/* In a real implementation, this would be article content */}
                {/* <div dangerouslySetInnerHTML={{ __html: resource.content }}></div> */}
              </div>
            </div>
          )}
          
          {resource.type === 'quiz' && (
            <div className="p-6 bg-card">
              <h2 className="text-xl font-semibold mb-4">Quiz: {resource.title}</h2>
              <p className="mb-6">
                This is a placeholder for the quiz content. In a real implementation, 
                this would contain interactive quiz questions and answers.
              </p>
              {/* In a real implementation, this would be a quiz component */}
            </div>
          )}
        </div>
        
        {!isCompleted && user ? (
          <Button 
            onClick={handleMarkAsCompleted}
            className="w-full bg-maroof-green hover:bg-maroof-green/90"
            disabled={isCompleting}
          >
            {isCompleting ? "Marking as completed..." : "Mark as Completed"}
            <CheckCircle className="ml-2 h-4 w-4" />
          </Button>
        ) : !user ? (
          <Alert className="mb-6">
            <BookOpen className="h-4 w-4" />
            <AlertTitle>Sign in to earn points</AlertTitle>
            <AlertDescription>
              <Link to="/login" className="text-maroof-teal hover:text-maroof-green">
                Sign in
              </Link>{" "}
              or{" "}
              <Link to="/register" className="text-maroof-teal hover:text-maroof-green">
                create an account
              </Link>{" "}
              to track your progress and earn points for completing educational resources.
            </AlertDescription>
          </Alert>
        ) : (
          <Button 
            variant="outline"
            className="w-full"
            disabled
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Already Completed
          </Button>
        )}
      </div>
    </div>
  );
};

export default EducationResource;
