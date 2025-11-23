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
        const response = action.payload;

  // Store cars data always
  state.data = response;

  // Store filters only once
  console.log('response.filters', response.filters);
  if (state.filters.length === 0 && response?.filters) {
    state.filters = response.filters;
  }
      })
      .addCase(fetchCars.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {  } = citySlice.actions;
export default citySlice.reducer;
