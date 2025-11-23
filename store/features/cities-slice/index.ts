import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CityState } from "./type";
import api from "@/utils/lib/axiosInstance";

const initialState: CityState = {
  data: [],
  loading: false,
  error: null,
  selectedCity: ''
};

export const fetchCity = createAsyncThunk("city/fetchCity", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/test-avail-cities");
    return response?.data?.data; 
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || "Failed to fetch products");
  }
});

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setSelectedCity(state, action: PayloadAction<any>) {
      state.selectedCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCity.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCity.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedCity } = citySlice.actions;
export default citySlice.reducer;
