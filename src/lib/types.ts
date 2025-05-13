
export interface User {
  id: string;
  name: string;
  email: string;
  userType: "individual" | "business";
  points: number;
  level: number;
  avatar?: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface FoodListing {
  id: string;
  userId: string;
  title: string;
  description: string;
  quantity: number;
  category: string;
  location: string;
  expiryDate: Date;
  createdAt: Date;
  image?: string;
  isClaimed: boolean;
  claimedBy?: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  type: "donation" | "claim" | "education" | "volunteer";
  points: number;
  description: string;
  timestamp: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  requiredPoints: number;
}
