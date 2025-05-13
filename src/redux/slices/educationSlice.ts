
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
      thumbnailUrl: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=800&auto=format&fit=crop&q=60",
      content: "https://www.youtube.com/watch?v=FTociictyyE",
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
      thumbnailUrl: "https://images.unsplash.com/photo-1584473457493-17c4c24290d2?w=800&auto=format&fit=crop&q=60",
      content: "https://example.com/article",
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
      thumbnailUrl: "https://images.unsplash.com/photo-1505935428862-770b6f24f629?w=800&auto=format&fit=crop&q=60",
      content: "https://www.youtube.com/watch?v=zZVdnAgYUps",
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
      thumbnailUrl: "https://images.unsplash.com/photo-1584473457493-17c4c24290d2?w=800&auto=format&fit=crop&q=60",
      content: "quiz content here",
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
      thumbnailUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop",
      content: "https://www.youtube.com/watch?v=8dUjy1aldGU",
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
