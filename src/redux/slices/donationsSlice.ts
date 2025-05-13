
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { FoodListing } from '@/lib/types';

interface DonationsState {
  donations: FoodListing[];
  userDonations: FoodListing[];
  userClaims: FoodListing[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DonationsState = {
  donations: [
    {
      id: "1",
      userId: "user-1",
      title: "Fresh Vegetables",
      description: "Assorted vegetables from our local farm",
      category: "Vegetables",
      location: "Downtown Community Center",
      expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 48),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
      quantity: 10,
      image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&auto=format&fit=crop&q=60",
      isClaimed: false
    },
    {
      id: "2",
      userId: "user-1",
      title: "Bread and Pastries",
      description: "Freshly baked goods from our bakery",
      category: "Baked Goods",
      location: "Northside Food Pantry",
      expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
      quantity: 20,
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&auto=format&fit=crop&q=60",
      isClaimed: false
    },
    {
      id: "3",
      userId: "user-2",
      title: "Canned Foods",
      description: "Non-perishable food items for families",
      category: "Non-perishable",
      location: "Eastside Community Hub",
      expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
      quantity: 50,
      isClaimed: false
    },
  ],
  userDonations: [],
  userClaims: [],
  isLoading: false,
  error: null
};

export const donationsSlice = createSlice({
  name: 'donations',
  initialState,
  reducers: {
    addDonation: (state, action: PayloadAction<FoodListing>) => {
      state.donations.unshift(action.payload);
      state.userDonations.unshift(action.payload);
    },
    updateDonation: (state, action: PayloadAction<FoodListing>) => {
      const index = state.donations.findIndex(donation => donation.id === action.payload.id);
      if (index !== -1) {
        state.donations[index] = action.payload;
      }
      
      const userDonationIndex = state.userDonations.findIndex(donation => donation.id === action.payload.id);
      if (userDonationIndex !== -1) {
        state.userDonations[userDonationIndex] = action.payload;
      }
    },
    deleteDonation: (state, action: PayloadAction<string>) => {
      state.donations = state.donations.filter(donation => donation.id !== action.payload);
      state.userDonations = state.userDonations.filter(donation => donation.id !== action.payload);
    },
    claimDonation: (state, action: PayloadAction<{donationId: string, userId: string}>) => {
      const { donationId, userId } = action.payload;
      const donationToUpdate = state.donations.find(donation => donation.id === donationId);
      
      if (donationToUpdate) {
        donationToUpdate.isClaimed = true;
        donationToUpdate.claimedBy = userId;
        state.userClaims.push({...donationToUpdate});
      }
    },
    setUserDonations: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      state.userDonations = state.donations.filter(donation => donation.userId === userId);
    },
    setUserClaims: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      state.userClaims = state.donations.filter(donation => donation.claimedBy === userId);
    }
  }
});

export const { 
  addDonation, 
  updateDonation, 
  deleteDonation, 
  claimDonation, 
  setUserDonations,
  setUserClaims
} = donationsSlice.actions;

export default donationsSlice.reducer;
