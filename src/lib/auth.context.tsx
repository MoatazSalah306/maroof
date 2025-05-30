
import React, { createContext, useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { User } from '@/lib/types';
import { 
  loginStart, loginSuccess, loginFailure,
  registerStart, registerSuccess, registerFailure,
  updateUserStart, updateUserSuccess, updateUserFailure,
  logout
} from '@/redux/slices/authSlice';
import { useToast } from "@/components/ui/use-toast";
import { addActivity } from "@/redux/slices/activitiesSlice";
import { setUserDonations, setUserClaims } from "@/redux/slices/donationsSlice";
import { setUserCompletedResources } from "@/redux/slices/educationSlice";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
  userPreferences: UserPreferences;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  language: string;
}

const defaultPreferences: UserPreferences = {
  theme: 'system',
  notifications: true,
  language: 'en',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector(state => state.auth);
  const { toast } = useToast();
  
  // Setup localStorage for user preferences
  const { getValue: getStoredPreferences, setValue: setStoredPreferences } = 
    useLocalStorage<UserPreferences>('user-preferences', defaultPreferences);
  
  const [userPreferences, setUserPreferences] = React.useState<UserPreferences>(getStoredPreferences());
  
  // Apply theme preference
  useEffect(() => {
    if (userPreferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (userPreferences.theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [userPreferences.theme]);

  const updatePreferences = (preferences: Partial<UserPreferences>) => {
    const newPreferences = {
      ...userPreferences,
      ...preferences
    };
    setUserPreferences(newPreferences);
    setStoredPreferences(newPreferences);
    toast({
      title: "Preferences updated",
      description: "Your preferences have been saved.",
    });
  };

  // Login function
  const login = async (email: string, password: string) => {
    dispatch(loginStart());
    
    try {
      // Mock login - would be replaced with API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === "demo@example.com" && password === "password") {
        const mockUser: User = {
          id: "user-1",
          name: "Demo User",
          email: "demo@example.com",
          userType: "individual",
          points: 150,
          level: 2,
          createdAt: new Date(),
        };
        
        dispatch(loginSuccess(mockUser));
        
        // Load user-specific data
        dispatch(setUserDonations(mockUser.id));
        dispatch(setUserClaims(mockUser.id));
        dispatch(setUserCompletedResources(mockUser.id));
        
        // Store in localStorage as well for redundancy
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        toast({
          title: "Login successful",
          description: "Welcome to Ma'roof!",
        });
      } else {
        dispatch(loginFailure("Invalid email or password"));
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error", error);
      dispatch(loginFailure("Failed to login. Please try again later."));
      toast({
        title: "Login failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Register function
  const register = async (userData: Partial<User>, password: string) => {
    dispatch(registerStart());
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: userData.name || "New User",
        email: userData.email || "",
        userType: userData.userType || "individual",
        points: 0,
        level: 1,
        createdAt: new Date(),
      };
      
      dispatch(registerSuccess(newUser));
      
      // Also store in localStorage for redundancy
      localStorage.setItem('user', JSON.stringify(newUser));
      
      // Add welcome activity
      dispatch(addActivity({
        id: `activity-${Date.now()}`,
        userId: newUser.id,
        type: "education",
        description: "Joined Ma'roof - Welcome!",
        points: 20,
        timestamp: new Date()
      }));
      
      // Set user collections
      dispatch(setUserDonations(newUser.id));
      dispatch(setUserClaims(newUser.id));
      dispatch(setUserCompletedResources(newUser.id));
      
      toast({
        title: "Registration successful",
        description: "Welcome to Ma'roof! Your journey to reduce food waste begins now.",
      });
    } catch (error) {
      console.error("Registration error", error);
      dispatch(registerFailure("Failed to register. Please try again later."));
      toast({
        title: "Registration failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Update user function
  const updateUser = async (userData: Partial<User>) => {
    if (!user) {
      throw new Error("No user logged in");
    }
    
    dispatch(updateUserStart());
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = {
        ...user,
        ...userData,
      };
      
      dispatch(updateUserSuccess(updatedUser));
      
      // Update in localStorage as well
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Update user error", error);
      dispatch(updateUserFailure("Failed to update profile"));
      toast({
        title: "Update failed",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Logout function
  const logoutUser = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  // Check for user in localStorage on initial load
  useEffect(() => {
    if (!user) {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // Validate user data
          if (parsedUser && parsedUser.id && parsedUser.email) {
            // Restore user from localStorage
            dispatch(loginSuccess(parsedUser));
            // Load user-specific data
            dispatch(setUserDonations(parsedUser.id));
            dispatch(setUserClaims(parsedUser.id));
            dispatch(setUserCompletedResources(parsedUser.id));
          }
        }
      } catch (error) {
        console.error("Error restoring user from localStorage:", error);
      }
    }
  }, []);

  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout: logoutUser,
    updateUser,
    userPreferences,
    updatePreferences,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
