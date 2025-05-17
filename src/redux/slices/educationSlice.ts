
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EducationResource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'quiz';
  duration: number; // in minutes
  points: number;
  thumbnailUrl?: string;
  content: string; // URL or content
  tags: string[];
  completedBy: string[]; // array of user IDs
}

interface EducationState {
  resources: EducationResource[];
  userCompletedResources: string[]; // IDs of completed resources
  isLoading: boolean;
  error: string | null;
}
const initialState: EducationState = {
  resources: [
    {
      id: "edu-1",
      title: "Food Storage Best Practices",
      description: "Learn how to properly store different types of food to maximize freshness and minimize waste.",
      type: "video",
      duration: 8,
      points: 20,
      thumbnailUrl: "https://img.youtube.com/vi/Uklbzm2DGA4/hqdefault.jpg",
      content: "https://www.youtube.com/watch?v=Uklbzm2DGA4",
      tags: ["storage", "beginner", "kitchen"],
      completedBy: []
    },
    {
      id: "edu-2",
      title: "Understanding Food Expiry Dates",
      description: "The difference between 'best before' and 'use by' dates, and how to safely use food near its expiry.",
      type: "article",
      duration: 5,
      points: 15,
      thumbnailUrl: "/images/one.jpg",
      content: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/food-product-dating",
      tags: ["food safety", "expiry dates", "awareness"],
      completedBy: []
    },
    {
      id: "edu-3",
      title: "Meal Planning to Reduce Waste",
      description: "Strategies for effective meal planning that minimizes food waste and saves money.",
      type: "video",
      duration: 12,
      points: 25,
      thumbnailUrl: "https://img.youtube.com/vi/dIIhzJUt8Ak/hqdefault.jpg",
      content: "https://www.youtube.com/watch?v=dIIhzJUt8Ak",
      tags: ["meal planning", "kitchen", "budget"],
      completedBy: []
    },
    {
      id: "edu-4",
      title: "Food Waste Quiz: Test Your Knowledge",
      description: "How much do you know about food waste? Take this quiz to find out and learn more.",
      type: "quiz",
      duration: 10,
      points: 30,
      thumbnailUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
      content: "https://www.proprofs.com/quiz-school/story.php?title=food-waste-facts-shortenedds",
      tags: ["quiz", "knowledge test", "learning"],
      completedBy: []
    },
    {
      id: "edu-5",
      title: "Sustainability in Food Systems",
      description: "Learn about the environmental impact of our food choices and how to make sustainable decisions.",
      type: "video",
      duration: 15,
      points: 25,
      thumbnailUrl: "https://img.youtube.com/vi/YEGISWTEgyU/hqdefault.jpg",
      content: "https://www.youtube.com/watch?v=YEGISWTEgyU",
      tags: ["sustainability", "environment", "food systems"],
      completedBy: []
    }
  ],
  userCompletedResources: [],
  isLoading: false,
  error: null
};



export const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    markResourceAsCompleted: (state, action: PayloadAction<{resourceId: string, userId: string}>) => {
      const { resourceId, userId } = action.payload;
      const resource = state.resources.find(r => r.id === resourceId);
      
      if (resource && !resource.completedBy.includes(userId)) {
        resource.completedBy.push(userId);
        if (!state.userCompletedResources.includes(resourceId)) {
          state.userCompletedResources.push(resourceId);
        }
      }
    },
    setUserCompletedResources: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      state.userCompletedResources = state.resources
        .filter(resource => resource.completedBy.includes(userId))
        .map(resource => resource.id);
    }
  }
});

export const { markResourceAsCompleted, setUserCompletedResources } = educationSlice.actions;

export default educationSlice.reducer;
