
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/lib/types';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUserStart: (state) => {
      state.isLoading = true;
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addUserPoints: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.points += action.payload;
        
        // Calculate level based on points (every 100 points = 1 level)
        state.user.level = Math.floor(state.user.points / 100) + 1;
      }
    },
    logout: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    }
  }
});

export const { 
  loginStart, loginSuccess, loginFailure,
  registerStart, registerSuccess, registerFailure,
  updateUserStart, updateUserSuccess, updateUserFailure,
  addUserPoints, logout
} = authSlice.actions;

export default authSlice.reducer;
