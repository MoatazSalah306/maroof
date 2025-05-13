
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActivityLog } from '@/lib/types';

interface ActivitiesState {
  activities: ActivityLog[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ActivitiesState = {
  activities: [
    {
      id: "1",
      userId: "user-1",
      type: "donation",
      description: "Donated 5 kg of vegetables",
      points: 50,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
    },
    {
      id: "2",
      userId: "user-1",
      type: "education",
      description: "Completed 'Food Storage Basics' lesson",
      points: 20,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24)
    },
    {
      id: "3",
      userId: "user-1",
      type: "claim",
      description: "Claimed food for community distribution",
      points: 30,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48)
    },
    {
      id: "4",
      userId: "user-1",
      type: "volunteer",
      description: "Volunteered at food distribution event",
      points: 75,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72)
    },
    {
      id: "5",
      userId: "user-1",
      type: "education",
      description: "Watched 'Reducing Food Waste at Home' video",
      points: 15,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96)
    }
  ],
  isLoading: false,
  error: null
};

export const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    addActivity: (state, action: PayloadAction<ActivityLog>) => {
      state.activities.unshift(action.payload);
    },
    getUserActivities: (state, action: PayloadAction<string>) => {
      // This will filter activities in the component using a selector
      // No need to mutate state here
    }
  }
});

export const { addActivity, getUserActivities } = activitiesSlice.actions;

export default activitiesSlice.reducer;
