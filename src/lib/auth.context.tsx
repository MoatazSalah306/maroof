
import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthState, User } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });
  const { toast } = useToast();

  // Check for user on load
  useEffect(() => {
    const checkAuthState = () => {
      const storedUser = localStorage.getItem("nemaUser");
      if (storedUser) {
        try {
          setAuth({
            user: JSON.parse(storedUser),
            isLoading: false,
            error: null,
          });
        } catch (error) {
          console.error("Failed to parse user data", error);
          localStorage.removeItem("nemaUser");
          setAuth({
            user: null,
            isLoading: false,
            error: "Invalid session data",
          });
        }
      } else {
        setAuth({
          user: null,
          isLoading: false,
          error: null,
        });
      }
    };

    checkAuthState();
  }, []);

  // Mock login function (would be replaced with actual API)
  const login = async (email: string, password: string) => {
    setAuth({ ...auth, isLoading: true, error: null });
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // This is just a mock implementation
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
        
        localStorage.setItem("nemaUser", JSON.stringify(mockUser));
        setAuth({
          user: mockUser,
          isLoading: false,
          error: null,
        });
        toast({
          title: "Login successful",
          description: "Welcome to Ne'ma!",
        });
      } else {
        setAuth({
          user: null,
          isLoading: false,
          error: "Invalid email or password",
        });
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error", error);
      setAuth({
        user: null,
        isLoading: false,
        error: "Failed to login. Please try again later.",
      });
      toast({
        title: "Login failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Mock register function (would be replaced with actual API)
  const register = async (userData: Partial<User>, password: string) => {
    setAuth({ ...auth, isLoading: true, error: null });
    
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
      
      localStorage.setItem("nemaUser", JSON.stringify(newUser));
      setAuth({
        user: newUser,
        isLoading: false,
        error: null,
      });
      toast({
        title: "Registration successful",
        description: "Welcome to Ne'ma! Your journey to reduce food waste begins now.",
      });
    } catch (error) {
      console.error("Registration error", error);
      setAuth({
        user: null,
        isLoading: false,
        error: "Failed to register. Please try again later.",
      });
      toast({
        title: "Registration failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Mock update user function
  const updateUser = async (userData: Partial<User>) => {
    if (!auth.user) {
      throw new Error("No user logged in");
    }
    
    setAuth({ ...auth, isLoading: true });
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = {
        ...auth.user,
        ...userData,
      };
      
      localStorage.setItem("nemaUser", JSON.stringify(updatedUser));
      setAuth({
        user: updatedUser,
        isLoading: false,
        error: null,
      });
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Update user error", error);
      setAuth({
        ...auth,
        isLoading: false,
        error: "Failed to update profile",
      });
      toast({
        title: "Update failed",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("nemaUser");
    setAuth({
      user: null,
      isLoading: false,
      error: null,
    });
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const value = {
    ...auth,
    login,
    register,
    logout,
    updateUser,
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
