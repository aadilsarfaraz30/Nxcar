import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/lib/axiosInstance";
import { CarsInitialState,  } from "./type";

const initialState:CarsInitialState  = {
  data: null,
  loading: false,
  error: null,
  filters: [],
};

export const fetchCars = createAsyncThunk("cars/fetchCars", async (payload:any , { rejectWithValue }) => {
  try {
    const response = await api.post("/test-cars-list",{
     ...payload
    });
    return response?.data; 
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || "Failed to fetch products");
  }
});

export const fetchFilters = createAsyncThunk("cars/fetchFilters", async (_ , { rejectWithValue }) => {
  try {
    const response = await api.post("/test-cars-list");
    return response?.data; 
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || "Failed to fetch products");
  }
});


const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    // setSelectedCity(state, action: PayloadAction<any>) {
    //   state.selectedCity = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilters.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.filters = action.payload?.filters;
      })
      .addCase(fetchFilters.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {  } = citySlice.actions;
export default citySlice.reducer;
